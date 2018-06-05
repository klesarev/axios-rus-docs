
в процессе...

## ReactJS: работаем c OMDB API с помощью Axios

Axios по праву считается самой популярной библиотектой для HTTP-запросов среди React разработчиков, благодаря простоте ее использования и наличию большого количества "фишек", которых нет в "нативном fetch"(*или же реализуются через "костыли"*).

### Установка и настройка

> **ВНИМАНИЕ!** Перед тем как приступить к уроку, Вам понадобятся базовые знания по ReactJS.  

Для начала нам нужен стартовый шаблон для React. Воспользуемся утилитой - [**create-react-app**](https://github.com/facebook/create-react-app ). Он установит минимальный набор компонентов, который нам понадобится для нашего небольшого приложения. Сначала установим утилиту глобально:
```
npm install -g create-react-app
```
Документацию можно найти в репозитории [проекта](https://github.com/facebook/create-react-app) После того как все установится, в папке с вашим проектом напишем в консоли команду:
```
create-react-app film-app & cd film-app
```
Эта команда сначала создает проект с названием __film-app__, а потом переходит в папку проекта. Чтобы запустить локальный сервер для разработки, нужно ввсети команду - ```npm start```. Наш проект откроется в браузере по адресу - http://localhost:3000/

Отлично, все работает! Остановим сервер(*Ctrl+C в консоли*) и установим Axios.
```
npm install axios
```

### API
Получать данные мы будем с помощью [OMDB API](http://www.omdbapi.com/). Это открытая база фильмов. Здесь есть 2 оснвных вида запроса
- поиск по ID или названию фильма
- поиск по названию фильмов
Отличаются они тем, что первый метод вернет нам полную информацию об одном фильме, а второй - краткую информацию по нескольким, в названии которых присутствует название, введеное вами при поиске. 

Кроме того, можно уточнить найденные данные по: году выпуска, типу(сериал, полнометражка, короткометражка), типу выходных данных (JSON или XML), расширенной или короткой аннотации. При поиске всех соответсвий в базе(_когда выдаюьсмя множество результатов поиска_) указывается общее количество найденных соответствий. Выдача идет постранично(_по 10 фильмов на странице_), и можно указать какую из страниц вы хотите получить.

Для того чтобы иметь доступ к базе, нужно получить API key. Зарегестрировать его можно здесь - http://www.omdbapi.com/apikey.aspx 

В бесплатной версии количество запросов лимитировано(1000 в день). 1$ в месяц стоит 100 000 запросов, а за 5$ вы получите доступ к Poster API - сервису, который предоставляет постеры к фильмам в высоком разрешении. Со всеми тарифами можно ознакомиться на их странице в [Patreon](https://www.patreon.com/bePatron?u=5038490)

### Создаем макет
Подчистим сначала созданный шаблон. Оставим в файле `App.js` следущее:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;

```
Для более быстрого прототипирования, подключим css библиотеку [**Botstrap**](https://getbootstrap.com/docs/4.1/getting-started/introduction/). Можно конечно поставить специально созданные под React наборы компонентов( *Bootstrap React или Material UI* ), но нам нужно будет всего лишь пара элементов, пожтому ограничимся подключением css в файл `index.html`, который расположен в папке `public` нашего проекта 
```html
<!-- CDN bootstrap css link -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
```
Теперь быстро набросаем структуру нашего приложения. Создадим директорию `components` в папке `src`. Там будут хранится наши компоненты. 
> Начинайте приложение всегда со статической разметки. Создайте структуру, пропишите css, а потом уже добавляйте функционал.


### Компонент Search
Итак, начнем с компонента Search. Тут у нас будет форма с `input` и кнопкой. Создадим в папке `components` файл `Search.js`, и напишем там следующее
```js
import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.onSearch(this.refs.title.value);
    }

    render(){
        return ( 
            <div className="container">
                <form className="main-search">
                    <div className="form-group">
                        <input type="email" ref="title" className="form-control" placeholder="поиск..." />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ this.handleClick }>Search</button>
                </form>
            </div>
        )    
    } 
}
export default Search;
```
Здесь можно взять стандартный компонент формы из Bootstrap и кнопку. Полный список компонентов [здесь](https://getbootstrap.com/docs/4.0/components/buttons/)

### Компонент Card
Следующим на очереди будет компонент карточки фильма - Card.
```js
import React from 'react';

function Card(props) {
    let image = (props.poster === 'N/A') ? 
    'https://www.nilfiskcfm.com/wp-content/uploads/2016/12/placeholder.png' : props.poster;

    return (
        <div className="card">
            <div className="card-image">
                <img src={ image } alt={props.title} />
                <span class="badge badge-success">{ props.type }</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{ props.title }</h5>
                <p className="card-text">{ props.year }</p>
            </div>
        </div>
    )
}

export default Card
```
Важный момент! Так как у некоторых фильмов может не быть постера, сделаем так, чтобы при его отсутсвиии подставлялась картинка `no-image`.
```js
let image = (props.poster === 'N/A') ? 
    'https://www.nilfiskcfm.com/wp-content/uploads/2016/12/placeholder.png' : props.poster;
```

### Компонент Error
Тут все просто. Компонент ошибки появится, если оп нашему запросу ничего не будет найдено!
```js
import React from 'react';

function Error(props) {
    return(
        <div class="alert alert-danger" role="alert">
            { props.error }
        </div>
    )
}

export default Error;
```

### Пишем GET-запрос



### Вывод

Готовый проект можно скачать в папке [**film-app**](/lessons/film-app)

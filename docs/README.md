# axios

[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)
[![build status](https://img.shields.io/travis/axios/axios.svg?style=flat-square)](https://travis-ci.org/axios/axios)
[![code coverage](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)](https://coveralls.io/r/mzabriskie/axios)
[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](http://npm-stat.com/charts.html?package=axios)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)](https://gitter.im/mzabriskie/axios)
[![code helpers](https://www.codetriage.com/axios/axios/badges/users.svg)](https://www.codetriage.com/axios/axios)


Клиент для HTTP-запросов для браузера и Node.JS, построенный на [**Promise**](https://learn.javascript.ru/promise)


## Отличительные особенности
- Отправка [XMLHttpRequests](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest) из браузера
- HTTP запросы из [NodeJS](http://nodejs.org/api/http.html)
- Полная поддержка [Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Перехват запросов и ответов
- Преобразование получаемых и принимаемых данных
- Отмена запроса
- Автоматическое преобразование JSON
- Защита на стороне клиента от [CSRF-атак](https://learn.javascript.ru/csrf)


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

[![Browser Matrix](https://saucelabs.com/open_sauce/build_matrix/axios.svg)](https://saucelabs.com/u/axios)



## Установка

_посредством __npm__ (у вас должен быть установлен пакет Node JS [ссылка](https://nodejs.org/en/) )_
```js
$ npm install axios
```
*c помощью менеджера пакетов bower*
```js
$ bower install axios
```
*используя ссылку на CDN, которую можно разместить непосредственно на странице*
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Примеры использования
### GET - запрос
```javascript
// делаем GET запрос чтобы получить пользователя (user) 
// с указанным параметром ID = 12345
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// так же, параметры можно передавать отдельно, в виде объекта
// схема ('url', params), где params объект
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Хотите использовать async/await? Не проблема! Добавьте "async" - перед вашим методом/функуцей,
// и await перед самими запросом.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```


> **```FOX```:** `async/await` - часть нового стандарта ECMAScript 2017. Этот функционал не поддерживается IE и некоторыми старыми браузерами.
> Почитать на русском можно [здесь](https://habr.com/company/ruvds/blog/326074/)
> Также можно использовать [*BABEL*](https://babeljs.io/) для транспиляции(перевода) кода к стандарту ES5, который имеет практически полную совместимость с браузерами

### POST - запрос
```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

### Несколько запросов одновременно
```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

## Axios API

Запросы могут быть выполнены путем передачи параметров/настроек в ```axios(config)```
```javascript
// отправка POST запроса
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
```javascript
// отправка GET запроса для получения изображения
// со стороннего сервера
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```
__axios(url[, config])__
```javascript
// отправка GET запроса с параметрами по умолчанию
axios('/user/12345');
```


### Встроенные методы HTTP запросов

Для Вашего удобства были созданы методы для всех поддерживаемых типов запросов.

##### axios.request(config)
##### axios.get(url[, config])
##### axios.delete(url[, config])
##### axios.head(url[, config])
##### axios.options(url[, config])
##### axios.post(url[, data[, config]])
##### axios.put(url[, data[, config]])
##### axios.patch(url[, data[, config]])

> **```FOX```** используя данные методы, Вам необязательно указывать свойства ```method``` и ```data``` в настройках.
> 

### Мультизапросы
Вспомогательные функции для того чтобы использовать несколько запросов одновременно

##### axios.all(iterable)
##### axios.spread(callback)


### Cоздание нового экземпляра Axios
Вы можете создать новый экземпляр(образец) **Axios** cо своими настройками

##### axios.create([config])
```javascript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
``` 

### Методы экземпляра

Доступные методы экземпляра(образца) Axios перечислены ниже. Указанные настройки в них будут объединены с конфигурацией экземпляра.

##### axios#request(config)
##### axios#get(url[, config])
##### axios#delete(url[, config])
##### axios#head(url[, config])
##### axios#options(url[, config])
##### axios#post(url[, data[, config]])
##### axios#put(url[, data[, config]])
##### axios#patch(url[, data[, config]])



## Настройка запросов

Это параметры для запросов. Если тип запроса не указан, то по умолчанию будет выполняться GET запрос. Запросы указываются при вызове метода, в объекте.
_пример: axios.get(params)_, где __*params*__ настройки

```js
{
  // `url` - адрес сервера. куда отправляется запрос
  url: '/user',

  // `method` тип http-запроса (get, post, delete и т.д.)
  method: 'get', // default

  // `baseURL` будет добавлен к `url`, если `url` не будет абсолютным.
  // это может быть удобным - установить `baseURL` для экземпляра axios для передачи 
  // относительных URL-адресов.
  // установив единожды в настйроках 'baseURL' не нужно будет указывать полный адрес при запросе.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` позволяет изменять данные запроса до его отправки на сервер
  // Это применимо только для методов запроса «PUT», «POST» и «PATCH»
  // Последняя функция в массиве должна возвращать строку или экземпляр типа Buffer, ArrayBuffer,
  // FormData или Stream
  // Также вы можете изменить объект заголовков.
  transformRequest: [function (data, headers) {
    // тут пишем код для обработки данных...

    return data;
  }],

  // `transformResponse` позволяет изменять данные ответа, (аналог вышеуказанному методу)
  // но уже для запроса. редультат передается в then / catch
  transformResponse: [function (data) {
    // тут пишем код для обработки данных...

    return data;
  }],

  // `headers` - указываем тут заголовки для запроса
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` - параметры URL, которые обычно указываются в адресе запроса
  // параметры должны быть указаны в виде обычного объекта JS
  params: {
    ID: 12345
  },

  // `paramsSerializer` - метод для сериализации(обработки) параметров
  // (https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` - данные, которые должны быть отправлены в теле запроса
  // Применяется только доя методов 'PUT', 'POST', and 'PATCH'
  // Если параметр `transformRequest` не установлен, то тело запроса может быть следующих типов:
  // - string, object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Для браузера: FormData, File, Blob
  // - Для Node JS: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` количество миллисекунд до истечения времени ожидания запроса.
  // Если запрос занимает больше времени, чем `timeout`, он будет прерван.
  timeout: 1000,

  // `withCredentials` - отображает статус CORS запросов - то есть должны ли запрошиваться 
  // необходимые парметры или нет. Подробнее тут - https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
  withCredentials: false, // default

  // `adapter` - позволяет делать доп.настройку запросов, что облегчает тестирование.
  // Возвращает Promis и валидный ответ (подробнее в lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` указывает, необходимо ли использовать HTTP Basic auth и предоставлять учетные данные.
  // ВНИМАНИЕ! Этот параметр установит в запрос заголовок `Authorization`, перезаписав все существующие
  // пользовательские заголовки `Authorization`, которые вы задали в настройках 
  // с помощью параметра - 'headers`
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` указывает тип данных, которыми ответи сервер
  // варианты: «arraybuffer», «blob», «document», «json», «text», «stream»,
  responseType: 'json', // по умолчанию

  // `responseEncoding` указывает какую кодироваку использовать для обрабтки ответов
  // Примечание: Игнорируется для опции `responseType` - 'stream'(поток) или запросов на стороне клиента,
  // что вполне логично, так как потоковые данные и должны так передаваться
  responseEncoding: 'utf8', // default

  //`xsrfCookieName` - имя cookie для использования в качестве значения для токена xsrf
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` http-заголовко для использования в качестве значения для токена xsrf
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` позволяет обрабатывать события прогресса для загрузки данных
  // например тут можно "повесить" индикатор загружки данных на сервер
  onUploadProgress: function (progressEvent) {
    // делаем тут что угодно...
  },

  // `onDownloadProgress` позволяет обрабатывать события прогресса скачивания данных
  // как варианрт - разместить здесь индикачию размера скачиванемого файла
  onDownloadProgress: function (progressEvent) {
    // делаем тут что угодно...
  },

  // `maxContentLength` определяет максимальный размер содержимого ответа HTTP в байтах
  maxContentLength: 2000,

  // `validateStatus` определяет, разрешать или отклонять Prоmise для данного
  // HTTP-ответа. Если `validateStatus` возвращает` true` (или установлен в `null`
  // или `undefined`), Primise будет выполнен; в противном случае отклонен
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` - максимальное количество редиректов в node.js.
  // если значение устанвлено в "0" - редиректа не будет
  maxRedirects: 5, // default

  // `socketPath` определяет UNIX Socket для использования в node.js.
  // например. '/var/run/docker.sock' для отправки запросов демону docker.
  // Можно указать только «socketPath» или «proxy».
  // Если оба указаны, используется `socketPath`.
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.

  // `httpAgent` и` httpsAgent` - установка своего `httpAgent`, который будет использоваться 
  // при выполнении http и https-запросов. Соответственно, в node.js. 
  // Это позволяет добавлять опции (например `keepAlive`), которые по умолчанию не включены.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' определяет имя хоста и порт прокси-сервера
  // Используйте `false` для отключения прокси при запросах, игнорируя глобальные среды.
  // `auth` указывает, что для подключения к прокси следует использовать HTTP Basic auth и
  // предоставляет учетные данные.
  // Эта опция установит заголовок `Proxy-Authorization`, переписывая любые существующие
  // `Proxy-Authorization` заголовки, которые вы задали в` headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` указывает токен, который может использоваться для отмены запроса
  cancelToken: new CancelToken(function (cancel) {
  })
}
```


## Схема ответа

Ответ на запрос содержит следующие параметры:

```js
{
  // `data`  - собственно данные ответа от сервера тут
  data: {},

  // `status` HTTP код ответа от сервера
  // полный список тут - https://developer.mozilla.org/ru/docs/Web/HTTP/Status
  status: 200,

  // `statusText` - текст сообщение ответа от сервера
  statusText: 'OK',

  // `headers` - заголовки ответа от сервера.
  headers: {},

  // `config` - это конфигурация `axios` для запроса
  config: {},

  // `request` - это запрос, который сгенерировал этот ответ
  // Это последний экземпляр ClientRequest в node.js (в переадресации)
  // и экземпляр XMLHttpRequest в браузере
  request: {}
}
```

Используя `then` можно посмотреть ответ таким образом:

```js
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

When using `catch`, or passing a [rejection callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) as second parameter of `then`, the response will be available through the `error` object as explained in the [Handling Errors](#handling-errors) section.

## Config Defaults

You can specify config defaults that will be applied to every request.

### Global axios defaults

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### Custom instance defaults

```js
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### Config order of precedence

Config will be merged with an order of precedence. The order is library defaults found in [lib/defaults.js](https://github.com/axios/axios/blob/master/lib/defaults.js#L28), then `defaults` property of the instance, and finally `config` argument for the request. The latter will take precedence over the former. Here's an example.

```js
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
  timeout: 5000
});
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

If you may need to remove an interceptor later you can.

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

You can add interceptors to a custom instance of axios.

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## Handling Errors

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

You can define a custom HTTP status code error range using the `validateStatus` config option.

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
})
```

## Cancellation

You can cancel a request using a *cancel token*.

> The axios cancel token API is based on the withdrawn [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises).

You can create a cancel token using the `CancelToken.source` factory as shown below:

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor:

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

> Note: you can cancel several requests with the same cancel token.

## Using application/x-www-form-urlencoded format

By default, axios serializes JavaScript objects to `JSON`. To send data in the `application/x-www-form-urlencoded` format instead, you can use one of the following options.

### Browser

In a browser, you can use the [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API as follows:

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/WebReflection/url-search-params) available (make sure to polyfill the global environment).

Alternatively, you can encode data using the [`qs`](https://github.com/ljharb/qs) library:

```js
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

Or in another way (ES6),

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### Node.js

In node.js, you can use the [`querystring`](https://nodejs.org/api/querystring.html) module as follows:

```js
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

You can also use the [`qs`](https://github.com/ljharb/qs) library.

## Semver

Until axios reaches a `1.0` release, breaking changes will be released with a new minor version. For example `0.5.1`, and `0.5.4` will have the same API, but `0.6.0` will have breaking changes.

## Promises

axios depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## TypeScript
axios includes [TypeScript](http://typescriptlang.org) definitions.
```typescript
import axios from 'axios';
axios.get('/user?ID=12345');
```

## Resources

* [Changelog](https://github.com/axios/axios/blob/master/CHANGELOG.md)
* [Upgrade Guide](https://github.com/axios/axios/blob/master/UPGRADE_GUIDE.md)
* [Ecosystem](https://github.com/axios/axios/blob/master/ECOSYSTEM.md)
* [Contributing Guide](https://github.com/axios/axios/blob/master/CONTRIBUTING.md)
* [Code of Conduct](https://github.com/axios/axios/blob/master/CODE_OF_CONDUCT.md)

## Credits

axios is heavily inspired by the [$http service](https://docs.angularjs.org/api/ng/service/$http) provided in [Angular](https://angularjs.org/). Ultimately axios is an effort to provide a standalone `$http`-like service for use outside of Angular.

## License

MIT

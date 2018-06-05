import React, { Component } from 'react';
import axios from 'axios';
import api from './settings'

import Search from './components/Search'
import Card from './components/Card'
import Content from './components/Content'
import Error from './components/Error'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            films: [],
            status: true,
            err: 'no errors...'
        }

    }

   
    searchFilms(title) {
          
    }
  
    render() {
        if(!this.state.status ) {
            return (
                <div className="App">
                    <Search onSearch={ this.searchFilms }/>
                    <Content>
                        <Error error={ this.state.err }/>
                    </Content>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Search onSearch={ this.searchFilms }/>
                    
                    <Content>
                        <div className="card-wrapper">
                            {this.state.films.map((film)=> {
                                return(
                                    <Card 
                                        title={ film.Title }
                                        year={ film.Year }
                                        poster={ film.Poster }
                                        type={ film.Type }
                                        key={ film.imdbID }
                                    />
                                )
                            })}
                        </div>
                    </Content>
                </div>
            )
        }
        
    }
}

export default App;

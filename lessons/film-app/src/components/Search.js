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
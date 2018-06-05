import React from 'react';

function Card(props) {
    let image = (props.poster === 'N/A') ? 'https://www.nilfiskcfm.com/wp-content/uploads/2016/12/placeholder.png' : props.poster;

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
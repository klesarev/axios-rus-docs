import React from 'react';

function Content({ children }) {
    return(
        <div className="card-list">
            <div className="container">
                { children }
            </div>
        </div>
    )
}

export default Content;
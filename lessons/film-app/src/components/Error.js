import React from 'react';

function Error(props) {
    return(
        <div class="alert alert-danger" role="alert">
            { props.error }
        </div>
    )
}

export default Error;
import React from 'react'
import {Link} from 'react-router-dom';
import "../styling/Main.css";

const Set = ({set}) => {
    return (
        <Link to={`/set/${set.id}`} className='setLink'>
            <div>{set.title}</div>
        </Link>
    )
}

export default Set
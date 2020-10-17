import React from 'react'
import './Card.css'
function Card (props)
{
    return <div className='column'>
    <div className='row_card'><h2>Title:</h2> <h2>{props.Title}</h2></div>
    <div className='row_card'><h3>Description:</h3><h3>{props.Description}</h3></div>
    <div className='row_card'><p>Expiry date:</p><p>{props.Expiry}</p></div>
    </div>
}

export default Card
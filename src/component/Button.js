import React from 'react'
import './Button.css';
function Button(props) {
  return (
    <div className='btn-all'>
           <button className="btn-now">{props.data}</button>
    </div>
  )
}

export default Button;
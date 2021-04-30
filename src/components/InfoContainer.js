import React from 'react'

const InfoContainer = (props) => {
    return (
        <div className='info-container'>
          <div className='button-container'>
            <button className='increase-btn' onClick={() => props.increase()}>Increment</button>
            <button className='decrease-btn' onClick={() => props.decrease()}>Decrement</button>
          </div>
          <h2>Current Count: {props.count}</h2>
          <button className='get-count-btn' onClick={() => props.getCount()}>Get Count</button>
        </div>
    )
}

export default InfoContainer

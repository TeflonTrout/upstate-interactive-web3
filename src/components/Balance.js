import React from 'react'

const Balance = (props) => {
    return (
        <div className='balance-container'>
          <h2>
            {props.isLoading
            ? ''
            : `Balance: ${props.balance ? props.balance : '0'} ETH`}
          </h2>
        </div>
    )
}

export default Balance

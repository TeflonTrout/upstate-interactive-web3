import React from 'react'

const Account = (props) => {
    return (
        <div>
            <h1
            style={{
              display: props.isLoading ? 'none' : '',
              color: props.isConnected ? 'black' : 'darkred',
              fontSize: props.isConnected ? '28px' : '16px'
            }}>
            {props.isConnected 
            ? `Account: ${props.myAccount.slice(0,10)}...` 
            : 'Please Connect MetaMask'}
          </h1>
        </div>
    )
}

export default Account

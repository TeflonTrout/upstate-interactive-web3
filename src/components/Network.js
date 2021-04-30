import React from 'react'

const Network = (props) => {

  //Function to capitalize the first letter of a string
  function capitalizeFirstLetter(network) {
    if (network !== undefined) {
      return network.charAt(0).toUpperCase() + network.slice(1);
    }
  }
    return (
        <div className='extra-info-container'>
            {props.isConnected ? <h3>Connected to: {capitalizeFirstLetter(props.network)} Network</h3> : '' }
        </div>
    )
}

export default Network

import React from 'react'
import Emoji from '../components/Emoji.js'

const MetaMaskButton = (props) => {
    return (
        <div>
            <button 
            className='metamask-btn' 
            style={{display: props.isConnected ? 'none' : 'block'}}
            onClick={() => props.web3Connect()}>
            Connect MetaMask 
            <Emoji symbol='🦊' label='fox'/>
          </button>
        </div>
    )
}

export default MetaMaskButton

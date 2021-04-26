import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { ABI_ADDRESS, ABI_CONTRACT } from './config.js';
import Emoji from './Emoji.js';
import Logo from './images/upstate-interactive.png';
import './Style.css';

function App() {
  const [contract, setContract] = useState();
  const [web3, setWeb3] = useState();
  const [myAccount, setMyAccount] = useState();
  const [count, setCount] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // const init = async() => {
    //   try {
    //     const web3 = new Web3(Web3.givenProvider);
    //     if (window.ethereum) {
    //       await window.ethereum.request({ method: 'eth_requestAccounts' });
    //       window.web3 = new Web3(window.ethereum);
    //       setWeb3(web3);
    //       //CHECK IF CONNECTED TO RINKEBY TEST NETWORK
    //       web3.eth.net.getNetworkType()
    //         .then(res => {
    //           if(res !== 'rinkeby'){
    //             alert("Please Connect to the Rinkeby Test Network!")
    //           }
    //         });
    //       //DEFINE CONTRACT
    //       const newContract = new web3.eth.Contract(ABI_CONTRACT, ABI_ADDRESS);
    //       setContract(newContract);
    //       //DEFINE METAMASK ACCOUNT
    //       const newAccount = await web3.eth.getAccounts();
    //       setMyAccount(newAccount[0]);
    //       //DEFINE CURRENT COUNT
    //       const tempCount = await newContract.methods.getCount().call();
    //       setCount(tempCount);
    //       setIsConnected(true);
    //       return true;
    //     } else {
    //       console.log('PLEASE CONNECT METAMASK')
    //     }
    //   } catch (error) {

    //   }
    // }
    // init();
  }, [])

  useEffect(() => {
    getBalance(myAccount, web3)
  }, [myAccount])

  async function loadBlockchainData() {
    try {
      const web3 = new Web3(Web3.givenProvider);
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        setWeb3(web3);
        //CHECK IF CONNECTED TO RINKEBY TEST NETWORK
        web3.eth.net.getNetworkType()
          .then(res => {
            if(res !== 'rinkeby'){
              alert("Please Connect to the Rinkeby Test Network!")
            }
          });
        //DEFINE CONTRACT
        const newContract = new web3.eth.Contract(ABI_CONTRACT, ABI_ADDRESS);
        setContract(newContract);
        //DEFINE METAMASK ACCOUNT
        const newAccount = await web3.eth.getAccounts();
        setMyAccount(newAccount[0]);
        //DEFINE CURRENT COUNT
        const tempCount = await newContract.methods.getCount().call();
        setCount(tempCount);
        //DEFINE ISCONNECTED
        setIsConnected(true);
        return true;
      } else {
        setIsConnected(false);
        console.log('PLEASE CONNECT TO METAMASK')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getBalance = async (myAccount, web3) => {
    try {
      const balance = await web3.eth.getBalance(myAccount);
      const toDecimal = await web3.utils.fromWei(balance);
      setWalletBalance(toDecimal);
    } catch (error) {
    }
  };

  const handleAccountChange = async () => {
    await loadBlockchainData()
      .then(getBalance(myAccount, web3))
  }

  const web3Connect = async () => {
      handleAccountChange();
  }

  const getCount = async () => {
    if(contract !== undefined) {
      const getCount = await contract.methods.getCount().call({ from: myAccount });
      setCount(getCount)
    } else {
      console.log('PLEASE CONNECT TO METAMASK')
    }
  }

  const handleIncrease = async (e) => {
    e.preventDefault();
    if(contract !== undefined) {
      const increase = await contract.methods.increment().send({ from:myAccount });
      return increase;
    } else {
      console.log('PLEASE CONNECT TO METAMASK')
    }
  }

  const handleDecrease = async (e) => {
    e.preventDefault();
    if(contract !== undefined) {
      const decrease = await contract.methods.decrement().send({ from:myAccount });
      return decrease;
    } else {
      console.log('PLEASE CONNECT TO METAMASK')
    }
  }

  //Check to see if a Web3 provider is installed
  if(window.ethereum) {
    //Handle an account change
    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.isConnected();
  } else {
    console.error("*** PLEASE USE A METAMASK COMPATIBLE BROWSER ***")
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} alt="Upstate Interactive"/>
      </div>
      <div className="hero">
          <button 
            className='metamask-btn' 
            style={{display: isConnected ? 'none' : 'block'}}
            onClick={e => web3Connect(e)}>
            Connect MetaMask 
            <Emoji symbol="🦊" label="fox"/>
          </button>
        <div className="account-container">
          <h1 style={{
            color: isConnected ? 'black' : 'darkred',
            fontSize: isConnected ? '22px' : '16px'
            }}>
            {isConnected ? `Account: ${myAccount}` : "Please Connect MetaMask"}
          </h1>
        </div>
        <div className="balance-container">
          <h2>
            Balance: {walletBalance ? walletBalance : "0"} ETH
          </h2>
        </div>
        <div className="info-container">
          
          <div className='button-container'>
            <button className='increase-btn' onClick={e => handleIncrease(e)}>Increment</button>
            <button className='decrease-btn' onClick={e => handleDecrease(e)}>Decrement</button>
          </div>
          <h3>Count: {count}</h3>
          <button className='get-count-btn' onClick={e => getCount(e)}>Get Count</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ABI_ADDRESS, ABI_CONTRACT } from './config.js';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Network from './components/Network.js'
import Account from './components/Account.js'
import MetaMaskButton from './components/MetaMaskButton.js'
import Balance from './components/Balance.js'
import InfoContainer from './components/InfoContainer.js'
import UpstateLogo from './components/UpstateLogo.js';
import './Style.css';

function App() {
  const [contract, setContract] = useState();
  const [web3, setWeb3] = useState();
  const [myAccount, setMyAccount] = useState();
  const [count, setCount] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState(false);

  //Anytime 'myAccount' is updated or changed, run the getBalance function
  useEffect(() => {
    getBalance(myAccount, web3);
  }, [myAccount])

  //Pull all of the blockchain data needed from a web3 provider
  async function loadBlockchainData() {
    try {
      const web3 = new Web3(Web3.givenProvider);
      if (window.ethereum) {
        setIsLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        setWeb3(web3);

        //CHECK IF CONNECTED TO RINKEBY TEST NETWORK
        web3.eth.net.getNetworkType()
          .then(res => {
            setNetwork(res);
            if(res !== 'rinkeby'){
              alert('Please Connect to the Rinkeby Test Network!')
              setIsLoading(false);
            } 
            return;
          });

        //DEFINE CONTRACT
        const newContract = new web3.eth.Contract(ABI_CONTRACT, ABI_ADDRESS);
        setContract(newContract);

        //DEFINE METAMASK ACCOUNT
        const newAccount = await web3.eth.getAccounts();
        setMyAccount(newAccount[0]);

        //DEFINE CURRENT COUNT
        const tempCount = await newContract.methods.getCount().call({ from: newAccount[0] });
        setCount(tempCount);
        setIsConnected(true);
        setIsLoading(false);
        return true;
      } else {
        setIsConnected(false);
        console.log('PLEASE CONNECT TO METAMASK')
      }
    } catch (error) {
      if(web3 !== undefined) {
        console.error(error)
      }
    }
  }

  //Function to get the balance of current web3 account
  const getBalance = async (myAccount, web3) => {
    if(web3 !== undefined){
        const balance = await web3.eth.getBalance(myAccount);
        //Convert balance from Wei to Ether
        const toDecimal = await web3.utils.fromWei(balance);
        setWalletBalance(toDecimal.slice(0,6));
    }
  };

  //function to check if the current browser is able to connect to 
  //ethereum network. If so all the data from the web3 provider is pulled
  const web3Connect = async () => {
    try {
      if(window.ethereum.isConnected() === true) {
        await loadBlockchainData()
          .then(getBalance(myAccount, web3))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const reloadPage = () => {
    window.location.reload(false)
  }

  //A function that calls the Solidity contract's 'getCount' function
  const getCount = async () => {
    if(contract !== undefined) {
      const getCount = await contract.methods.getCount().call({ from: myAccount });
      setCount(getCount);
      setSnackbarOpen(true);
    } else {
      console.error('PLEASE CONNECT TO METAMASK')
    }
  }

  //Calls the Soldity 'increment' function
  const handleIncrease = async () => {
    if(contract !== undefined) {
      const increase = await contract.methods.increment().send({ from:myAccount })
        .on('receipt', function(){setSnackbarOpen(true)})
        .on('error', function(){setFailedSnackbarOpen(true)})
      return increase;
    } else {
      console.error('PLEASE CONNECT TO METAMASK')
    }
  }

  //Calls the Solidity 'decrement' function
  const handleDecrease = async () => {
    if(contract !== undefined) {
      const decrease = await contract.methods.decrement().send({ from:myAccount })
        .on('receipt', function(){setSnackbarOpen(true)})
        .on('error', function(){setFailedSnackbarOpen(true)})
      return decrease
    } else {
      console.error('PLEASE CONNECT TO METAMASK')
    }
  }

  //Check to see if a Web3 provider is installed if so, an
  //accountsChanged and isConnected event listeners are added
  if(window.ethereum) {
    //If the account is changed the page is reloaded for security reasons
    window.ethereum.on('accountsChanged', reloadPage);
    window.ethereum.isConnected();
  } else {
    console.error('*** PLEASE USE A METAMASK COMPATIBLE BROWSER ***')
  }

  //closeSnackbar and closeFailedSnackbar are functions to close
  //the snackbar modal after a transaction is completed or failed
  const closeSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false)
  }

  const closeFailedSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailedSnackbarOpen(false)
  }
 
  return (
    <div className='App'>
      <UpstateLogo />
      {isConnected 
      ? <Network isConnected={isConnected} network={network} /> 
      : ""}
      <div className='hero'>
        <Account isLoading={isLoading} isConnected={isConnected} myAccount={myAccount} />
          <MetaMaskButton isConnected={isConnected} web3Connect={web3Connect}/>
          {isConnected
          ? ""
          : <h5 onClick={function(){window.open('https://metamask.io', "_blank")}}>Don't have a MetaMask Account?</h5>}
        <div className='account-container'>
          <h1 style={{display: isLoading ? 'flex' : 'none'}}>Loading...</h1>
        </div>
        <Balance isLoading={isLoading} balance={walletBalance}/>
        <InfoContainer count={count} increase={handleIncrease} decrease={handleDecrease} getCount={getCount} />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={e => closeSnackbar(e)}
        message="Transaction Confirmed"
        action={
          <div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={e => closeSnackbar(e)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={failedSnackbarOpen}
        autoHideDuration={5000}
        onClose={e => closeFailedSnackbar(e)}
        message="Transaction Failed"
        action={
          <div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={e => closeFailedSnackbar(e)}>
              <CloseIcon size='small' />
            </IconButton>
          </div>
        }
      />
    </div>
  );
}

export default App;

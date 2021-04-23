import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { ABI_ADDRESS, ABI_CONTRACT } from './config.js';

function App() {
  const [contract, setContract] = useState();
  const [myAccount, setMyAccount] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    loadBlockchainData()
    .then(newContract => {
      setContract(newContract)
    })
  }, [])

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);

      //CHECK IF CONNECTED TO RINKEBY TEST NETWORK
      web3.eth.net.getNetworkType()
        .then(res => {
          if(res !== 'rinkeby'){
            alert("Please Connect to the Rinkeby Test Network and refresh the page!")
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
      console.log('#####', tempCount)
      return newContract;
    }
  }

  const getCount = async () => {
    const getCount = await contract.methods.getCount().call();
    setCount(getCount)
    console.log('$$$$$$', getCount)
  }

  const handleIncrease = async (e) => {
    e.preventDefault();
    const increase = await contract.methods.increment().send({ from:myAccount });
    return increase;
  }

  const handleDecrease = async (e) => {
    e.preventDefault();
    const decrease = await contract.methods.decrement().send({ from:myAccount });
    return decrease;
  }

  return (
    <div className="App">
      My Account: {myAccount}
      <div>

      <button onClick={e => getCount(e)}>Get Count</button>
      Count: {count}
      <button onClick={e => handleIncrease(e)}>Increase</button>
      <button onClick={e => handleDecrease(e)}>Decrease</button>
      </div>
    </div>
  );
}

export default App;

# Upstate Interactive Web3 Challenge

This project was developed as a challenge for the Upstate Interactive - Web3 Developer position.

## Usage

In order for the application to run, the user must connect a MetaMask account to the Rinkeby Test Network. Once connected to MetaMask the users wallet address and account balance are shown.

The user may then call contract functions provided from the Solidity contract at address '0x75372E5EE5eB616E7e64156Bcae5294FA8F0c319'. This contract allows users to Increment or Decrement a count based upon the caller's address. Counts are dependent of each users address.

Once the transaction is completed in MetaMask the user can call a getCount function from the contract ABI that will allow them to update the current count.

## Available Scripts

In the project directory, you can run:

### `npm start`

This is the preferred method to run the test applicaton. 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
## Learn More About Packages Used

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about Web3.js documentation, click [here](https://web3js.readthedocs.io/en/v1.3.4/)

To learn more about MetaMask documentation, click [here](https://docs.metamask.io/guide/)


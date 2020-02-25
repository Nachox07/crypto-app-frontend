# crypto-app-frontend

## Project description

This project is about a cryptocurrencies-like website. Here is a description of the features it contains:

### Main accounts page

- This a page which is showing a list of accounts/wallets, like an administration panel from a user.
- Each account has a balance in Bitcoin (BTC), it should display the balance in dollars given an exchange rate of the BTC to \$ by WebSocket at any time.
- When a new exchange is pushed, it updates each account balance. Also, the account balance may change in the time, it will update the balance in real change and notifying in the following way:
  - Red colour when the balance is lower than before
  - Green colour when the balance is higher than before
- Each account is a clickable element that will open a new page without refreshing with account details

### Account details page

- This is a page which is showing the details from a given account ID
- It should display a list of transactions attached to the given account
- It shows the balance which as before is changed by the exchange rate update and flash a different colour depending on the balance update

### App header

- Top bar component that allows the user to return to the home view

## Architecture introduction

This repository contains a React app which connects to a backend compose by a restful API and WebSockets in order to render the fakr data in real-time. The tech stack is the following:

- React with Typescript
- Material UI as components library
- Xstate and RxJS for business logic and networking
- socket.io client
- Automation testing with Cypress and Jest

## Installation

Firstly all the dependencies need to be installed, as this is a JS project `node` is necessary plus a dependency installer, the preference here is `yarn`

Once these tools are installed you need to run on the project folder for dependencies installation:

`yarn`

## Running the app

First, the backend must be running or even a mock server on the port `8080`, the quickest way is to set up the backend repository which is https://github.com/Nachox07/crypto-app-backend

Once it is running, you just need to run `yarn start`

Now it should open a browser tab on `http://localhost:3000`

## Testing

### Unit testing

The command to run the unit tests is:

`yarn test`

## Integration testing

The following command open Cypress with the available suites:

`yarn cypress:open`

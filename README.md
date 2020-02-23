# crypto-app-frontend

## Quick introduction

This repository contains a React app that looks like a sample of a cryptocurrency website. It connects to a backend compose by a restful API and WebSockets in order to render fake data in real-time. The tech stack is the following:

- React with Typescript
- Material UI as components library
- Xstate and RxJS for business logic and networking
- socket.io client

## Installation

Firstly all the dependencies need to be installed, as this is a JS project you need `node` plus a dependency installer, the preference here is `yarn`

Once these tools are installed you need to run on the project folder:

`yarn`

## Running the app

First, the backend must be running or even a mock server on the port `8080`, the quickest way is to set up the backend repository which is https://github.com/Nachox07/crypto-app-backend

Once it is running, you just need to run `yarn start`

## Testing

The command to run the unit tests is:

`yarn test`

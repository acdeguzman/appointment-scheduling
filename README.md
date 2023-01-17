# appointment-scheduling

## Dependencies
This project was developed using the following libraries and versions:

- NodeJS version `v18.13.0`
- npm version `8.19.3`
- Hapi.js version `21.1.0`
- React version `18.2.0`

## Steps to run
1. Download Redis on your local machine and run `redis-server` to start the server. The redis port used is the default port `port: 6379`
2. Go to servers folder and run `npm i` to insall the necessary dependencies. After dependency installation, run `npm start` to start the backend server. The server will lister on `port: 3010`
3. Go to the client folder and run `npm i` to install the dependencies on the client server then run `npm start`. This will start the frontend server on `port: 3000`
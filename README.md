# Looking for Game
This app is still under development

## Tech
- ExpressJS
- React 
- PostgreSQL

## To run locally
1. Download the zip file
2. have postresql installed locally
3. docker-compose up --build -d ( for redis )
4. cd into backend, create .env file with your db settings & JWT setting, npm i && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all && npm start
5. seperate terminal
6. cd frontend, npm i && npm start

- react app on localhost:3000
- express app on locaclhost:5000

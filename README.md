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


MIT License

Copyright (c) 2022 Sean Cotter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

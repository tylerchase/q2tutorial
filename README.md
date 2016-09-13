-- STEPS TO ADD A DATABASE WITH TABLES TO HEROKU

> mkdir q2tutorial
> cd q2tutorial
> touch .env

> express --hbs --git
> npm install

- Go to github and create a repo and copy the address

> git init
> git add .
> git commit -m "first commit"
> git remote add origin "blah blah blah"
> git push origin master

> heroku create [name of application]  
> npm install knex --save
> npm install pg -S
> knex init

> git add .
> git commit -m "added knexfile.js and package.json"
> git push

> createdb [name of database] // we will call it 'q2tutorialdb' for the rest of the project
> atom .

- add .env inside the .gitignore file

- Change client and connection in the knexfile.js
      development: {
        client: 'postgres',
        connection: {
          database: name of database created earlier wrapped in quotes // ex = : 'q2tutorialdb'
        }
      },

- Remove the staging object from the knexfile.js

> knex migrate:make [name of table] // we will call it todos

- Now from the migrations folder find the migration file that you just made
- Add the table info (example below)

exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table){
    table.increments();
    table.string('name');
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos')
};

> knex migrate:latest

- Check to see if the table is there
> psql [name of database]
 =# TABLE [name of table];

- Get out of psql (type : '\q' + hit enter)
> git add .
> git commit -m "first migration"

- Add the data to your table
> knex seed:make [name of data]

- Go to the seed folder and click on the file that you just created
- Change all of the 'table_name' to the name of your table
- Insert seed data in the object to match with the columns that you made in the table
ex :
knex('todos').insert({id: 1, name: "dummy data1", description: "just add it in"}),
knex('todos').insert({id: 2, name: "dummy data2", description: "just add it in"}),
knex('todos').insert({id: 3, name: "dummy data3", description: "just add it in"})


> knex seed:run
> psql [name of database]
 =# TABLE [name of table]

- create a database on heroku
- heroku docs (https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database)

> heroku addons:create heroku-postgresql:hobby-dev
> heroku config

- Copy the entire DATABASE_URL location
- Paste it into the .env file
- Change the colon after DATABASE_URL to an equal sign
- At the end of the address add "?ssl=true"
example : DATABASE_URL = postgres://blahblahblah:lfQwRfNea3qGrwOxJTYYtdWGkd@ec2-54-235-183-28.compute-1.amazonaws.com:5432/d8pr5444mns72?ssl=true
- make sure it is all on one line (sometimes it adds spaces in the address)

- Go to the knexfile.js file
- set production.connection: process.env.DATABASE_URL,

> npm install dotenv --save

- Add "var dotenv = require('dotenv').config()" to the top of the knexfile.js file

> knex migrate:latest --env production
> knex seed:run --env production

> git push heroku master
> heroku open

- from the command line you can check to see if the tables are added to your heroku backend
> heroku pg:psql
 => \d 
 => SELECT * from [name of table]

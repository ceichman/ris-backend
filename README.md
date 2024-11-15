# Backend for [RIS Cost Calculator](https://github.com/ceichman/ris-cost-calculator)

You know the drill. `npm i` then `node app.js`. Runs on port 3001.

## MariaDB setup

Install and set up MariaDB with user `ris` and password `rispass`. Make a database called `ris_db` and give `SELECT, INSERT, UPDATE` permissionsto `ris` on all tables. Make a table `log` with the following command:

`create table log ( id int auto_increment primary key, ip varchar(255), time datetime, primaryPlan varchar(255), secondaryPlan varchar(255) );`



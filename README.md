Inventory_node_express

	
npm install the following:
  1) express -save
  2) express-validator -save
  3) body-parser -save
  4) method-override -save
  5) express-flash -save
  6) cookie-parser -save
  7) express-session -save
  8) ejs -save
  9) mysql -save
  10) express-myconnection -save
  
Database:
  CREATE DATABASE invetory
  
  CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) 

const {Sequelize} = require("sequelize");

export const sequelizeConfig = new Sequelize(
   process.env.MARIADB_INSTANCE, 
   process.env.MARIADB_USER,
   process.env.MARIADB_PWD,
    {
      host: process.env.MARIADB_HOST,
      dialect: 'mysql'
    }
  );

 require('./dbModel/associations'); // run associations
  
export const connectMongoDB = ()=>{
  
  var mongoose = require("mongoose");
  
  const mongoDB = process.env.MONGODB_HOST;
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

const Pool=require('pg').Pool;
const mongoose = require('mongoose');
// const connectDB = (url) => {
//   // return mongoose.connect(url);
// };
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"users",
    password:process.env.PG_PASSWORD,
    port:5432,
});

module.exports=pool;
const pool=require('../db/pg')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const errorHandler=require('../errors/errorHandler')

const signup = async (req, res,next) => {
    const {name, email, password,country_code,phone_no } = req.body;

    pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
      if (error) {
        // Handle database query error here
        return next(error);
    }
      else if(results.rows.length)
     return next(new errorHandler("User already exists",404))
      else{
      //hashing password for safe storage
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      pool.query(
      "INSERT INTO users (name, email,password,country_code,phone_no) VALUES ($1, $2, $3, $4,$5)",
      [name, email,hash,country_code,phone_no],
      (error, results) => {
        if (error) throw error;
        res.status(201).json({msg:"User Created"});
      }
    );
    }
    });
}

const getUser=async (req,res,next)=>{
    const id = parseInt(req.params.userId, 10);
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) throw error;
        if(results.rows.length==0){
          return next(new errorHandler("No User with given userID",404))
        }
        else{
          res
          .status(200)
          .json ({ users: results.rows });
        }
      });
}

const updateUser = async (req, res,next) => {
    const id = parseInt(req.params.userId, 10);
    const { name, email,password,country_code,phone_no } = req.body; 
     //hashing password for safe storage
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    pool.query(
        "UPDATE users SET name = $1, email = $2,password=$3,country_code=$4,phone_no=$5 WHERE id = $6",
        [name, email,hash,country_code,phone_no, id],
        (error, results) => {
            if (error) throw error;
            else if (results.rowCount === 0) {
              return next(new errorHandler("No User with given userID",404))
            }
            else{
              res.status(200).json({ message: "User updated successfully" });
            }
        }
    );
};


const deleteUser=async (req,res,next)=>{
    const id = parseInt(req.params.userId, 10);
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) throw error;
      else if (results.rowCount === 0) {
        return next(new errorHandler("No User with given userID",404))
      }
      else{
      res.status(200).json({msg:'Deleted User'});
      }
    });
}

module.exports = { signup,getUser,updateUser,deleteUser};
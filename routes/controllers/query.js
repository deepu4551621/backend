const {Pool} = require('pg')
const hash = require('../middlewares/hashpassword')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const createUser = async(request, response) => {
    const { name, email, password } = request.body;
    let hashedPassword =  await hash(password)
    console.log("create",hashedPassword)
    try {
      pool.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
        [name, email, hashedPassword],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).json(`User added with ID: ${results.rows[0].id}`);
        }
      );
    } catch (error) {
      response.json(error);
    }
  };
const getUsers = (request, response) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  const getUserById = (request, response) => {
    const id = request.query.id;
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  const updateUser = (request, response) => {
    const id = request.query.id;
    const { name, email } = request.body;
  
    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };
  
  const deleteUser = (request, response) => {
    const id = request.query.id;
  
    pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
  };
  
  module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
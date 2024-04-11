const cloudinary= require('../middlewares/cloudinary')
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const uploadImage = (req, res) => {
    const id = req.body.id
    console.log("formdata", req.body.id)
    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log('23/uploadimage/backend', err)
            return res.status(500).json({
                success:false,
                message:'Error'
            })
        }
        console.log('resultfromCLoudinary:', result)
        pool.query(
            `UPDATE users SET profile_url = $1 WHERE id = $2`,
            [result.url, id],
            (error, results) => {
              if (error) {
                throw error;
              }
              console.log('sendTodb', results)
              // Send success response
              res.status(200).json({
                success:true,
                message:'Uploaded!',
                data:result
            })
            
              }
          );
       
    })
  }
  module.exports = uploadImage
const cloudinary = require('cloudinary').v2
const Cloudinary_url = process.env.CLOUDINARY_URL

cloudinary.config({Cloudinary_url});

module.exports=cloudinary
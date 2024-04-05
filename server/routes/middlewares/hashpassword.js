const bcrypt =require('bcrypt')
const Hashpassword=( pass, hashed)=>{
    try {
        const hashedPassword = bcrypt.compare(pass, hashed)
 return hashedPassword;
    } catch (error) {
        console.log('hasherror',error)
    }

}
module.exports =Hashpassword;


const authenticate = (req,res,next) => {
    console.log(req.cookies.token)

    const token  = req.cookies.token;
    console.log(token)
    if( !token ){ 
        return res.status(401).send('Authentication failedddd:invalid token')
    }
    try{
        const tokenData = token.split('.')[1] // Bearer xxxxxx
        req.userId=tokenData._id;
        next()
    }catch (error){
        res.status(401).send('Authentifcation failedd :invalid token')
    }
} 

module.exports = authenticate;
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'
//funcion para verificar si se esta enviando un token
export const verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers["x-access-token"]
    
    //verificar si estan enviando el token
    if(!token) return res.status(403).json({message:"No token provided"})

    //extrae lo que esta dentro del token
    const decoded = jwt.verify(token, config.SECRET)
    req.userId= decoded.id
    //confirmar si el usuario existe
    const user = await User.findById(req.userId,{password:0})
    if(!User)return res.status(404).json({message:"no user found"})

    next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
}

//verificar si es un admin o un moderador
export const isModerator = async(req,res,next) =>{
    //buscar el user iD si existe
    const user = await User.findById(req.userId)
    //comprobar los roles
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log(roles)

    //validar 
    for(let i=0; i < roles.length; i++){
        if(roles[i].name === 'moderator'){
            next()
            return
    }
    
}
return res.status(403).json({message:"require moderator roles"})
}
export const isAdmin = async(req,res,next) =>{
    //buscar el user iD si existe
    const user = await User.findById(req.userId)
    //comprobar los roles
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log(roles)

    //validar 
    for(let i=0; i < roles.length; i++){
        if(roles[i].name === 'admin'){
            next()
            return
    }
    
}
return res.status(403).json({message:"require admin roles"})

}
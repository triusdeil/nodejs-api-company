import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role'

//Usuario registrandose
export const signup = async(req,res) =>{

    //consultar la base de datos
    const {username, email, password, roles} = req.body
    //creando usuario
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    //comprobar si hay una propiedad roles
    if(roles){
        const foundRoles = await Role.find({name:{$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name: 'user'});
        newUser.roles = [role._id]
    }
    //Guardando usuario
    const savedUser = await newUser.save();
    //Generar jwt
    const token = jwt.sign({id:savedUser._id},config.SECRET,{
        expiresIn: 86400 //24 horas en segundos
    })
    res.status(200).json({token});
}

export const signin = async(req,res) =>{
    //buscar el email y el password en la bd
    const userFound = await User.findOne({email:req.body.email})
    //si el usuario no existe
    if(!userFound) return res.status(400).json({message: 'user not found'})
    //validar si la password ingresada es la misma que la password almacenada
    const matchPassword = await User.comparePassword(req.body.password,userFound.password)
    //si la password es falsa enviar un error
    if(!matchPassword) return res.status(401).json({message:"invalidad password", token:null});
    //enviar el token
    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400 //1 dia
    })
    res.json({token})
}   
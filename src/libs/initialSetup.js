import Role from '../models/Role'
//crear roles basicos para el usuario
export const  createRoles = async () =>{
    
    try{
        //buscaremos si en el modelo rol existen documentos
    const count = await Role.estimatedDocumentCount()

    //si consigue un rol
    if(count>0) return;

    const values = await Promise.all([
        new Role({name: "admin"}).save(),
        new Role({name: "moderator"}).save(),
        new Role({name: "user"}).save()
    ])
    console.log(values);
    } catch (error){
        console.log(error);
    }
}


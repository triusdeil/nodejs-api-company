import Product from "../models/Products"

export const createProduct = async (req,res)=>{
    
    //Crear y Guardar un producto

    //Destructurar y almacenar en req.body
    const {name, price, category, imgURL} = req.body
    //crear un nuevo producto y almacenarlo
    const newProduct = new Product({
        name,
        category,
        price,
        imgURL
    })

    //devolver el producto guardado
    const productSaved = await newProduct.save()

    res.status(201).json(productSaved);
}

export const getProducts = async(req,res)=>{
    //devolver productos almacenados
    const products = await Product.find();
    res.json(products)
}
    
export const getProductById = async (req,res)=>{
    //devolver producto almacenado por id
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

    //Eliminar un producto por id
export const deleteProductById = async(req,res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    res.status(204).json(deletedProduct);
}

    //actualizar producti por el id
    //se busca primero el producto y luego se actualiza y se hacen los cambios necesarios
    //el new true es para devolver los nuevs datos del producto si no te enviara los antiguos
export const updateProductById = async (req,res)=>{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId,req.body,{
        new: true
    })
    res.status(200).json(updatedProduct)
}


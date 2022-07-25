import dbConnection from "../utils/dbConnection.js"

const connection = dbConnection()

export const getProducts = async (req, res) => {
    try{
        const SQL = "SELECT * FROM products"
        connection.query(SQL,(err,result)=>{
            if(err){
                res.render('products',{
                    title: 'Products List',
                    products: [],
                    error: err.message
                })
            } 
            res.render('products',{
                title: 'Products List',
                error: false,
                products: result
            })
        })
    }
    catch(err){
        res.render('products',{
            title: 'Products List',
            products: [],
            error: err.message
        })
    }
}

export const getProductById = async (req, res) => {
    try{
        const SQL = "SELECT * FROM products WHERE id = ?"
        connection.query(SQL,[req.params.id],(err,result)=>{
            if(err){
                res.render('product_details',{
                    title: 'Product Detail',
                    product: {},
                    error: err.message
                })
            }
            res.render('product_details',{
                title: 'Product Detail',
                error: false,
                product: result[0]
            })
        })
    }
    catch(err){
        res.render('product_details',{
            title: 'Product Detail',
            product: {},
            error: err.message
        })
    }
}

export const renderAddProduct = (req, res) => {
    res.render('product_create',{
        title: 'Create Product',
        error: false
    })
}

export const createProduct = async (req, res) => {
    try{
        if(req.file == { } || req.file == undefined || req.file == null){
            res.render('product_create',{
                title: 'Create Product',
                body: req.body,
                error: "A product should have an image"
            })    
        }
        console.log(req.file)
        req.body.image = (req.file.path.replace("\\","/")).replace(" ","%20")

        const SQL = "INSERT INTO products SET ?"
        connection.query(SQL,req.body,(err,result)=>{
            if(err){
                res.render('product_create',{
                    title: 'Create Product',
                    body: req.body,
                    error: err.message
                })
            }
            res.redirect('/')
        })
    }
    catch(err){
        res.render('product_create',{
            title: 'Create Product',
            body: req.body,
            error: err.message
        })
    }
}

export const renderEditProduct = async (req, res) => {
    try{
        const SQL = "SELECT * FROM products WHERE id = ?"
        connection.query(SQL,[req.params.id],(err,result)=>{
            if(err){
                res.render('product_edit',{
                    title: 'Edit Product',
                    product: {},
                    error: err.message
                })
            }
            res.render('product_edit',{
                title: 'Edit Product',
                error: false,
                product: result[0]
            })
        })
    }
    catch(err){
        res.render('product_edit',{
            title: 'Edit Product',
            product: {},
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try{
        const SQL = "UPDATE products SET ? WHERE id = ?"
        connection.query(SQL,[req.body,req.body.id],(err,result)=>{
            if(err){
                res.render('product_edit',{
                    title: 'Edit Product',
                    product: req.body,
                    error: err.message
                })        
            }
            res.redirect('/')
        })
    }
    catch(err){
        res.render('product_edit',{
            title: 'Edit Product',
            product: req.body,
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const SQL = "DELETE FROM products WHERE id = ?"
        connection.query(SQL,[req.params.id],(err,result)=>{
            if(err){
                res.render('product_details',{
                    title: 'produ',
                    product: req.body,
                    error: err.message
                })        
            }
            res.redirect('/')
        })
    }
    catch(err){
        res.render('product_details',{
            title: 'produ',
            product: req.body,
            error: err.message
        })
    }
}
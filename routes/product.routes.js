import express from "express"
import { createProduct, deleteProduct , getProductById, getProducts, renderAddProduct, renderEditProduct, updateProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.get("/",getProducts)

router.get("/view/:id",getProductById)

router.get("/add",renderAddProduct)

router.post("/save",createProduct)

router.get("/edit/:id",renderEditProduct)

router.post("/update",updateProduct)

router.get("/delete/:id",deleteProduct)

export default router
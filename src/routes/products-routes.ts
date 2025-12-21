import { Router } from "express"
import { ProductControlle } from "../controllers/products-controlles.js"

const ProductsRoute = Router()
const ProductControl = new ProductControlle()

ProductsRoute.get('/', ProductControl.Index)
ProductsRoute.post('/', ProductControl.Create)
ProductsRoute.put('/', ProductControl.Upgrade)
ProductsRoute.delete('/', ProductControl.Delete)

export { ProductsRoute }

import { Router } from "express"
import { ProductsRoute } from "./products-routes.js"
import { CarrinhoRouter } from "./carrinho-routes.js"
import { UserRout } from "./clients-routes.js"

export const GeralRoutes = Router()

GeralRoutes.use('/products', ProductsRoute)
GeralRoutes.use('/carrinho', CarrinhoRouter)
GeralRoutes.use('/user', UserRout)


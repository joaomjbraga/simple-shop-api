import { CarrinhoController } from "@/controllers/carrinho-controllers.js"
import { Router } from "express"


const CarrinhoRouter = Router()
const CarrinhoControl = new CarrinhoController()

CarrinhoRouter.get('/', CarrinhoControl.Index)
CarrinhoRouter.post('/', CarrinhoControl.Create)
CarrinhoRouter.put('/', CarrinhoControl.Upgrade)
CarrinhoRouter.delete('/', CarrinhoControl.Delete)
CarrinhoRouter.get('/:id', CarrinhoControl.Comprovante)

export {CarrinhoRouter}
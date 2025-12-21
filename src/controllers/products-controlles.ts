import type { Request, Response, NextFunction } from "express"
import { SetupKnex } from "@/database.js"
import { z } from 'zod'

export class ProductControlle {

  async Index (request: Request, response: Response, next: NextFunction) {
    try {
      const listaProdutos =  await SetupKnex('loja').select('*')
      return  response.status(200).json(listaProdutos)

    } catch (err) {

      next(err)
    }
  }

  async Create (request: Request, response: Response, next: NextFunction) {

    try {
      const bodyschema = z.object({
        products: z.string().trim().min(4)
      })

      const { products } = bodyschema.parse(request.body)

      await SetupKnex<ProductRepository>('loja').insert({products})
      return response.status(201).send('Produto adicionado')
    } catch (error) {

      next(error)
    }

  }

  async Upgrade (request: Request, response: Response, next: NextFunction) {

    try {
      const {id} = request.params
      const { products } = request.body

      await SetupKnex('loja').where({id}).update({products})
      return response.status(200).json({ message: 'Produto atualizado' })

    } catch (error) {
      next(error)
    }

  }

  async Delete (request: Request, response: Response, next: NextFunction) {

    try {
       const { id } = request.body
      await SetupKnex('loja').where({id}).del()
      return response.status(204).send('Produto deletado com sucesso')

    } catch (error) {
      next(error)
    }

  }
}
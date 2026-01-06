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
      const bodySchema = z.object({
        products: z.string().trim().min(4)
      })

      const { products } = bodySchema.parse(request.body)

      await SetupKnex<ProductRepository>('loja').insert({ products })
      return response.status(201).json({ message: 'Produto adicionado com sucesso' })
    } catch (error) {

      next(error)
    }

  }

  async Upgrade (request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        id: z.coerce.number(),
        products: z.string().trim().min(4)
      })
      const { id, products } = bodySchema.parse(request.body)

      const updated = await SetupKnex('loja').where({ id }).update({ products })

      if (updated === 0) {
        return response.status(404).json({ message: 'Produto não encontrado' })
      }

      return response.status(200).json({ message: 'Produto atualizado' })
    } catch (error) {
      next(error)
    }
  }

  async Delete (request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        id: z.coerce.number()
      })
      const { id } = bodySchema.parse(request.body)

      const deleted = await SetupKnex('loja').where({ id }).del()

      if (deleted === 0) {
        return response.status(404).json({ message: 'Produto não encontrado' })
      }

      return response.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

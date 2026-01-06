import { SetupKnex } from "@/database.js"
import type { Request, Response, NextFunction } from "express"
import z from "zod"

export class CarrinhoController {

  async Index(request: Request, response: Response, next: NextFunction) {
    try {
      const info = await SetupKnex("carrinho")
        .select(
          'client.id AS ID do Cliente',
          'client.name AS Cliente',
          'loja.id AS ID do Produto',
          'loja.products AS Produto',
          'carrinho.id AS ID da Compra'
        )
        .join('client', 'client.id', 'carrinho.client_id')
        .join('loja', 'loja.id', 'carrinho.loja_id')

      return response.status(200).json(info)
    } catch (error) {
      next(error)
    }
  }

  async Create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        client_id: z.coerce.number(),
        loja_id: z.coerce.number()
      })

      const { client_id, loja_id } = bodySchema.parse(request.body)

      const client = await SetupKnex('client').where({ id: client_id }).first()
      if (!client) {
        return response.status(404).json({ message: 'Cliente não encontrado' })
      }

      const product = await SetupKnex('loja').where({ id: loja_id }).first()
      if (!product) {
        return response.status(404).json({ message: 'Produto não encontrado' })
      }

      await SetupKnex('carrinho').insert({ client_id, loja_id })
      return response.status(201).json({ message: 'Compra finalizada com sucesso' })
    } catch (error) {
      next(error)
    }
  }

  async Upgrade(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        id: z.coerce.number().int(),
        client_id: z.coerce.number().int(),
        loja_id: z.coerce.number().int()
      })

      const { id, client_id, loja_id } = bodySchema.parse(request.body)

      const carrinho = await SetupKnex('carrinho').where({ id }).first()
      if (!carrinho) {
        return response.status(404).json({ message: 'Carrinho não encontrado' })
      }

      const client = await SetupKnex('client').where({ id: client_id }).first()
      if (!client) {
        return response.status(404).json({ message: 'Cliente não encontrado' })
      }

      const product = await SetupKnex('loja').where({ id: loja_id }).first()
      if (!product) {
        return response.status(404).json({ message: 'Produto não encontrado' })
      }

      await SetupKnex('carrinho')
        .update({ client_id, loja_id })
        .where({ id })

      return response.status(200).json({ message: 'Carrinho atualizado com sucesso' })
    } catch (error) {
      next(error)
    }
  }

  async Delete(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        id: z.coerce.number()
      })
      const { id } = bodySchema.parse(request.body)
      const deleted = await SetupKnex('carrinho').where({ id }).del()

      if (deleted === 0) {
        return response.status(404).json({ message: 'Compra não encontrada' })
      }

      return response.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async Comprovante(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number()
      })
      const { id } = paramsSchema.parse(request.params)

      const comprovante = await SetupKnex('carrinho')
        .select(
          'client.name as Cliente',
          'loja.products as Produto'
        )
        .join('client', 'client.id', 'carrinho.client_id')
        .join('loja', 'loja.id', 'carrinho.loja_id')
        .where('carrinho.id', id)
        .first()

      if (!comprovante) {
        return response.status(404).json({ message: 'Registro não encontrado' })
      }

      return response.status(200).json(comprovante)
    } catch (error) {
      next(error)
    }
  }

}

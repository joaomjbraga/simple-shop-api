import type { Request, Response, NextFunction } from "express"
import { SetupKnex } from "@/database.js"
import z from "zod"

export class ClientsControllers {

  async Index(request: Request, response: Response, next: NextFunction) {
    try {
      const list = await SetupKnex('client').select('*')
      return response.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }
  async IndexUsers(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.number()
      })
      const { id } = paramsSchema.parse(request.params)
      const user = await SetupKnex<ClientRepository>('client').select('name').where({ id }).first()

      if (!user) {
        return response.status(404).json({ message: 'Usuário não encontrado' })
      }

      return response.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async Create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4)
      })
      const { name } = bodySchema.parse(request.body)

     await SetupKnex<ClientRepository>('client').insert({ name })
     return response.status(201).json({ message: 'Usuário adicionado com sucesso' })

    } catch (error) {
      next(error)
    }

  }

  async Upgrade(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        id: z.coerce.number(),
        name: z.coerce.string().trim()
      })
      const { id, name } = bodySchema.parse(request.body)
      const updated = await SetupKnex<ClientRepository>('client').update({ name }).where({ id })

      if (updated === 0) {
        return response.status(404).json({ message: 'Usuário não encontrado' })
      }

      return response.status(200).json({ message: 'Usuário atualizado com sucesso' })
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

      const deleted = await SetupKnex('client').where({ id }).del()

      if (deleted === 0) {
        return response.status(404).json({ message: 'Usuário não encontrado' })
      }

      return response.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

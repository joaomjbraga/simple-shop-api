import { type Request, type Response, type NextFunction, response } from "express"
import { SetupKnex } from "@/database.js"
import z from "zod"

export class ClientsControllers {

  async Index(request: Request, response: Response, next: NextFunction) {
    const list = await SetupKnex('client').select('*')
    return response.status(200).json(list)
  }
  async IndexUsers(request: Request, response: Response, next: NextFunction) {
    const parmschama = z.object({
      id: z.coerce.number()
    })
    const {id} = parmschama.parse(request.params)
    const user = await SetupKnex<ClientRepository>('client').select('name').where({id})
    return response.status(200).json(user)
  }

  async Create(request: Request, response: Response, next: NextFunction) {

    try{
      const bodyschema = z.object({
      name: z.string().trim().min(4)
    })
     const { name } = bodyschema.parse(request.body)

     await SetupKnex<ClientRepository>('client').insert({name})
     return response.send('Usuario Adicionado com sucesso')

    } catch (error) {
      next(error)
    }

  }

  async Upgrade(request: Request, response: Response, next: NextFunction) {
    try {
      const bodyschema = z.object({
        id: z.coerce.number(),
        name: z.coerce.string().trim()
      })
      const {id, name} =  bodyschema.parse(request.body)
      await SetupKnex<ClientRepository>('client').update({name}).where({id})

      response.send('Atualizado')
    } catch (error) {
      next(error)
    }
  }

  async Delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.body
    await SetupKnex('client').where({id}).del()
    return response.status(204).send('Usuario deletado com sucesso!')
  }
}
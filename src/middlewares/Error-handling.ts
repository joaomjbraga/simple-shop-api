import type { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export function ErrorHandling(error:any, request: Request, response: Response, _:NextFunction) {

  if (error instanceof ZodError) {
    response.status(400).json({message:'erro de validação', issues: error.format})
  }

  return response.status(500).json({message: 'Erro no servidor'})
}

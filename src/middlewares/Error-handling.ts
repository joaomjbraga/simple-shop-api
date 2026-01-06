import type { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export function ErrorHandling(error: any, request: Request, response: Response, _: NextFunction) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'Erro de validação',
      issues: error.format()
    })
  }

  console.error('Erro no servidor:', error)
  return response.status(500).json({
    message: 'Erro no servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  })
}

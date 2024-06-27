import { NextApiRequest, NextApiResponse } from 'next'

export interface Request extends NextApiRequest {
  [key: string]: any
}

export interface Response extends NextApiResponse {
  [key: string]: any
}

import { Elysia } from 'elysia'
import {
  getUsersFunction,
  getUsersQuerySchema,
  getUsersResponseSchema,
} from '@/app/functions/get-users'

export const getUsers = new Elysia().get(
  '/users',
  async ({ query }) => {
    const validatedQuery = getUsersQuerySchema.parse(query)
    const result = await getUsersFunction(validatedQuery)
    return result
  },
  {
    query: getUsersQuerySchema,
    response: getUsersResponseSchema,
    detail: {
      tags: ['users'],
      summary: 'Get all users',
      description:
        'Retrieves a paginated list of users with optional search and sorting',
    },
  },
)

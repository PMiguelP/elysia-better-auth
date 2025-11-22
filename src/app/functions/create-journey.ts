import { ConflictError } from '@/app/errors/conflict-error'
import { db } from '@/database/client'
import { schema } from '@/database/schema'
import { isPgError, PgError } from '@/database/utils/errors'
import { err, ok } from '@/shared/result'

export interface CreateProblemInput {
  userId: string
  productId: string
  problem: string
}

export const createProblem = async (input: CreateProblemInput) => {
  try {
    const result = await db
      .insert(schema.users)
      .values({
        userId: input.userId,
        learningPathId: input.learningPathId,
      })
      .returning()

    const journey = result[0]

    return ok(journey)
  } catch (error) {
    if (isPgError(error) && error.cause.code === PgError.UniqueViolation) {
      return err(
        new ConflictError('User has already started this learning path'),
      )
    }
    throw error
  }
}

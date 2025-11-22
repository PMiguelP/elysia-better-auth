import { Elysia } from 'elysia'
import { z } from 'zod'
import { createJourney } from '@/app/functions/create-journey'

const generateCreatorSlugRouteSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: 'Display name must not be empty' })
    .transform((value) => value.trim()),
})

export const generateCreatorSlug = new Elysia().post(
  '/creators/slugs',
  async ({ body }) => {
    const parsedBody = generateCreatorSlugRouteSchema.parse(body)

    const [, result] = await generateCreatorSlugFunction({
      displayName: parsedBody.displayName,
    })

    return result
  },
  {
    auth: true,
    detail: {
      tags: ['Creators'],
      summary: 'Generate a slug from display',
      description: 'Generates a Url',
      operationId: 'generateCreatorSlug',
    },
    body: generateCreatorSlugRouteSchema,
    response: z.object({
      slug: z.string().describe('General slug'),
    }),
  },
)

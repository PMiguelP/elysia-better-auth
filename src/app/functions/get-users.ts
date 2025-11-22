import { and, asc, desc, ilike, type SQL } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/database/client';
import { users } from '@/database/schema/users';

export const getUsersQuerySchema = z.object({
  search: z.string().optional(),
  orderBy: z.enum(['id', 'name', 'email']).optional().default('name'),
  orderDir: z.enum(['asc', 'desc']).optional().default('asc'),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
});

export const getUsersResponseSchema = z.object({
  users: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
    }),
  ),
  items: z.number(),
  pages: z.number(),
  nextPage: z.number(),
  prevPage: z.number(),
  page: z.number(),
  pageSize: z.number(),
  firstPage: z.number(),
  lastPage: z.number(),
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;

export const getUsersFunction = async (query: GetUsersQuery) => {
  const { search, orderBy, page, pageSize, orderDir } = query;

  const conditions: SQL[] = [];

  if (search) {
    conditions.push(ilike(users.name, `%${search}%`));
  }

  const orderFn = orderDir === 'desc' ? desc : asc;

  const [result, total] = await Promise.all([
    db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(and(...conditions))
      .orderBy(orderFn(users[orderBy]))
      .offset((page - 1) * pageSize)
      .limit(pageSize),
    db.$count(users, and(...conditions)),
  ]);

  const totalPages: number = Math.ceil(total / pageSize);
  const nextPage: number = page < totalPages ? page + 1 : totalPages;
  const prevPage: number = page > 1 ? page - 1 : 1;
  const lastPage: number = totalPages;
  const firstPage: number = 1;

  return {
    users: result,
    items: total,
    pages: totalPages,
    page,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    pageSize,
  };
};

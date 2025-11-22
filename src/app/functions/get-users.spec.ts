import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { expect, test } from 'vitest';
import { app } from '../app';

test('get users', async () => {
  await app.ready();

  const userId = randomUUID();

  const response = await request(app.app).get(`/users?search=${userId}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    users: [
      {
        id: expect.any(String),
        name: 'miguekl',
        email: 'miguel',
      },
    ],
  });
});

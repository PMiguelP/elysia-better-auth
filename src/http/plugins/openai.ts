import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { BetterAuthOpenAPI } from './better-auth';

// Load better-auth OpenAPI schema using top-level await
const [authPaths, authComponents] = await Promise.all([
  BetterAuthOpenAPI.getPaths('/auth'),
  BetterAuthOpenAPI.components,
]);

export const openapiPlugin = new Elysia({ name: 'openapi' }).use(
  openapi({
    exclude: {
      methods: ['OPTIONS'],
      paths: ['/', '/*'],
    },
    documentation: {
      info: {
        title: 'nave.so',
        description: 'Internal API',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Learning Paths',
          description: 'Learning path management endpoints',
        },
        { name: 'Auth', description: 'Authentication endpoints' },
      ],
      components: authComponents,
      paths: authPaths,
    },
  }),
);

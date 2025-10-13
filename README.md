# Elysia with Bun runtime

## Development
To start the development server, follow these steps:

1. Make sure Docker is running on your machine

2. Start the Docker containers:
```bash
docker compose up -d
```

3. Generate the database schema:
```bash
bun db:generate
```

4. Run database migrations:
```bash
bun db:migrate
```

5. Start the development server:
```bash
bun dev
```

Open http://localhost:3333/ with your browser to see the result.

## API Documentation
The API documentation is available at http://localhost:3333/openapi
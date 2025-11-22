// errors.ts

export interface PgError {
  code: string;
  message: string;
  detail?: string;
}

// Função para checar se o erro é do Postgres
export const isPgError = (error: unknown): error is PgError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
};

// result.ts
export type Result<T, E> = { type: 'ok'; value: T } | { type: 'err'; error: E };

// Função para criar resultado de sucesso
export const ok = <T>(value: T): Result<T, never> => ({ type: 'ok', value });

// Função para criar resultado de erro
export const err = <E>(error: E): Result<never, E> => ({ type: 'err', error });

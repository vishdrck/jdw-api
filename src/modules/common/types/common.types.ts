export type ClassRef = new (...args: any[]) => any;

export type ReturnToResponse<T> = Promise<{ data: T }>;

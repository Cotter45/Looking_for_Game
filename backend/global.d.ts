export {};

declare global {

  interface Error {
    status?: number;
    title?: string;
    errors?: string[];
    name?: string;
  }

  interface User {
    id: number;
    username: string;
    email: string;
    toSafeObject: Function;
  }

  interface Request {
    cookies?: any;
    user?: any;
  }
}
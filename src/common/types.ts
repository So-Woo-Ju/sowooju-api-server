import {User} from './../user/entities/user.entity';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export type JwtUser = Pick<User, 'id'>;

export type LocalUser = Omit<User, 'password'>;

export interface JwtPayload {
  sub: number;
}

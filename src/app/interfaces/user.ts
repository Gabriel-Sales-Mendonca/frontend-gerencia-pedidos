export interface IUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    roles: string[];
}

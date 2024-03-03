export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    role_id: string;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}

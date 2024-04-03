export interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
    nim?: string;
    nip?: string;
}

export interface queryInterface {
    limit: number,
    offset: number,
    where: Object
}

export interface paginate {
    page: number;
    size: number;
    page_size: number;
}
export interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
    nim?: string;
    nip?: string;
}

export interface SqlPagination {
    limit: number,
    offset: number,
    where: Object
}
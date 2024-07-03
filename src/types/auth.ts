export interface Auth {
    isAuthenticated: boolean;
    user: User | null;
}

export interface User {
    email: string;
    name: string;
    id: string;
}
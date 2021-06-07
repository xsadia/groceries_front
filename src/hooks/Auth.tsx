import { createContext, FC, useContext, useState } from 'react';
import { apiClient } from '../services/api';

type User = {
    id: string;
    name: string;
    email: string;
};

type SignInCredentials = {
    email: string;
    password: string;
};

interface AuthState {
    token: string;
    user: User;
}

interface AuthContexData {
    user: User;
    token: string;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: FC = ({ children }) => {
    const [data, setData] = useState(() => {

        const token = localStorage.getItem('@groceries:token');
        const user = localStorage.getItem('@groceries:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    async function signIn({ email, password }: SignInCredentials) {
        const response = await apiClient.post('sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@groceries:token', token);
        localStorage.setItem('@groceries:user', JSON.stringify(user));

        setData({ token, user });
    }

    function signOut() {
        localStorage.removeItem('@groceries:token');
        localStorage.removeItem('@groceries:user');

        setData({} as AuthState);
    }

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, token: data.token }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContexData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Use this within an AuthProvider');
    }

    return context;
}
import { useEffect, useState } from 'react';
import { loadAuthState } from '../utils/auth';

export const useAuthState = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authState = loadAuthState();
        if (authState.isAuthenticated && authState.user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return isAuthenticated;
};

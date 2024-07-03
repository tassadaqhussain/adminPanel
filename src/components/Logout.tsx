import React from 'react';
import {useLogout} from '../hooks/useAuth';

const Logout: React.FC = () => {
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}
export default Logout;
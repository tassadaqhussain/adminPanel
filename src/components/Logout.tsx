import React, { useEffect } from 'react';
import { useLogout } from '../hooks/useAuth';

const Logout: React.FC = () => {
    const logoutMutation = useLogout();

    useEffect(() => {
        logoutMutation.mutate();
    }, [logoutMutation]);

    return <div>Logging out...</div>;
};

export default Logout;
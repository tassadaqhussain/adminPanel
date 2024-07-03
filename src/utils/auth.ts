
export const loadAuthState = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        return {
            isAuthenticated: true,
            user: JSON.parse(user),
        };
    }

    return {
        isAuthenticated: false,
        user: null,
    };
};
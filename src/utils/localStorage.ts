
export const loadLocalStorageData = (): Record<string, string | null> => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            data[key] = localStorage.getItem(key);
        }
    }
    return data;
};

export const getLocalStorageValue = (key: string): string | null => {
    return localStorage.getItem(key);
};

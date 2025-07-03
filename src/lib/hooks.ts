import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const isClient = typeof window !== 'undefined';
    const getStoredValue = (): T => {
        if (!isClient) return defaultValue;
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    useEffect(() => {
        if (isClient) {
            try {
                localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (err) {
                throw new Error('Error stringifiy local storage item');
            }
        }
    }, [key, storedValue]);

    const setValue = (value: T | ((val: T) => T)) => {
        setStoredValue(prev =>
            typeof value === 'function'
                ? (value as (val: T) => T)(prev)
                : value,
        );
    };

    return [storedValue, setValue] as const;
}

import { useEffect, useRef, useState } from 'react';

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

type TimerState = 'PAUSED' | 'STARTED' | 'ENDED';
interface TimerConfig {
    totalSeconds: number;
    onTimerEnd?: () => void;
}
interface TimerReturn {
    timeLeft: number;
    timerState: TimerState;
    start: () => void;
    pause: () => void;
    reset: () => void;
}

export function useTimer({
    totalSeconds,
    onTimerEnd,
}: TimerConfig): TimerReturn {
    const [timeLeft, setTimeLeft] = useState(0);
    const [state, setState] = useState<TimerState>('PAUSED');
    const timer = useRef<NodeJS.Timeout>(null);

    const start = () => {
        setState('STARTED');
    };
    const pause = () => {
        setState('PAUSED');
    };
    const reset = () => {
        setState('PAUSED');
        setTimeLeft(totalSeconds);
    };

    useEffect(() => {
        if (state === 'ENDED') {
            clearInterval(timer.current!);
            timer.current = null;
            if (typeof onTimerEnd === 'function') onTimerEnd();
            else setTimeLeft(totalSeconds);
        }
        if (state === 'STARTED') {
            timer.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer.current!);
                        timer.current = null;
                        setState('ENDED');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer.current && state === 'STARTED') {
                clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, [state]);

    return { timeLeft, timerState: state, pause, reset, start };
}

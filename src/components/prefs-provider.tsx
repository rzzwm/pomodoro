import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/lib/hooks';

interface Prefs {
    stageSeconds: number[];
}
interface ContextValue {
    prefs: Prefs;
    setPrefs: (value: Prefs | ((val: Prefs) => Prefs)) => void;
}

const DEFAULT_PREFS: Prefs = {
    stageSeconds: [25 * 60, 5 * 60, 15 * 60],
};

const PrefsContext = createContext<ContextValue>({
    prefs: DEFAULT_PREFS,
    setPrefs: () => null,
});

export function PrefsProvider({ children }: { children: React.ReactNode }) {
    const [prefs, setPrefs] = useLocalStorage<Prefs>('prefs', DEFAULT_PREFS);

    return (
        <PrefsContext.Provider value={{ prefs, setPrefs }}>
            {children}
        </PrefsContext.Provider>
    );
}

export function usePrefs() {
    const context = useContext(PrefsContext);
    if (context === undefined)
        throw new Error('You should use this hook inside PrefsProvider');
    return context;
}

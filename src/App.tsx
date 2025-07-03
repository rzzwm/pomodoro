import { PrefsProvider } from '@/components/prefs-provider';
import Timer from '@/components/timer';
import Settings from '@/components/settings';

function App() {
    return (
        <>
            <PrefsProvider>
                <Timer />
                <Settings />
            </PrefsProvider>
        </>
    );
}

export default App;

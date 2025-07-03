import { PrefsProvider } from '@/components/prefs-provider';
import Timer from '@/components/timer';
import Settings from '@/components/settings';

function App() {
    return (
        <>
            <h1>سلام دنیا</h1>
            <PrefsProvider>
                <Timer />
                <Settings />
            </PrefsProvider>
        </>
    );
}

export default App;

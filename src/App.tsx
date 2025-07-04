import { DirectionProvider } from '@radix-ui/react-direction';
import { PrefsProvider } from '@/components/prefs-provider';
import { ThemeProvider } from '@/components/theme-provider';
import Timer from '@/components/timer';
import { Navbar } from '@/components/navbar';

function App() {
    return (
        <DirectionProvider dir="rtl">
            <PrefsProvider>
                <ThemeProvider>
                    <div className="grid grid-rows-[3rem_1fr_3rem] min-h-svh">
                        <Navbar />
                        <Timer />
                    </div>
                </ThemeProvider>
            </PrefsProvider>
        </DirectionProvider>
    );
}

export default App;

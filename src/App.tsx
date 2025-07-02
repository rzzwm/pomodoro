import { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import Timer from '@/components/timer';

type TimerMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';

const defaultPrefs = {
    stageSeconds: [5, 5, 15],
};

function App() {
    const [timerMode, setTimerMode] = useState<TimerMode>('POMODORO');
    const [prefs] = useLocalStorage('prefs', defaultPrefs);
    const [_, setPomoCount] = useLocalStorage('pomo-count', 0);

    function handleTimerEnd() {
        if (timerMode === 'POMODORO') {
            setPomoCount(prev => {
                const next = prev + 1;
                next % 4 === 0
                    ? setTimerMode('LONG_BREAK')
                    : setTimerMode('SHORT_BREAK');
                return next;
            });
        } else setTimerMode('POMODORO');
    }

    const modeConfigs = {
        POMODORO: { seconds: prefs.stageSeconds[0], label: 'پومودورو!' },
        SHORT_BREAK: { seconds: prefs.stageSeconds[1], label: 'استراحت کوتاه' },
        LONG_BREAK: { seconds: prefs.stageSeconds[2], label: 'استراحت طولانی' },
    };
    const currentConfig = modeConfigs[timerMode];

    return (
        <div className="min-h-screen container mx-auto px-4 flex items-center justify-center">
            <div>
                <h1 className="text-2xl font-bold mb-4">تایمر پومودورو</h1>
                <p>{currentConfig.label}</p>
                <Timer
                    key={timerMode}
                    initialSeconds={currentConfig.seconds}
                    onTimerEnd={handleTimerEnd}
                />
            </div>
        </div>
    );
}

export default App;

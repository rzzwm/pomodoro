import Timer from '@/components/timer';
import { useRef, useState } from 'react';

type TimerMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';
function App() {
    const [timerMode, setTimerMode] = useState<TimerMode>('POMODORO');
    const pomos = useRef(0);

    function handleTimerEnd() {
        if (timerMode === 'POMODORO') {
            pomos.current += 1;
            pomos.current % 4 === 0
                ? setTimerMode('LONG_BREAK')
                : setTimerMode('SHORT_BREAK');
        } else setTimerMode('POMODORO');
    }

    const modeConfigs = {
        POMODORO: { seconds: 25, label: 'پومودورو!' },
        SHORT_BREAK: { seconds: 5, label: 'استراحت کوتاه' },
        LONG_BREAK: { seconds: 15, label: 'استراحت طولانی' },
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

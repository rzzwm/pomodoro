import { useEffect, useState } from 'react';
import { useTimer } from '@/lib/hooks';
import { usePrefs } from '@/components/prefs-provider';
type Options = 'option1' | 'option2' | 'option3';

export default function Timer() {
    const [timerMode, setTimerMode] = useState<Options>('option1');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimerMode(event.target.value as Options);
    };
    return (
        <div className="flex gap-4">
            <RadioButtonGroup value={timerMode} onChange={handleChange} />
            <TimerProgress mode={timerMode} />
        </div>
    );
}

function RadioButtonGroup({
    onChange: handleChange,
    value: selectedValue,
}: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}) {
    return (
        <div>
            <h2>حالت تایمر</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        name="myRadioGroup"
                        value="option1"
                        checked={selectedValue === 'option1'}
                        onChange={handleChange}
                    />
                    حالت اول
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        name="myRadioGroup"
                        value="option2"
                        checked={selectedValue === 'option2'}
                        onChange={handleChange}
                    />
                    حالت دوم
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        name="myRadioGroup"
                        value="option3"
                        checked={selectedValue === 'option3'}
                        onChange={handleChange}
                    />
                    حالت سوم
                </label>
            </div>
            <p>
                حالت تایمر: <strong>{selectedValue}</strong>
            </p>
        </div>
    );
}

function TimerProgress({ mode }: { mode: Options }) {
    const { prefs } = usePrefs();
    const MODE_PREFS = {
        option1: { totalSeconds: prefs.stageSeconds[0], label: 'حالت اول' },
        option2: { totalSeconds: prefs.stageSeconds[1], label: 'حالت دوم' },
        option3: { totalSeconds: prefs.stageSeconds[2], label: 'حالت سوم' },
    };
    const currentMode = MODE_PREFS[mode];
    const { timeLeft, timerState, pause, reset, start } = useTimer({
        totalSeconds: currentMode.totalSeconds,
    });

    useEffect(() => {
        reset();
    }, [mode, currentMode.totalSeconds]);

    function toggleTimer() {
        timerState === 'STARTED' ? pause() : start();
    }

    return (
        <div>
            <p>
                <strong>الان رو این حالتیم: </strong> {currentMode.label}
            </p>
            <progress
                value={timeLeft}
                max={currentMode.totalSeconds}
            ></progress>
            <span>{timeLeft}</span>
            <div>
                <button onClick={toggleTimer}>
                    {timerState === 'STARTED' ? 'نگهش دار' : 'شروع کن'}
                </button>
                <button onClick={() => reset()}>از اول</button>
            </div>
        </div>
    );
}

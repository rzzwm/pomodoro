import { useEffect, useState } from 'react';
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
    // TODO: KEEP THEM IN SYNC WITH LOCAL STORAGE
    const MODE_PREFS = {
        option1: { totalSeconds: 10 * 60, label: 'حالت اول' },
        option2: { totalSeconds: 50, label: 'حالت دوم' },
        option3: { totalSeconds: 20, label: 'حالت سوم' },
    };
    const currentMode = MODE_PREFS[mode];

    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        setTimeLeft(currentMode.totalSeconds);
    }, [currentMode.totalSeconds]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

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
        </div>
    );
}

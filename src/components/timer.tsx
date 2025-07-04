import { type Stages } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useTimer } from '@/lib/hooks';
import { usePrefs } from '@/components/prefs-provider';

export default function Timer() {
    const [stage, setStage] = useState<Stages>('POMO');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStage(event.target.value as Stages);
    };
    return (
        <div className="flex gap-4">
            <RadioButtonGroup value={stage} onChange={handleChange} />
            <TimerProgress stage={stage} />
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

function TimerProgress({ stage }: { stage: Stages }) {
    const { prefs } = usePrefs();
    const STAGE_PREFS: Record<Stages, { totalSeconds: number }> = {
        POMO: { totalSeconds: prefs.stageSeconds.POMO.minutes },
        BRAKE: {
            totalSeconds: prefs.stageSeconds.BRAKE.minutes,
        },
        L_BRAKE: {
            totalSeconds: prefs.stageSeconds.L_BRAKE.minutes,
        },
    };
    const currentStage = STAGE_PREFS[stage];
    const { timeLeft, timerState, pause, reset, start } = useTimer({
        totalSeconds: currentStage.totalSeconds,
    });

    useEffect(() => {
        reset();
    }, [stage, currentStage.totalSeconds]);

    function toggleTimer() {
        timerState === 'STARTED' ? pause() : start();
    }

    return (
        <div>
            <progress
                value={timeLeft}
                max={currentStage.totalSeconds}
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

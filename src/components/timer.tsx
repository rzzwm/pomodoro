import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { type Stages } from '@/lib/types';
import { useTimer } from '@/lib/hooks';
import { usePrefs } from '@/components/prefs-provider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import notification from '@/assets/notifiacation.mp3';

export default function Timer() {
    const [stage, setStage] = useState<Stages>('POMO');
    const audioRef = useRef<HTMLAudioElement>(null);
    const handleChange = (value: Stages) => {
        setStage(value);
    };
    const handleTimerEnd = () => {
        if (stage === 'POMO') {
            const pomoCount = Number(localStorage.getItem('pomo-c')) ?? 0;
            if ((pomoCount + 1) % 4 === 0) setStage('L_BRAKE');
            else setStage('BRAKE');
            localStorage.setItem('pomo-c', (pomoCount + 1).toString());
        } else setStage('POMO');
        audioRef.current?.play();
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <TimerProgress stage={stage} onTimerEnd={handleTimerEnd} />
            <StagePicker value={stage} onChange={handleChange} />
            <PomoStatus />
            <audio ref={audioRef} src={notification} className="hidden"></audio>
        </div>
    );
}

function StagePicker({
    onChange: handleChange,
    value: selectedValue,
}: {
    onChange: (value: Stages) => void;
    value: Stages;
}) {
    const STAGE_DETAILS: Record<Stages, { label: string }> = {
        POMO: { label: 'پومودورو' },
        BRAKE: { label: 'استراحت کوتاه' },
        L_BRAKE: { label: 'استراحت طولانی' },
    };
    return (
        <ToggleGroup
            type="single"
            variant="outline"
            value={selectedValue}
            onValueChange={handleChange}
        >
            {Object.keys(STAGE_DETAILS).map(stage => (
                <ToggleGroupItem
                    className="transition-colors"
                    key={stage}
                    value={stage}
                >
                    <span className="px-2">
                        {STAGE_DETAILS[stage as Stages].label}
                    </span>
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}

function TimerProgress({
    stage,
    onTimerEnd,
}: {
    stage: Stages;
    onTimerEnd: () => void;
}) {
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
        onTimerEnd,
    });
    const timeLeftPercent = (timeLeft / currentStage.totalSeconds) * 100;
    const formattedTimeLeft = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')} : ${String(timeLeft % 60).padStart(2, '0')}`;

    useEffect(() => {
        reset();
    }, [stage, currentStage.totalSeconds]);

    function toggleTimer() {
        timerState === 'STARTED' ? pause() : start();
    }

    return (
        <div className="space-y-6">
            <CircularProgressBar
                progress={timeLeftPercent}
                text={formattedTimeLeft}
            />
            <div className="flex justify-center gap-4">
                <Button
                    onClick={toggleTimer}
                    className="size-12 rounded-full *:transition-transform active:scale-95"
                >
                    <Pause
                        className={`size-6 ${timerState === 'STARTED' ? 'scale-100' : 'scale-0 rotate-90'}`}
                    />
                    <Play
                        className={`size-6 absolute ${timerState !== 'STARTED' ? 'scale-100' : 'scale-0 -rotate-90'}`}
                    />
                </Button>
                <Button
                    onClick={() => reset()}
                    className="size-12 rounded-full active:*:-rotate-90 active:scale-95"
                >
                    <RotateCcw className="size-6 transition-transform" />
                </Button>
            </div>
        </div>
    );
}

function CircularProgressBar({
    progress,
    text,
}: {
    progress: number;
    text: string;
}) {
    const strokeWidth = 5;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = useRef(circumference);
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const newDashoffset =
        circumference - (clampedProgress / 100) * circumference;
    dashoffset.current = newDashoffset;

    return (
        <svg className="w-full" viewBox="0 0 100 100">
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                className="stroke-accent"
                strokeWidth={strokeWidth - 2.5}
            />
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                className="stroke-primary transition-[stroke_dasharray] duration-500"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset.current}
            />
            <text
                direction="ltr"
                className="fill-primary"
                fontWeight={900}
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {text}
            </text>
        </svg>
    );
}

function PomoStatus() {
    const pomoCount = localStorage.getItem('pomo-c') ?? '0';
    return (
        <p className="text-sm text-muted-foreground">
            تا الان <strong>{pomoCount}</strong> تا پومودورو گذروندی!
        </p>
    );
}

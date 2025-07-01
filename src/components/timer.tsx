import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TimerProps {
    initialSeconds: number;
    onTimerEnd?: () => void;
}
type TimerState = 'started' | 'paused' | 'ended';

export default function Timer({ initialSeconds, onTimerEnd }: TimerProps) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [timerState, setTimerState] = useState<TimerState>('paused');
    let timer = useRef<NodeJS.Timeout | null>(null);

    function cleanupTimer() {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }

    function handleToggle() {
        setTimerState(prev => (prev === 'paused' ? 'started' : 'paused'));
    }

    useEffect(() => {
        if (timerState === 'ended') onTimerEnd?.();
        if (timerState === 'started') {
            timer.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        cleanupTimer();
                        setTimerState('ended');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer.current || timerState === 'started') cleanupTimer();
        };
    }, [timerState]);

    const formattedTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    };

    return (
        <div>
            <h1 dir="ltr" className="text-4xl font-black">
                {formattedTime(seconds)}
            </h1>
            <Button onClick={handleToggle}>
                {timerState === 'started' ? 'نگهش دار' : 'شروعش کن'}
            </Button>
        </div>
    );
}

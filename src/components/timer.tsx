import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TimerProps {
    initialSeconds: number;
}

export default function Timer({ initialSeconds }: TimerProps) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [started, setStarted] = useState(false);
    let timer = useRef<NodeJS.Timeout | null>(null);

    function startTimer() {
        setStarted(true);
        timer.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    stopTimer();
                    return initialSeconds;
                }
                return prev - 1;
            });
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer.current!);
        timer.current = null;
        setStarted(false);
    }

    function handleToggle() {
        if (timer.current) stopTimer();
        else startTimer();
    }

    useEffect(() => {
        return () => {
            if (timer.current) stopTimer();
        };
    }, []);

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
                {started ? 'متوقف شو' : 'شروع کن'}
            </Button>
        </div>
    );
}

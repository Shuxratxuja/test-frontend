import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
    initialMinutes: number;
    onTimeUp?: () => void;
}

interface UseTimerReturn {
    formattedTime: string;
    isWarning: boolean;
    isExpired: boolean;
    timeLeft: number;
}

export const useTimer = ({ initialMinutes, onTimeUp }: UseTimerProps): UseTimerReturn => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isExpired, setIsExpired] = useState(false);

    const isWarning = timeLeft <= 30 && timeLeft > 0;

    const formattedTime = useCallback(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            onTimeUp?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    return {
        formattedTime: formattedTime(),
        isWarning,
        isExpired,
        timeLeft
    };
};

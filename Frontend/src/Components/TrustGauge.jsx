import React, { useState, useEffect } from 'react';

const TrustGauge = ({ percentage = 0, size = 200 }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        // Animate percentage from 0 to target
        let currentValue = 0;
        const increment = percentage / 50; // 50 frames for smooth animation
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= percentage) {
                setAnimatedPercentage(percentage);
                clearInterval(interval);
            } else {
                setAnimatedPercentage(Math.round(currentValue));
            }
        }, 30);

        return () => clearInterval(interval);
    }, [percentage]);

    const radius = size / 2 - 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    // Color based on trust level
    const getColor = () => {
        if (animatedPercentage >= 80) return '#A2FF59'; // Hijau - Sangat dipercaya
        if (animatedPercentage >= 60) return '#13A3B5'; // Biru - Dipercaya
        if (animatedPercentage >= 40) return '#FFB84D'; // Kuning - Cukup dipercaya
        return '#FF6B6B'; // Merah - Kurang dipercaya
    };

    const getLabel = () => {
        if (animatedPercentage >= 80) return 'Very Trusted';
        if (animatedPercentage >= 60) return 'Trusted';
        if (animatedPercentage >= 40) return 'Fairly Trusted';
        return 'Build Trust';
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <svg width={size} height={size} className="relative">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                />

                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor()}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                    style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: `${size / 2}px ${size / 2}px`,
                    }}
                />

                {/* Center text */}
                <text
                    x={size / 2}
                    y={size / 2 - 10}
                    textAnchor="middle"
                    className="text-4xl font-bold"
                    style={{ fill: getColor() }}
                >
                    {animatedPercentage}%
                </text>

                <text
                    x={size / 2}
                    y={size / 2 + 25}
                    textAnchor="middle"
                    className="text-sm font-medium"
                    style={{ fill: '#6b7280' }}
                >
                    {getLabel()}
                </text>
            </svg>
        </div>
    );
};

export default TrustGauge;

import React, { useState, useEffect } from "react";

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    return (
        <div className="flex items-center justify-centers">
            <div className="text-
            y-500 text-1xl font-bold">
                {formattedTime}
            </div>
        </div>
    );
};

export default DigitalClock;

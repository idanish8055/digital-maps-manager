import React, { useState, useEffect } from 'react';

const FullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleScreen = () => {
        const element = document.documentElement;

        if (!isFullScreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    };

    const toggleFullscreenIcons = () => {
        setIsFullScreen(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', toggleFullscreenIcons);
        document.addEventListener('webkitfullscreenchange', toggleFullscreenIcons);
        document.addEventListener('mozfullscreenchange', toggleFullscreenIcons);
        document.addEventListener('MSFullscreenChange', toggleFullscreenIcons);

        return () => {
            document.removeEventListener('fullscreenchange', toggleFullscreenIcons);
            document.removeEventListener('webkitfullscreenchange', toggleFullscreenIcons);
            document.removeEventListener('mozfullscreenchange', toggleFullscreenIcons);
            document.removeEventListener('MSFullscreenChange', toggleFullscreenIcons);
        };
    }, []);

    return (
        <button
            onClick={handleScreen}
            className={`inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs ${isFullScreen ? 'dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10' : ''
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 fill-headerprime full-screen-open block ${isFullScreen ? 'hidden' : ''
                    }`}
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 fill-headerprime full-screen-close hidden'
                    }`}
                style={isFullScreen ? { display: 'block' } : { display: 'none' }}
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
        </button>
    );
};

export default FullScreen;

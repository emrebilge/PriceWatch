import React, { useEffect, useState } from 'react';

const ToggleButton: React.FC = () => {
    const [isDark, setIsDark] = useState(false)

    


    const iconToggle = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    };

    return (
        <div onClick={iconToggle}>
            {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 opacity-75 hover:scale-110 hover:opacity-100 hover:transition hover:duration-600">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"
                    />
                </svg>

            ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-6 h-6 opacity-50 hover:scale-125 hover:opacity-100 hover:transition hover:duration-600"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>

            )}
        </div>
    );
    
            };
export default (ToggleButton);
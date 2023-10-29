import React, { useEffect, useState } from 'react';

const ToggleButton: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

            useEffect(() => {
    // This code will only run on the client-side after the component is mounted
            setIsDark(localStorage.getItem("theme") === "dark");
        }, []);

    


    const iconToggle = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    };

/*     useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]); */

    return (
        <div onClick={iconToggle}>
            {isDark ? (
                <img 
                    className="h-8 w-auto moon rounded-full duration-1500 hover:cursor-pointer hover:bg-current hover:opacity-25 hover:scale-125 transform transition"
                    src='/moon_icon.svg' 
                    alt="Moon Icon" 
                />
            ) : (
                <img 
                    className="h-8 w-auto sun rounded-full duration-1500 hover:bg-slate-200 hover:opacity-75 cursor-pointer hover:scale-125 transform transition"
                    src='/sun_icon.svg' 
                    alt="Sun Icon" 
                />
            )}
        </div>
    );
    
            };
export default (ToggleButton);
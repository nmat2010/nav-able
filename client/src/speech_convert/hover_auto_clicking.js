import { useState, useRef, useEffect } from "react";

export const useHover = (callback, delay = 2000) => {  // delay in milliseconds
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef(null);
    let hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        setIsHovering(true);
        hoverTimeout.current = setTimeout(() => {
            if (callback) callback();  // Call function after delay
        }, delay);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        clearTimeout(hoverTimeout.current); // Cancel auto-click if mouse leaves early
    };

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEnter);
                node.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return [ref, isHovering];
};

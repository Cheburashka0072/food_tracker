import React, { useState, useRef, useEffect } from "react";

export const Tooltip = ({ children, text, ...props }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, 500); // Задержка в 3 секунды
    };

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
        >
            {children}
            {visible && (
                <div
                    {...props}
                    style={{
                        position: "fixed",
                        left: position.x + 10, // Смещение на 10 пикселей от курсора
                        top: position.y + 10,
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "5px",
                        borderRadius: "3px",
                        zIndex: 1000,
                        whiteSpace: "nowrap",
                        pointerEvents: "none", // чтобы подсказка не мешала взаимодействию
                        transform: "translateY(-100%)", // Поднимаем над курсором
                    }}
                >
                    {text.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

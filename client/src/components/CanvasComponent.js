import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Пример рисования на canvas
        context.fillStyle = 'red';
        context.fillRect(10, 10, 100, 100);

        context.fillStyle = 'blue';
        context.font = '30px Arial';
        context.fillText('Hello Canvas', 10, 50);
    }, []);

    return (
        <canvas ref={canvasRef} width={500} height={500} />
    );
};

export default CanvasComponent;

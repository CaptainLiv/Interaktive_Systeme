import React, { useRef, useEffect, useState } from 'react';
import './App.css';

// Seeded random number generator (to replicate Java's Random(1))
class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextFloat(): number {
        return this.next();
    }
}

const ColorsCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Draw on canvas whenever dimensions change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        draw(ctx);
    }, [dimensions]);

    const createLinearGradient = (
        ctx: CanvasRenderingContext2D,
        myRnd: SeededRandom,
        canvasWidth: number,
        canvasHeight: number
    ): CanvasGradient => {
        const gradient = ctx.createLinearGradient(
            0, 0,
            canvasWidth * 0.2,
            canvasHeight * 0.2
        );

        const r1 = myRnd.nextFloat();
        const g1 = myRnd.nextFloat();
        const b1 = myRnd.nextFloat();

        const r2 = myRnd.nextFloat();
        const g2 = myRnd.nextFloat();
        const b2 = myRnd.nextFloat();

        gradient.addColorStop(0, `rgba(${r1 * 255}, ${g1 * 255}, ${b1 * 255}, 1)`);
        gradient.addColorStop(1, `rgba(${r2 * 255}, ${g2 * 255}, ${b2 * 255}, 1)`);

        return gradient;
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        const myRnd = new SeededRandom(1); // Use seed=1 for consistent output

        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        // Draw background gradient
        const bgGradient = createLinearGradient(ctx, myRnd, canvasWidth, canvasHeight);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw 20 elements
        for (let i = 0; i < 20; i++) {
            renderElement(ctx, i, myRnd);
        }
    };

    const renderElement = (
        ctx: CanvasRenderingContext2D,
        cnt: number,
        myRnd: SeededRandom
    ) => {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        const x = canvasWidth * myRnd.nextFloat();
        const y = canvasHeight * myRnd.nextFloat();
        const w = (canvasWidth / 4) * (myRnd.nextFloat() + 0.5);
        const h = (canvasHeight / 5) * (myRnd.nextFloat() + 0.8);
        let fontSize = canvasWidth / 30;

        // Draw main rectangle with solid color
        const r = myRnd.nextFloat();
        const g = myRnd.nextFloat();
        const b = myRnd.nextFloat();
        ctx.fillStyle = `rgba(${r * 255}, ${g * 255}, ${b * 255}, 1)`;
        ctx.fillRect(x - w / 2, y - h / 2, w, h);

        // Draw top bar with gradient
        const gradient1 = ctx.createLinearGradient(
            0, 0,
            canvasWidth * 0.2,
            canvasHeight * 0.5
        );

        const r1 = myRnd.nextFloat();
        const g1 = myRnd.nextFloat();
        const b1 = myRnd.nextFloat();
        const r2 = myRnd.nextFloat();
        const g2 = myRnd.nextFloat();
        const b2 = myRnd.nextFloat();

        gradient1.addColorStop(0, `rgba(${r1 * 255}, ${g1 * 255}, ${b1 * 255}, 1)`);
        gradient1.addColorStop(1, `rgba(${r2 * 255}, ${g2 * 255}, ${b2 * 255}, 1)`);

        ctx.fillStyle = gradient1;
        ctx.fillRect(x - w / 2 + 4, y - h / 2 + 4, w - 8, canvasWidth / 30);

        // Draw content area with rounded gradient
        const gradient2 = ctx.createLinearGradient(
            0, 0,
            canvasWidth * 0.5,
            canvasHeight * 0.1
        );

        const r3 = myRnd.nextFloat();
        const g3 = myRnd.nextFloat();
        const b3 = myRnd.nextFloat();
        const r4 = myRnd.nextFloat();
        const g4 = myRnd.nextFloat();
        const b4 = myRnd.nextFloat();

        gradient2.addColorStop(0, `rgba(${r3 * 255}, ${g3 * 255}, ${b3 * 255}, 1)`);
        gradient2.addColorStop(1, `rgba(${r4 * 255}, ${g4 * 255}, ${b4 * 255}, 1)`);

        ctx.fillStyle = gradient2;

        // Draw rounded rectangle
        const rectX = x - w / 2 + 8;
        const rectY = y - h / 2 + 8 + canvasWidth / 30;
        const rectW = w - 16;
        const rectH = h - 16 - canvasWidth / 30;
        const radius = 8;

        ctx.beginPath();
        ctx.moveTo(rectX + radius, rectY);
        ctx.lineTo(rectX + rectW - radius, rectY);
        ctx.quadraticCurveTo(rectX + rectW, rectY, rectX + rectW, rectY + radius);
        ctx.lineTo(rectX + rectW, rectY + rectH - radius);
        ctx.quadraticCurveTo(rectX + rectW, rectY + rectH, rectX + rectW - radius, rectY + rectH);
        ctx.lineTo(rectX + radius, rectY + rectH);
        ctx.quadraticCurveTo(rectX, rectY + rectH, rectX, rectY + rectH - radius);
        ctx.lineTo(rectX, rectY + radius);
        ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
        ctx.closePath();
        ctx.fill();

        // Draw title text
        const r5 = myRnd.nextFloat();
        const g5 = myRnd.nextFloat();
        const b5 = myRnd.nextFloat();
        ctx.fillStyle = `rgba(${r5 * 255}, ${g5 * 255}, ${b5 * 255}, 1)`;
        ctx.font = `italic bold ${fontSize}px Arial`;
        ctx.fillText(`Title${cnt}`, x - w / 2 + 4, y - h / 2 + fontSize);

        // Draw content lines
        const r6 = myRnd.nextFloat();
        const g6 = myRnd.nextFloat();
        const b6 = myRnd.nextFloat();
        ctx.fillStyle = `rgba(${r6 * 255}, ${g6 * 255}, ${b6 * 255}, 1)`;
        fontSize /= 2;
        ctx.font = `${fontSize}px Arial`;

        const maxLines = Math.floor(h / fontSize) - 4;
        for (let i = 1; i < maxLines; i++) {
            ctx.fillText(
                `${i}. text content`,
                x - w / 2 + 20,
                y - h / 2 + (i + 3) * fontSize
            );
        }
    };

    return (
        <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                style={{ display: 'block' }}
            />
        </div>
    );
};

export default ColorsCanvas;

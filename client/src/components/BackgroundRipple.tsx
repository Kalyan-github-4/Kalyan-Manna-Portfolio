"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type GridPoint = {
    row: number;
    col: number;
};

const createOriginPoints = (rows: number, cols: number, count = 25): GridPoint[] => {
    return Array.from({ length: count }, (_, i) => {
        const rowSeed =
            Math.sin((i + 1) * 12.9898 + rows * 78.233) * 43758.5453;

        const colSeed =
            Math.sin((i + 1) * 39.3467 + cols * 11.135) * 24634.6345;

        return {
            row: Math.floor((rowSeed - Math.floor(rowSeed)) * rows),
            col: Math.floor((colSeed - Math.floor(colSeed)) * cols),
        };
    });
};

export default function BackgroundRippleEffect({
    rows = 8,
    cols = 27,
    cellSize = 56,
}: {
    rows?: number;
    cols?: number;
    cellSize?: number;
}) {
    const [clickedCell, setClickedCell] = useState<GridPoint | null>(null);
    const [rippleKey, setRippleKey] = useState(0);
    const [hasInitialAnimated, setHasInitialAnimated] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const originPoints = useMemo(() => {
        return createOriginPoints(rows, cols, 25);
    }, [rows, cols]);

    useEffect(() => {
        let maxMinDistance = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const minDistance = Math.min(
                    ...originPoints.map((origin) =>
                        Math.hypot(origin.row - r, origin.col - c),
                    ),
                );

                maxMinDistance = Math.max(maxMinDistance, minDistance);
            }
        }

        const perCellDelay = 250;
        const initialDuration = 3000;
        const buffer = 120;

        const totalTime =
            Math.ceil(maxMinDistance * perCellDelay) + initialDuration + buffer;

        const timer = window.setTimeout(() => {
            setHasInitialAnimated(true);
        }, totalTime);

        return () => window.clearTimeout(timer);
    }, [rows, cols, originPoints]);

    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 h-full w-full",
                "md:top-40 lg:top-0",
                "[--cell-border-color:rgba(139,92,246,0.16)] [--cell-fill-color:rgba(42,26,77,0.18)] [--cell-shadow-color:rgba(139,92,246,0.22)]",
                "dark:[--cell-border-color:rgba(139,92,246,0.18)] dark:[--cell-fill-color:rgba(42,26,77,0.22)] dark:[--cell-shadow-color:rgba(139,92,246,0.26)]",
            )}
        >
            <div className="relative h-auto w-auto overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-2 h-full w-full overflow-hidden" />

                <div
                    className="relative"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                        maskComposite: "intersect",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                        WebkitMaskComposite: "source-in",
                    }}
                >
                    <DivGrid
                        key={`base-${rippleKey}`}
                        className="mask-radial-from-20% mask-radial-at-top"
                        rows={rows}
                        cols={cols}
                        cellSize={cellSize}
                        borderColor="var(--cell-border-color)"
                        fillColor="var(--cell-fill-color)"
                        clickedCell={clickedCell}
                        originPoints={originPoints}
                        hasInitialAnimated={hasInitialAnimated}
                        onCellClick={(row, col) => {
                            setClickedCell({ row, col });
                            setRippleKey((k) => k + 1);
                        }}
                        interactive
                    />
                </div>
            </div>
        </div>
    );
}

type DivGridProps = {
    className?: string;
    rows: number;
    cols: number;
    cellSize: number;
    borderColor: string;
    fillColor: string;
    clickedCell: GridPoint | null;
    originPoints: GridPoint[];
    hasInitialAnimated?: boolean;
    onCellClick?: (row: number, col: number) => void;
    interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
    "--delay"?: string;
    "--duration"?: string;
    "--initial-delay"?: string;
    "--flow-color"?: string;
    "--flow-glow"?: string;
    "--final-border"?: string;
    "--bg-color"?: string;
};

const DivGrid = ({
    className,
    rows = 7,
    cols = 30,
    cellSize = 56,
    borderColor = "#3f3f46",
    fillColor = "rgba(42,26,77,0.28)",
    clickedCell = null,
    originPoints,
    hasInitialAnimated = false,
    onCellClick = () => {},
    interactive = true,
}: DivGridProps) => {
    const cells = useMemo(() => {
        return Array.from({ length: rows * cols }, (_, idx) => idx);
    }, [rows, cols]);

    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
        marginInline: "auto",
    };

    return (
        <div className={cn("relative z-3", className)} style={gridStyle}>
            <style>{`
                @keyframes borderFlow {
                    0% {
                        border-width: 0;
                        border-color: transparent;
                        opacity: 0;
                        box-shadow: none;
                    }

                    30% {
                        border-width: 0.5px;
                        border-color: var(--flow-color);
                        opacity: 1;
                        box-shadow: 0 0 20px var(--flow-glow), inset 0 0 20px var(--flow-glow);
                    }

                    60% {
                        border-width: 0.5px;
                        border-color: var(--flow-color);
                        opacity: 0.8;
                        box-shadow: 0 0 15px var(--flow-glow);
                    }

                    100% {
                        border-width: 0.5px;
                        border-color: var(--final-border);
                        opacity: 0.4;
                        box-shadow: none;
                    }
                }

                @keyframes fillCell {
                    0% {
                        background-size: 0% 100%;
                    }

                    100% {
                        background-size: 100% 100%;
                    }
                }

                .initial-animate {
                    animation:
                        borderFlow var(--duration) ease-in-out var(--initial-delay) both,
                        fillCell var(--duration) ease-in-out var(--initial-delay) both;
                }

                .cell {
                    background: linear-gradient(90deg, transparent 0%, var(--bg-color) 100%);
                    background-size: 0% 100%;
                    background-repeat: no-repeat;
                }
            `}</style>

            {cells.map((idx) => {
                const rowIdx = Math.floor(idx / cols);
                const colIdx = idx % cols;

                const distance = clickedCell
                    ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
                    : 0;

                const delay = clickedCell ? Math.max(0, distance * 55) : 0;
                const duration = 200 + distance * 80;

                const initialDistance = Math.min(
                    ...originPoints.map((origin) =>
                        Math.hypot(origin.row - rowIdx, origin.col - colIdx),
                    ),
                );

                const initialDelay = initialDistance * 250;
                const initialDuration = 3000;

                const style: CellStyle = {
                    ...(clickedCell && {
                        "--delay": `${delay}ms`,
                        "--duration": `${duration}ms`,
                    }),

                    ...(!hasInitialAnimated && {
                        "--initial-delay": `${initialDelay}ms`,
                        "--duration": `${initialDuration}ms`,
                        "--flow-color": "#8B5CF6",
                        "--flow-glow": "rgba(139, 92, 246, 0.55)",
                        "--final-border": borderColor,
                        "--bg-color": fillColor,
                    }),
                };

                return (
                    <div
                        key={idx}
                        className={cn(
                            "cell relative border-[0.5px] transition-all duration-300 will-change-transform",
                            "hover:scale-105 hover:border-violet-400 hover:bg-violet-500/25 hover:opacity-100 hover:shadow-[0px_0px_30px_2px_rgba(139,92,246,0.45)]",
                            "dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset] dark:hover:shadow-[0px_0px_60px_3px_rgba(139,92,246,0.55)_inset]",
                            !hasInitialAnimated && "border-transparent opacity-0 initial-animate",
                            hasInitialAnimated && "opacity-40",
                            clickedCell && "animate-cell-ripple fill-mode-[none]",
                            !interactive && "pointer-events-none",
                        )}
                        style={{
                            backgroundColor: fillColor,
                            borderColor,
                            ...style,
                        }}
                        onClick={
                            interactive ? () => onCellClick(rowIdx, colIdx) : undefined
                        }
                    />
                );
            })}
        </div>
    );
};
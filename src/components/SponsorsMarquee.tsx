'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';


const sponsorsSource = [
    { name: 'Dinex Services', src: '/sponsor/dinex.png' },
    { name: 'Rebelive', src: '/sponsor/rebelive.jpeg' },
    { name: 'Collabify', src: '/sponsor/collabify.png' },
    {name:'Orgatik',src:'/sponsor/orgatik.png'}

];

// Duplicate purely for visual density if the list is short,
// and to assist with the infinite scrolling illusion if needed.
const sponsors = [...sponsorsSource, ...sponsorsSource, ...sponsorsSource, ...sponsorsSource, ...sponsorsSource, ...sponsorsSource];

const SponsorsMarquee: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && !isDragging) {
                // Infinite scroll logic:
                // We have 6 sets of sponsors.
                // When we have scrolled past exactly one set's width, we reset the position 
                // by subtracting that width. This creates a seamless loop.
                const singleSetWidth = scrollContainer.scrollWidth / 6;

                if (scrollContainer.scrollLeft >= singleSetWidth) {
                    // Subtract exactly one set's width to maintain smooth motion without jumping to 0
                    // if we overshot slightly.
                    scrollContainer.scrollLeft -= singleSetWidth;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setIsPaused(true);
        if (scrollRef.current) {
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (scrollRef.current) {
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <section className=" relative">
            <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase  tracking-tighter text-white mb-4">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Sponsors</span>
                </h2>
                <p className="text-gray-400 text-lg">Powering the next generation of innovators</p>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsPaused(true)}
                onMouseOut={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)} // Resume after touch
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sponsors.map((sponsor, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-64 h-40  flex items-center justify-center p-6  transition-colors"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={sponsor.src}
                                alt={sponsor.name}
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SponsorsMarquee;

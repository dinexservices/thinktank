import React from 'react';

const VenueLocation = () => {
    return (
        <section className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-4">Venue<span className="bg-gradient-to-r from-blue-100 to-blue-600 text-transparent bg-clip-text"> Location</span></h2>
                    <p className="text-xl text-gray-400">Lovely Professional University, Jalandhar - Delhi G.T. Road, Phagwara, Punjab</p>
                </div>

                <div className="max-w-4xl mx-auto relative cursor-default select-none">
                    {/* Main SVG Map */}
                    <svg viewBox="0 0 900 850" className="w-full h-auto drop-shadow-2xl">
                        <defs>
                            <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#fff" stopOpacity="0.8" />
                            </linearGradient>

                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Path for LPU Logo Text */}
                            <path id="lpu-text-curve-top" d="M 30,100 A 70,70 0 1,1 170,100" fill="none" />
                            <path id="lpu-text-curve-bottom" d="M 35,100 A 65,65 0 0,0 165,100" fill="none" />
                        </defs>

                        {/* Connecting Lines */}
                        {/* Amritsar to Jalandhar to LPU path */}
                        {/* Main Spine: Top-Left to Bottom-Right roughly */}

                        {/* Adjusted coordinates for smoother curve */}
                        {/* Curve: Start (140, 90) -> Q (160, 200) -> (190, 290) [Jalandhar] */}
                        {/* Then to LPU (260, 420) */}
                        {/* Then to Phagwara (380, 550) */}
                        {/* Then to Ludhiana (500, 680) */}
                        {/* Then to Delhi (680, 780) */}

                        <path
                            d="M 140,90 Q 160,200 190,290 T 260,420 T 380,550 T 500,680 T 680,780"
                            fill="none"
                            stroke="white"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />

                        {/* Branch to Chandigarh */}
                        {/* From (190, 290) [Jalandhar] to (520, 380) [Chandigarh] */}
                        <path
                            d="M 190,290 Q 300,320 520,380"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                        />

                        {/* NODES & LABELS */}

                        {/* Amritsar */}
                        <circle cx="140" cy="90" r="18" fill="#3b82f6" />
                        <text x="170" y="95" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">AMRITSAR</text>

                        {/* Jalandhar */}
                        <circle cx="190" cy="290" r="18" fill="#3b82f6" />
                        <text x="220" y="295" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">JALANDHAR</text>

                        {/* Chandigarh */}
                        <circle cx="520" cy="380" r="18" fill="#3b82f6" />
                        <text x="550" y="385" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">CHANDIGARH</text>

                        {/* LPU LOGO NODE */}
                        {/* Target Center on map: 260, 420 */}
                        {/* Local Center: 100, 100 */}
                        {/* Scale: 1.2 */}
                        {/* Translate: tx + 1.2*100 = 260 => tx = 140 */}
                        {/* Translate: ty + 1.2*100 = 420 => ty = 300 */}
                        <g transform="translate(140, 320) scale(1.2)">
                            {/* White outer circle background */}
                            <circle cx="100" cy="100" r="85" fill="white" />

                            {/* Text Ring */}
                            <text fontSize="10" fontWeight="bold" fontFamily="Arial" letterSpacing="1">
                                <textPath href="#lpu-text-curve-top" startOffset="50%" textAnchor="middle" fill="black">
                                    LOVELY PROFESSIONAL UNIVERSITY
                                </textPath>
                            </text>
                            <text fontSize="10" fontWeight="bold" fontFamily="Arial" letterSpacing="1" dy="10">
                                <textPath href="#lpu-text-curve-bottom" startOffset="50%" textAnchor="middle" fill="black">
                                    PUNJAB (INDIA)
                                </textPath>
                            </text>

                            {/* Inner Graphic */}
                            <circle cx="100" cy="100" r="60" fill="#f97316" /> {/* Orange background */}

                            <g clipPath="url(#inner-circle-clip)">
                                <clipPath id="inner-circle-clip">
                                    <circle cx="100" cy="100" r="60" />
                                </clipPath>
                                {/* Fan rays - fanning out from bottom-left */}
                                <path d="M 40,160 L 200,80 L 200,100 L 40,160 Z" fill="#222" />
                                <path d="M 40,160 L 180,40 L 190,60 L 40,160 Z" fill="#222" />
                                <path d="M 40,160 L 120,0 L 140,0 L 40,160 Z" fill="#222" />
                                <path d="M 40,160 L 60,0 L 80,0 L 40,160 Z" fill="#222" />
                            </g>

                            <circle cx="100" cy="100" r="60" fill="none" stroke="black" strokeWidth="2" />
                        </g>

                        {/* Phagwara */}
                        <circle cx="380" cy="550" r="18" fill="#3b82f6" />
                        <text x="410" y="555" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">PHAGWARA</text>

                        {/* Ludhiana */}
                        <circle cx="500" cy="680" r="18" fill="#3b82f6" />
                        <text x="530" y="685" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">LUDHIANA</text>

                        {/* Delhi */}
                        <circle cx="680" cy="780" r="24" fill="#3b82f6" />
                        <text x="715" y="785" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">DELHI</text>

                        {/* Transport Icons - Simple Path Representations */}
                        <symbol id="icon-train" viewBox="0 0 24 24">
                            <path d="M3 13h18 M5 16v2 M19 16v2 M4 7h16c1.1 0 2 .9 2 2v7H2V9c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="7" cy="12" r="1" fill="white" />
                            <circle cx="17" cy="12" r="1" fill="white" />
                        </symbol>

                        <symbol id="icon-car" viewBox="0 0 24 24">
                            <path d="M5 17h14 M5 17a2 2 0 0 1-2-2v-5l2-4h14l2 4v5a2 2 0 0 1-2 2" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="7" cy="15" r="2" fill="white" />
                            <circle cx="17" cy="15" r="2" fill="white" />
                        </symbol>

                        {/* Using icons with slight offset from text */}
                        {/* Amritsar */}
                        <use href="#icon-train" x="290" y="80" width="24" height="24" />
                        <use href="#icon-car" x="320" y="80" width="24" height="24" />

                        {/* Jalandhar */}
                        <use href="#icon-train" x="360" y="280" width="24" height="24" />

                        {/* Chandigarh */}
                        <use href="#icon-car" x="700" y="370" width="24" height="24" />

                        {/* Phagwara */}
                        <use href="#icon-train" x="550" y="540" width="24" height="24" />

                        {/* Ludhiana */}
                        <use href="#icon-train" x="660" y="670" width="24" height="24" />

                        {/* Delhi */}
                        <use href="#icon-train" x="800" y="770" width="24" height="24" />
                        <use href="#icon-car" x="835" y="770" width="24" height="24" />

                    </svg>
                </div>
            </div>
        </section>
    );
};

export default VenueLocation;

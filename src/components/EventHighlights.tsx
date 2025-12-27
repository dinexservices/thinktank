'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Store, Mic, Mic2, Users, Music, Lightbulb } from 'lucide-react';

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const EventHighlights: React.FC = () => {
    const highlights = [
        {
            id: "01",
            title: "Startup Expo",
            description: "Explore a vibrant marketplace where startups from various industries showcase their groundbreaking products and services. Connect with founders, investors, and potential partners to discover new opportunities.",
            icon: <Store className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />,
            color: "border-blue-500/30",
            bg: "from-blue-500/10 to-blue-600/5"
        },
        {
            id: "02",
            title: "Pitch Competitions",
            description: "Witness the thrill of startups pitching their ideas to a panel of esteemed investors. Experience LIVE judging on valuations while you cheer on your favorite entrepreneurs as they compete for funding, mentorship, and recognition.",
            icon: <Mic className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />,
            color: "border-purple-500/30",
            bg: "from-purple-500/10 to-purple-600/5"
        },
        {
            id: "03",
            title: "Keynote Speeches",
            description: "Get inspired by influential entrepreneurs, renowned industry leaders who will share their insights, experiences, and strategies for building a thriving startup. Learn from their successes and failures to fuel your own entrepreneurial journey.",
            icon: <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />,
            color: "border-yellow-500/30",
            bg: "from-yellow-500/10 to-yellow-600/5"
        },
        {
            id: "04",
            title: "Founders Talk",
            description: "Raw, honest conversations with founders who've built from scratch. No theory. No motivational fluff. Just real stories about what worked, what broke, and what they learned along the way.",
            icon: <Mic2 className="w-8 h-8 md:w-10 md:h-10 text-pink-400" />,
            color: "border-pink-500/30",
            bg: "from-pink-500/10 to-pink-600/5"
        },
        {
            id: "05",
            title: "Networking Sessions",
            description: "Connect with like-minded individuals, potential investors, and industry professionals during our dedicated networking sessions. Forge valuable connections, exchange ideas, and explore collaboration opportunities that can propel your startup forward.",
            icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-green-400" />,
            color: "border-green-500/30",
            bg: "from-green-500/10 to-green-600/5"
        },
        {
            id: "06",
            title: "EDM and Many More",
            description: "Explore EDM nights with top Artists, food and fun fairs, tours and explore networking that will last a lifetime. Learn, meet and communicate with people from around the world in a single campus that is a world in it's own.",
            icon: <Music className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />,
            color: "border-cyan-500/30",
            bg: "from-cyan-500/10 to-cyan-600/5"
        }
    ];

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-20 md:mb-32">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">Highlights</span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Experience a curated lineup of events designed to inspire, educate, and entertain.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {highlights.map((item, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className={`glass-panel h-full p-8 md:p-10 rounded-[2.5rem] border hover:border-white/20 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between ${item.color}`}>
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="text-5xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                                            {item.id}
                                        </div>
                                        <div className="p-3 md:p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-white/5">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/50 transition-all duration-500"></div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventHighlights;

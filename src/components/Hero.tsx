'use client'
import React from 'react';
// Added Rocket to the imports to resolve the 'Cannot find name Rocket' error
import { ArrowRight, Play, Users, TrendingUp, Globe, Rocket } from 'lucide-react';
import Link from 'next/link';
import LogoMarquee from './LogoMarquee';
import Image from 'next/image';

const logo = "/sponsor/rebelive.jpeg"

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-36 pb-20 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Main Content - Left Aligned for better readability */}
                    {/* Main Content - Left Aligned for better readability */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex flex-col items-center">
                            <div className="inline-flex flex-col items-center gap-2 mb-4">
                                <Image src={logo} alt="ThinkTank" width={170} height={170} className="object-contain" />
                                <p className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                                    PRESENTS
                                </p>
                            </div>

                            <h1 className="text-center lg:text-left text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
                                THINK <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">TANK</span>
                            </h1>
                        </div>

                        <p className="text-lg md:text-2xl text-gray-400 max-w-xl mb-12 leading-relaxed font-light lg:ml-2">
                            The premier student founder ecosystem. <br className="hidden md:block" />
                            Pitch to investors, build your network, and launch your dream.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 lg:ml-2">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto bg-white text-black hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                            >
                                Apply Now
                            </Link>

                        </div>
                    </div>

                    {/* Right Text/Graphic Feature - A more editorial layout */}
                    {/* Right Text/Graphic Feature - A more editorial layout */}
                    <div className="flex-1 w-full flex flex-col justify-center items-center lg:items-end">
                        <div className="w-full max-w-2xl relative">
                            <div className="relative">
                                {/* Abstract decorative elements instead of generic icons */}
                                <div className="absolute -top-12 -right-12 w-24 h-24 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="glass-panel p-8 md:p-12 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <Rocket size={120} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10">
                                        {[
                                            { val: '100K+', label: 'Footfall' },
                                            { val: '₹1000 Cr+', label: 'Investor Network' },
                                            { val: '500+', label: 'Campuses' },
                                            { val: '50+', label: 'Investors' },
                                        ].map((stat, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.val}</span>
                                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 mb-4">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Supported By</p>
                            </div>

                            <LogoMarquee />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;

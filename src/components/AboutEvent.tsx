'use client'
import React from 'react';
import { ArrowRight, Zap, Target, Users, ShoppingBag, Rocket, TrendingUp, Globe, Briefcase } from 'lucide-react';
import Image from 'next/image';

const logo = '/logo.png';
const AboutEvent: React.FC = () => {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-black/40">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-10000"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-10000 delay-1000"></div>

            <div className=" px-4 md:px-8 relative z-10">

                {/* Top Section: About Think Tank Campus */}
                <div className="container mx-auto mb-20 md:mb-32">
                    <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold mb-4 animate-bounce">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>The Biggest Campus Startup Event</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-blue-600 animate-gradient-x ">The Event</span>
                        </h2>

                        <div className="space-y-6 md:space-y-8 text-lg md:text-3xl text-gray-300 leading-relaxed font-light px-2 md:px-0 max-w-4xl mx-auto">
                            <p>
                                A <span className="text-white font-bold decoration-blue-500 underline decoration-4 underline-offset-4">first-ever campus arena</span> where early-stage founders pitch live in front of real investors - and can get funded on the spot.
                            </p>
                            <p>
                                Students don’t watch it on TV. They experience it in the auditorium - <span className="text-white font-bold italic">raw, real and high energy</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Marquee Section */}
                <div className="mb-24 -mx-4 md:-mx-8 overflow-hidden py-8 bg-white/5 border-y border-white/5 backdrop-blur-sm relative">
                    <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                        {[...Array(4)].map((_, i) => (
                            <React.Fragment key={i}>
                                {["INVESTORS", "STARTUPS", "PITCHING", "FUNDING", "NETWORKING", "MENTORSHIP"].map((text, idx) => (
                                    <div key={`${i}-${idx}`} className="flex items-center gap-16">
                                        <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent stroke-text">{text}</span>
                                        <Zap className="text-blue-500 w-8 h-8 opacity-50" fill="currentColor" />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
                </div>

                {/* Bottom Section: Why This Event Matters */}
                <div className="container mx-auto relative mb-32">
                    <div className="text-center mb-16 md:mb-24">
                        <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tight mb-6 text-white">
                            Why It <span className="bg-gradient-to-r from-blue-100 via-blue-400 to-blue-600 text-transparent bg-clip-text relative inline-block">
                                Matters
                             
                            </span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-2 md:px-0">
                        {[
                            {
                                title: "Real Exposure",
                                text: "Founders get real investor exposure, not just workshops.",
                                icon: <Target className="text-white" size={40} />,
                                color: "from-blue-600",
                                shadow: "group-hover:shadow-blue-500/50"
                            },
                            {
                                title: "Live Funding",
                                text: "Students witness how funding decisions actually happen in real-time.",
                                icon: <Users className="text-white" size={40} />,
                                color: "from-purple-600",
                                shadow: "group-hover:shadow-purple-500/50"
                            },
                            {
                                title: "Future Founders",
                                text: "A live stage that turns ideas into companies and spectators into future founders.",
                                icon: <Zap className="text-white" size={40} />,
                                color: "from-cyan-600",
                                shadow: "group-hover:shadow-cyan-500/50"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:-translate-y-3 transition-all duration-500 border border-white/5`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${item.color} to-transparent opacity-5 group-hover:opacity-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150`}></div>

                                <div className="relative z-10 flex flex-col items-start h-full">
                                    <div className={`w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl ${item.shadow} transition-shadow duration-500 group-hover:scale-110`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-black mb-4 text-white group-hover:text-blue-200 transition-colors uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center space-y-8 md:space-y-12 px-4 text-center max-w-4xl mx-auto">
                        <div className="glass-panel p-1 rounded-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 p-[1px]">
                            <div className="bg-black/90 rounded-full px-8 py-4 backdrop-blur-xl">
                                <span className="font-bold text-gray-200 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Note : All startup data would be shared with US & Indian investors
                                </span>
                            </div>
                        </div>

                        <p className="text-3xl md:text-6xl font-black text-white uppercase tracking-widest leading-tight drop-shadow-2xl">
                            A National Youth <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">Startup Movement.</span>
                        </p>
                    </div>
                </div>


                {/* Event Statistics Section */}
                <div className="container mx-auto mt-20 md:mt-32 border-t border-white/10 pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "100+ D2C & tech brands showing products", icon: <ShoppingBag className="text-blue-400" size={28} /> },
                            { label: "Live audience of early-stage founders", icon: <Users className="text-purple-400" size={28} /> },
                            { label: "100+ startups pitching & exhibiting", icon: <Rocket className="text-pink-400" size={28} /> },
                            { label: "1 lakh+ footfall across exhibition zone", icon: <TrendingUp className="text-green-400" size={28} /> },
                            { label: "Multi-platform digital broadcast nationwide", icon: <Globe className="text-cyan-400" size={28} /> },
                            { label: "10+ investors, VCs & family offices", icon: <Briefcase className="text-yellow-400" size={28} /> }
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-all duration-300 group hover:-translate-y-1 border border-white/5 hover:border-blue-500/30">
                                <div className="p-4 bg-blue-500/10 rounded-xl shrink-0 group-hover:scale-110 transition-transform text-blue-400 group-hover:text-white group-hover:bg-blue-500">
                                    {stat.icon}
                                </div>
                                <span className="text-gray-300 group-hover:text-white font-bold text-lg leading-tight transition-colors">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutEvent;

import React from 'react';

const EventSchedule = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <h2 className="text-5xl md:text-7xl font-black text-center text-white mb-16 uppercase tracking-tighter">
                    Schedule <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">Of Events</span>
                </h2>

                {/* Main Card Container */}
                <div className="max-w-6xl mx-auto bg-[#5BC0EB] p-4 md:p-8 rounded-[3rem] shadow-[0_0_50px_rgba(91,192,235,0.3)]">
                    {/* Inner White Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">

                        <div className="grid md:grid-cols-2 gap-12 relative">
                            {/* Vertical Divider (Desktop) */}
                            <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2"></div>

                            {/* Left Column - Day 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-10 w-full relative">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10 py-3 px-8 inline-block rounded-full bg-[#5BC0EB]">
                                        2nd FEB 2026
                                    </h3>
                                </div>

                                <div className="space-y-8 w-full">
                                    <ScheduleItem title="ARRIVAL OF GUESTS & DIGNITARIES" />
                                    <ScheduleItem title="THINK TANK INAUGURATION" highlight />
                                    <ScheduleItem title="KEY NOTE SPEECHES" />
                                    <ScheduleItem title="PANEL DISCUSSION" />
                                    <div className="py-2">
                                        <span className="text-gray-400 italic font-serif text-lg tracking-wide">-- LUNCH BREAK --</span>
                                    </div>
                                    <div className="flex justify-center gap-4 text-center">
                                        <div>
                                            <h4 className="font-black text-gray-800 uppercase text-sm md:text-base">PITCHING<br />SESSION</h4>
                                        </div>
                                        <div className="w-px bg-gray-300 h-10"></div>
                                        <div>
                                            <h4 className="font-black text-gray-800 uppercase text-sm md:text-base">STARTUP<br />EXPO SHOWCASE</h4>
                                        </div>
                                    </div>
                                    <ScheduleItem title="NETWORKING SESSION" />
                                    <ScheduleItem title="ENTREPRENEUR'S EVENING & EDM NIGHT" highlight />
                                </div>
                            </div>

                            {/* Right Column - Day 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-10 w-full relative">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white relative z-10 py-3 px-8 inline-block rounded-full bg-[#5BC0EB]">
                                        3rd FEB 2026
                                    </h3>
                                </div>

                                <div className="space-y-8 w-full">
                                    <div className="flex justify-center gap-8 text-center mb-2">
                                        <div>
                                            <h4 className="font-black text-gray-800 uppercase text-sm md:text-base">PITCHING<br />SESSION</h4>
                                        </div>
                                        <div className="w-px bg-gray-300 h-10"></div>
                                        <div>
                                            <h4 className="font-black text-gray-800 uppercase text-sm md:text-base">STARTUP<br />EXPO</h4>
                                        </div>
                                    </div>

                                    <ScheduleItem title="PANEL DISCUSSIONS" />
                                    <ScheduleItem title="NETWORKING SESSION" />

                                    <div className="py-2">
                                        <span className="text-gray-400 italic font-serif text-lg tracking-wide">-- LUNCH BREAK --</span>
                                    </div>

                                    <ScheduleItem title="FINAL PITCHING" highlight />

                                    <div className="pt-4">
                                        <h4 className="font-black text-gray-800 text-lg md:text-xl leading-tight">
                                            VALEDICTORY CEREMONY &<br />
                                            <span className="text-[#5BC0EB]">ENTREPRENEUR EVENING & EDM NIGHT</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ScheduleItem = ({ title, highlight = false }: { title: string, highlight?: boolean }) => (
    <div className={`transition-all duration-300 hover:scale-105 ${highlight ? 'scale-105' : ''}`}>
        <h4 className={`font-black uppercase tracking-wide text-sm md:text-lg ${highlight ? 'text-[#5BC0EB]' : 'text-gray-800'}`}>
            {title}
        </h4>
    </div>
);

export default EventSchedule;

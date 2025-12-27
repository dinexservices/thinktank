import RegistrationForm from "@/components/RegistrationForm";
import { Briefcase, Info, Thermometer, MapPin, ShoppingBag, Ban } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <main className="bg-black min-h-screen selection:bg-blue-500/30">
            {/* The Form Component handles its own background/hero section */}
            <RegistrationForm />

            {/* Additional Information Section - Placed immediately after the form's section */}
            <section id="guidelines" className="relative z-10 pb-24 px-4 -mt-12 md:-mt-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

                        {/* General Guidelines Card */}
                        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] group-hover:bg-blue-600/10 transition-all duration-500"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                                        <Info size={24} />
                                    </div>
                                    General Guidelines
                                </h3>

                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4 text-gray-400 group/item">
                                        <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-blue-400 group-hover/item:text-blue-300 transition-colors">
                                            <Thermometer size={16} />
                                        </div>
                                        <span className="leading-relaxed">
                                            February is <span className="text-white font-bold">cold</span> in Punjab. Carry winter clothing to stay warm and comfortable.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-4 text-gray-400 group/item">
                                        <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-blue-400 group-hover/item:text-blue-300 transition-colors">
                                            <ShoppingBag size={16} />
                                        </div>
                                        <span className="leading-relaxed">
                                            University mall has shops for all needs (gadgets, clothing, sweets). Banks & ATMs are available on campus.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-4 text-gray-400 group/item">
                                        <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-red-400 group-hover/item:text-red-300 transition-colors">
                                            <Ban size={16} />
                                        </div>
                                        <span className="leading-relaxed">
                                            <span className="text-white font-bold">100% vegetarian campus</span>. Alcohol and smoking are strictly prohibited within premises.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Accommodation Card */}
                        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] group-hover:bg-purple-600/10 transition-all duration-500"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/10 group-hover:scale-110 transition-transform duration-500">
                                        <MapPin size={24} />
                                    </div>
                                    Accommodation
                                </h3>

                                <div className="space-y-6">
                                    <p className="text-gray-400 leading-loose text-lg font-light">
                                        Our hospitality partner will assist you with booking accommodation <span className="text-white font-medium">on and off-campus</span>, tailored to your budget and requirements.
                                    </p>

                                    <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-5 hover:bg-white/[0.07] transition-colors group/contact">
                                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover/contact:scale-110 transition-transform">
                                            <Briefcase size={20} className="text-white" />
                                        </div>
                                        <Link href="/contact">
                                            <p className="text-white font-bold text-lg mb-1">Need assistance?</p>
                                            <p className="text-sm text-gray-400">Support team details will be shared after registration.</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
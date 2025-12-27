'use client'
import React, { useState } from 'react';
import { Send, CheckCircle, Rocket, Sparkles, User, Briefcase, Store } from 'lucide-react';

type RegistrationType = 'pitching' | 'expo' | 'delegate';

const RegistrationForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<RegistrationType>('pitching');
    const [submitted, setSubmitted] = useState(false);

    // Unified form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        startupName: '',
        linkedin: '',
        website: '',
        pitchDeck: '',
        description: '',
        teamSize: '1', // '1' or '2' for pitching
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the submission logic based on activeTab and formData
        console.log("Submitting for:", activeTab, formData);
        setSubmitted(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const tabs: { id: RegistrationType; label: string; icon: React.ReactNode }[] = [
        { id: 'pitching', label: 'Pitching Startups', icon: <Rocket size={20} /> },
        { id: 'expo', label: 'Startup Expo', icon: <Store size={20} /> },
        { id: 'delegate', label: 'Event Delegate', icon: <User size={20} /> },
    ];

    if (submitted) {
        return (
            <section id="register" className="min-h-screen flex items-center justify-center bg-black relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full transform scale-50"></div>
                <div className="text-center p-12 glass-panel rounded-[3rem] max-w-2xl mx-auto border-green-500/30 z-10 animate-in zoom-in-95 duration-500">
                    <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
                    <h2 className="text-5xl font-black mb-4">Registration Successful!</h2>
                    <p className="text-gray-400 text-xl mb-8">
                        Welcome to the Tank! We've sent a confirmation email to <span className="text-blue-400">{formData.email}</span>.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl transition-all"
                    >
                        Register for another category
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="register" className="py-24 relative bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">Your Spot</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        Choose your participation type and join the revolution.
                    </p>

                    <button
                        onClick={() => document.getElementById('guidelines')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider group"
                    >
                        View Terms & Guidelines
                        <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">

                        {/* Dynamic Pricing Banner */}
                        <div className="mb-10 text-center bg-white/5 p-6 rounded-2xl border border-white/5">
                            {activeTab === 'pitching' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Pitching Startup</h3>
                                    <div className="flex flex-col md:flex-row justify-center gap-4 text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">₹1,499</span> / person</p>
                                        <span className="hidden md:block text-gray-600">|</span>
                                        <p><span className="text-blue-400 font-bold text-xl">₹2,799</span> / 2 team members</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Includes food (Excludes accommodation)</p>
                                </div>
                            )}
                            {activeTab === 'expo' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Startup Expo</h3>
                                    <div className="flex justify-center text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">₹14,999</span> / Startup (max 2 persons)</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Limited seats available</p>
                                </div>
                            )}
                            {activeTab === 'delegate' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Event Delegate Pass</h3>
                                    <div className="flex justify-center text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">₹599</span> / person</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Access to all sessions & networking</p>
                                </div>
                            )}
                        </div>

                        {/* Common Fields */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number</label>
                                <input
                                    required
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">College / Organization</label>
                                <input
                                    required
                                    name="college"
                                    type="text"
                                    placeholder="IIT Delhi"
                                    value={formData.college}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Conditional Fields based on Active Tab */}
                        {activeTab === 'pitching' && (
                            <>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Startup Name</label>
                                        <input
                                            required
                                            name="startupName"
                                            value={formData.startupName}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Team Size</label>
                                        <select
                                            name="teamSize"
                                            value={formData.teamSize}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        >
                                            <option value="1" className="bg-black text-white">1 Person (₹1,499)</option>
                                            <option value="2" className="bg-black text-white">2 Members (₹2,799)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">LinkedIn Profile</label>
                                        <input
                                            name="linkedin"
                                            placeholder="https://linkedin.com/in/..."
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Pitch Deck URL</label>
                                        <input
                                            
                                            name="pitchDeck"
                                            placeholder="Google Drive / DocSend Link"
                                            value={formData.pitchDeck}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                      <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Website URL</label>
                                        <input
                                            name="website"
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'expo' && (
                            <>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Startup Name</label>
                                        <input
                                            required
                                            name="startupName"
                                            value={formData.startupName}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Website URL</label>
                                        <input
                                            name="website"
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Product Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        rows={3}
                                        placeholder="Tell us briefly about what you're building..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                    />
                                </div>
                            </>
                        )}


                        <button
                            type="submit"
                            className="w-full mt-6 bg-white text-black font-black py-5 rounded-2xl text-xl transition-all flex items-center justify-center gap-3 group hover:bg-blue-500 hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                        >
                            Proceed to Payment
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-6">
                            By submitting, you agree to our terms of participation and event guidelines.
                        </p>

                    </form>


                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;

'use client'
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Rocket, Sparkles, User, Briefcase, Store } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { register, registerGroup, fetchRegistrationForm } from '../store/slices/authSlice';

type RegistrationType = 'pitching' | 'expo' | 'delegate';

import ErrorModal from './ErrorModal';
import { RegistrationError } from '../types/auth';

const RegistrationForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<RegistrationType>('delegate');
    const [submitted, setSubmitted] = useState(false);
    const [needAccommodation, setNeedAccommodation] = useState(false);
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [currentError, setCurrentError] = useState<RegistrationError | null>(null);

    // Get form data from Redux store
    const { formData: apiFormData, formLoading, error: formError } = useSelector((state: any) => state.auth || {});

    // Fetch registration form data on mount
    useEffect(() => {
        dispatch(fetchRegistrationForm());
    }, [dispatch]);

    // Mock tickets for fallback when backend is unreachable
    const MOCK_TICKETS = [
        { _id: 'mock-pitch-1', type: 'Pitching Startup' },
        { _id: 'mock-pitch-1-accom', type: 'Pitching Startup + Accommodation' },
        { _id: 'mock-pitch-2', type: '2 Person Pitching Startup' },
        { _id: 'mock-pitch-2-accom', type: '2 Person Pitching Startup + Accommodation' },
        { _id: 'mock-expo', type: 'Startup Expo' },
        { _id: 'mock-delegate', type: 'Event Delegate Pass' },
        { _id: 'mock-delegate-accom', type: 'Event Delegate Pass + Accommodation' }
    ];

    // Use API data or fallback to mock data
    const tickets = apiFormData?.tickets || MOCK_TICKETS;

    // Get ticket ID based on active tab and team size
    const getTicketId = () => {
        if (!tickets) return null;

        if (activeTab === 'pitching') {
            if (formData.teamSize === '2') {
                return tickets.find((t: any) => t.type === '2 Person Pitching Startup')?._id;
            } else {
                return tickets.find((t: any) => t.type === 'Pitching Startup')?._id;
            }
        } else if (activeTab === 'expo') {
            return tickets.find((t: any) => t.type === 'Startup Expo')?._id;
        } else if (activeTab === 'delegate') {
            return tickets.find((t: any) => t.type === (needAccommodation ? 'Event Delegate Pass + Accommodation' : 'Event Delegate Pass'))?._id;
        }
        return null;
    };

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
        teamSize: '1', // '1' or '2' 
        name2: '',
        email2: '',
        phone2: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting for:", activeTab, formData);

        const ticketId = getTicketId();
        if (!ticketId) {
            setCurrentError({
                status: 'error',
                message: 'Unable to find ticket information. Please try again.'
            });
            setErrorModalOpen(true);
            setLoading(false);
            return;
        }

        try {
            let actionResult;

            // Build dynamic fields based on active tab
            const buildDynamicFields = () => {
                const fields: any = {};

                if (formData.college) fields.collage = formData.college;
                if (formData.startupName) fields.startup_name = formData.startupName;
                if (formData.linkedin) fields.linkedin_profile = formData.linkedin;
                if (formData.pitchDeck) fields.pitch_deck_url = formData.pitchDeck;
                if (formData.website) fields.website_url = formData.website;
                if (formData.description) fields.product_description = formData.description;

                return fields;
            };

            if (activeTab === 'pitching' && formData.teamSize === '2') {
                // Group Registration Payload
                const dynamicFields = buildDynamicFields();
                const payload = {
                    ticketId: ticketId,
                    groupName: `${formData.startupName || 'Team'}-${Date.now()}`,
                    groupLeader: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,

                    },
                    groupMembers: [
                        {
                            name: formData.name2,
                            email: formData.email2,
                            phone: formData.phone2,

                        }
                    ],
                    couponCode: null
                };
                console.log('Final Group Registration Payload:', payload);
                actionResult = await dispatch((registerGroup as any)(payload));
            } else {
                // Single Registration Payload
                const payload = {
                    ticketId: ticketId,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    dynamicFields: buildDynamicFields()
                };
                console.log('Final Single Registration Payload:', payload);
                actionResult = await dispatch((register as any)(payload));
            }

            if (register.fulfilled.match(actionResult) || registerGroup.fulfilled.match(actionResult)) {
                const response = actionResult.payload;
                console.log('Registration Response:', response?.data?.payment?.id);

                // Check if payment is required
                if (response?.code === 'PAYMENT_REQUIRED' && response?.data?.payment?.id) {
                    const paymentId = response.data.payment.id;
                    const currentUrl = window.location.origin;
                    const redirectUrl = `${currentUrl}/payment-status`;
                    const paymentBaseUrl = process.env.NEXT_PUBLIC_PAYMENT_URL || 'http://localhost:3001';
                    const paymentUrl = `${paymentBaseUrl}/events/thinktank/payment?sessionId=${paymentId}&redirect=${encodeURIComponent(redirectUrl)}`;
                    window.location.href = paymentUrl;
                } else {
                    // Check for token-based success
                    const token = response?.accessToken || response?.token;
                    if (token) {
                        router.push(`/success?accessToken=${token}`);
                    } else {
                        // Fallback if no token but success
                        setSubmitted(true);
                    }
                }
            } else {
                // Error handling
                const errorMessage = actionResult.payload?.message || "Unknown error occurred";
                setCurrentError({
                    status: 'error',
                    message: errorMessage,
                    // Map other details if available in payload
                });
                setErrorModalOpen(true);
            }

        } catch (error: any) {
            console.error("Submission error:", error);
            setCurrentError({
                status: 'error',
                message: error.message || "An unexpected error occurred."
            });
            setErrorModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const tabs: { id: RegistrationType; label: string; icon: React.ReactNode }[] = [
        { id: 'delegate', label: 'Event Delegate', icon: <User size={20} /> },
        { id: 'pitching', label: 'Pitching Startups', icon: <Rocket size={20} /> },
        { id: 'expo', label: 'Startup Expo', icon: <Store size={20} /> },

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

    // Loading state while fetching form data
    if (formLoading) {
        return (
            <section id="register" className="min-h-screen flex items-center justify-center bg-black relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full transform scale-50"></div>
                <div className="text-center p-12 glass-panel rounded-[3rem] max-w-2xl mx-auto z-10">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-xl">Loading registration form...</p>
                </div>
            </section>
        );
    }

    // Show error if form data failed to load but allow retry
    // if (formError && !apiFormData) {
    //     return (
    //         <section id="register" className="min-h-screen flex items-center justify-center bg-black relative">
    //             <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full transform scale-50"></div>
    //             <div className="text-center p-12 glass-panel rounded-[3rem] max-w-2xl mx-auto z-10">
    //                 <div className="text-red-500 text-6xl mb-4">⚠️</div>
    //                 <h2 className="text-3xl font-bold text-white mb-4">Failed to load form</h2>
    //                 <p className="text-gray-400 mb-6">
    //                     {typeof formError === 'string' ? formError : formError?.message || 'Unable to fetch registration form'}
    //                 </p>
    //                 <button
    //                     onClick={() => dispatch(fetchRegistrationForm())}
    //                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
    //                     >
    //                     Retry
    //                 </button>
    //             </div>
    //         </section>
    //     );
    // }

    return (
        <section id="register" className="py-24 relative bg-black overflow-hidden">
            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => setErrorModalOpen(false)}
                error={currentError}
            />
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
                            {activeTab === 'delegate' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Event Delegate Pass</h3>
                                    <div className="flex justify-center text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">{needAccommodation ? '₹1,699' : '₹699'}</span> / person</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Access to all sessions & networking {needAccommodation && '+ Food & Stay'}</p>
                                </div>
                            )}
                            {activeTab === 'pitching' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Pitching Startup</h3>
                                    <div className="flex flex-col md:flex-row justify-center gap-4 text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">₹1,499</span> / person</p>
                                        <span className="hidden md:block text-gray-600">|</span>
                                        <p><span className="text-blue-400 font-bold text-xl">₹2,499</span> / 2 team members</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Includes food (Excludes accommodation)</p>
                                </div>
                            )}
                            {activeTab === 'expo' && (
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2">Startup Expo</h3>
                                    <div className="flex justify-center text-gray-300">
                                        <p><span className="text-blue-400 font-bold text-xl">₹9,999</span> / Startup (max 2 persons)</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Limited seats available</p>
                                </div>
                            )}

                            {/* Accommodation Checkbox */}
                            {activeTab === 'delegate' && (
                                <div className="mt-6 flex justify-center">
                                    <label className="flex items-center gap-3 cursor-pointer group bg-black/40 px-4 py-2 rounded-xl border border-white/5 hover:border-blue-500/50 transition-all">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${needAccommodation ? 'bg-blue-600 border-blue-600' : 'border-gray-500 group-hover:border-blue-400'}`}>
                                            {needAccommodation && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={needAccommodation}
                                            onChange={(e) => setNeedAccommodation(e.target.checked)}
                                        />
                                        <span className={`text-xs lg:text-sm font-medium ${needAccommodation ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                            I need Food & Accommodation (Non-LPU Participants)
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Common Fields */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name <span className="text-red-500">*</span></label>
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
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address <span className="text-red-500">*</span></label>
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
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number <span className="text-red-500">*</span></label>
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
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">College / Organization <span className="text-red-500">*</span></label>
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
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Startup Name <span className="text-red-500">*</span></label>
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
                                            <option value="2" className="bg-black text-white">2 Members (₹2,499)</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.teamSize === '2' && (
                                    <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <User size={18} className="text-blue-500" />
                                            Team Member 2
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    name="name2"
                                                    type="text"
                                                    placeholder="Member Name"
                                                    value={formData.name2}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    name="email2"
                                                    type="email"
                                                    placeholder="member@example.com"
                                                    value={formData.email2}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number <span className="text-red-500">*</span></label>
                                            <input
                                                required
                                                name="phone2"
                                                type="tel"
                                                placeholder="+91..."
                                                value={formData.phone2}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                            />
                                        </div>
                                    </div>
                                )}
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
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Startup Name <span className="text-red-500">*</span></label>
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
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Product Description <span className="text-red-500">*</span></label>
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
                            disabled={loading}
                            className="w-full mt-6 bg-white text-black font-black py-5 rounded-2xl text-xl transition-all flex items-center justify-center gap-3 group hover:bg-blue-500 hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                            {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
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

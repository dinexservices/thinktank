'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone, Send, MessageSquare, ArrowRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const social = [
        { icon: Instagram, href: 'https://www.instagram.com/thinktank.campus?igsh=MWlhNWZybTQ4aWhwOQ==' },
        { icon: Linkedin, href: 'https://www.linkedin.com/company/think-tank-campus-rebelive/' },
        { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029Vb7YsYF6rsR1PWfAYV3T' },

    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        console.log('Form submitted:', formData);
        alert('Message sent! We will get back to you soon.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
         

            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">

                    {/* Page Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Have questions about the event, sponsorship, or registration? We're here to help you navigate the Think Tank experience.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Mail className="text-blue-400" />
                                    Contact Details
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 text-gray-300">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Email Us</p>
                                            <a href="mailto:hello@thinktankcampus.com" className="text-lg md:text-xl font-medium text-white hover:text-blue-400 transition-colors">
                                                support@thinktankcampus.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 text-gray-300">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Call Us</p>
                                            <p className="text-lg md:text-xl font-medium text-white">
                                               +91 95981 48055
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 text-gray-300">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Visit Us</p>
                                            <p className="text-lg md:text-xl font-medium text-white">
                                                Lovely Professional University,<br />
                                                Phagwara, Punjab
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Community Card */}
                        
                        </div>
                            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all"></div>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <MessageSquare className="text-purple-400" />
                                    Join the Community
                                </h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Stay updated with the latest announcements and connect with fellow participants on our social channels.
                                </p>
                                <div className="flex gap-4">
                                    {social.map((item, index) => (
                                        <a key={index} href={item.href} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/5 text-center text-sm font-bold hover:bg-white/10 hover:scale-105 transition-all flex items-center justify-center">
                                            <item.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                        {/* Contact Form */}
                        {/* <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative">
                            <h3 className="text-3xl font-black mb-8">Send a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Partnership / General Inquiry"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-black py-5 rounded-2xl text-xl transition-all flex items-center justify-center gap-3 group hover:bg-blue-500 hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                >
                                    Send Message
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div> */}

                    </div>
                </div>
            </main>


        </div>
    );
};

export default ContactPage;

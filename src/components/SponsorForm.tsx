'use client'
import React, { useState } from 'react';
import { Loader2, Download, X } from 'lucide-react';


const SponsorForm = ({ onClose }: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Call API to save data
            const response = await fetch('/api/save-sponsor-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            setStatus('success');

            // Trigger Deck download after a short delay
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '/thinktank.pdf';
                link.download = 'thinktank.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 1000);

            // Reset form
            setFormData({ name: '', email: '', phone: '' });
            setTimeout(() => setStatus('idle'), 3000);

        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 relative">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            )}
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Download Sponsorship Deck</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
                        Company / Contact Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-200/50"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-200/50"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-200/50"
                        placeholder="Enter your phone number"
                    />
                </div>

                {status === 'error' && (
                    <p className="text-red-300 text-sm text-center">{errorMessage}</p>
                )}

                {status === 'success' && (
                    <p className="text-green-300 text-sm text-center">Thanks! Downloading Deck...</p>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Submit & Download <Download className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SponsorForm;

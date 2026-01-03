'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Home, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface PaymentStatusData {
    paymentId: string;
    orderId: string;
    gatewayOrderId: string;
    gatewayPaymentId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    paymentTime: string;
    participant: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        status: string;
    };
    organization: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface PaymentStatusResponse {
    success: boolean;
    message: string;
    data?: PaymentStatusData;
    status?: number;
    error?: {
        code: string;
        details: string;
    };
}

const StatusContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState<PaymentStatusResponse | null>(null);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (!orderId) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/payment-status/${orderId}`);
                setPaymentData(response.data);
            } catch (error) {
                console.error('Error fetching payment status:', error);
                if (axios.isAxiosError(error) && error.response) {
                    setPaymentData(error.response.data);
                } else {
                    setPaymentData({
                        success: false,
                        message: 'Failed to fetch payment status',
                        error: {
                            code: 'FETCH_ERROR',
                            details: 'Unable to connect to the server.'
                        }
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full transform scale-50"></div>
                <div className="glass-panel p-12 rounded-[3rem] border border-white/10 text-center relative z-10 max-w-xl w-full">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Verifying Payment</h3>
                    <p className="text-gray-400">Please wait while we confirm your transaction...</p>
                </div>
            </div>
        );
    }

    if (!orderId) {
        return (
            <div className="min-h-screen bg-black flex justify-center pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600/10 blur-[100px] rounded-full transform scale-50"></div>
                <div className="glass-panel p-12 rounded-[3rem] border border-red-500/30 text-center max-w-xl w-full relative z-10">
                    <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-black text-white mb-4">Invalid Request</h2>
                    <p className="text-gray-400 text-lg mb-8">No order ID provided. Please return home and try again.</p>
                    <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-all w-full md:w-auto">
                        <Home size={20} /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const isSuccess = paymentData?.success && paymentData?.data?.status === 'success';
    const message = paymentData?.message || '';
    const participant = paymentData?.data?.participant;
    const paymentInfo = paymentData?.data;

    return (
        <div className="min-h-screen bg-black flex justify-center pt-32 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className={`absolute top-1/4 left-10 w-96 h-96 ${isSuccess ? 'bg-green-600' : 'bg-red-600'} rounded-full blur-[150px]`}></div>
                <div className={`absolute bottom-1/4 right-10 w-96 h-96 ${isSuccess ? 'bg-blue-600' : 'bg-orange-600'} rounded-full blur-[150px]`}></div>
            </div>

            <div className={`max-w-3xl w-full glass-panel p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] ${isSuccess ? 'border-green-500/30' : 'border-red-500/30'} border relative z-10 text-center animate-in zoom-in-95 duration-500`}>
                <div className="mb-8 flex justify-center">
                    {isSuccess ? (
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center animate-bounce">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center animate-shake">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                    )}
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                </h2>

                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    {message || (isSuccess
                        ? "Your registration has been confirmed. Welcome to the event! Check your email for details."
                        : "Something went wrong with your transaction. Please try again or contact support.")}
                </p>

                {/* Payment Details for Success */}
                {isSuccess && paymentInfo && (
                    <div className="space-y-4 mb-10 text-left max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-4">
                            {participant && (
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">Participant</p>
                                    <div className="space-y-1.5">
                                        <p className="text-white font-bold text-lg">{participant.name}</p>
                                        <p className="text-sm text-gray-400 truncate">{participant.email}</p>
                                        <p className="text-sm text-gray-400">{participant.phone}</p>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 mt-2 border border-green-500/20">
                                            {participant.status.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">Payment Info</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Amount</span>
                                        <span className="text-white font-bold text-xl">₹{paymentInfo.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Method</span>
                                        <span className="text-white text-sm bg-white/10 px-2 py-1 rounded-md capitalize">{paymentInfo.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Payment ID</span>
                                        <span className="text-white text-xs font-mono opacity-70" title={paymentInfo.gatewayPaymentId}>
                                            {paymentInfo.gatewayPaymentId.slice(0, 10)}...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order ID</span>
                            <span className="text-white font-mono text-sm break-all">{paymentInfo.orderId}</span>
                        </div>
                    </div>
                )}

                {/* Error Details */}
                {!isSuccess && paymentData?.error && (
                    <div className="bg-red-500/10 rounded-2xl p-6 mb-10 border border-red-500/20 text-left max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <XCircle size={20} className="text-red-400" />
                            </div>
                            <div>
                                <p className="text-xs text-red-400 uppercase tracking-wider mb-1 font-bold">Error: {paymentData.error.code}</p>
                                <p className="text-gray-200">{paymentData.error.details}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
                    {isSuccess ? (
                        <Link href="/" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                            Go to Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <Link href="/register" className="flex-1 bg-white hover:bg-gray-200 text-black font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            Try Again <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}

                    <Link href="/" className="flex-1 bg-transparent border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2">
                        <Home size={20} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <StatusContent />
        </Suspense>
    );
}

'use client'
import React from 'react';

import Image from 'next/image';

const amar="/investors/Amar.png";
const abhiram="/investors/Abhiram.jpeg";
const mudit="/investors/Mudit.jpeg";
const suraj="/investors/Suraj.png";


const investors = [
    { name: 'Amar Dixit', role: 'Founding partner & CIO swiftSeed Ventures', image: amar },
    { name: 'Abhiram Bhalerao ', role: 'Partner V3 venture', image: abhiram },
    { name: 'Mudit Kumar', role: 'CO-Founder of Ideabaaz', image: mudit },
    { name: 'Suraj Juneja', role: 'Founder of Freeflow venture', image: suraj },
    // { name: 'Raelene Thomas', role: 'VP, Finance & Operations', image: amar },
    // { name: 'Mitchell Fawcett', role: 'VP, Strategy', image: amar },
    // { name: 'Jieun Segal', role: 'VP, Sales & Marketing', image: amar },
    // { name: 'Darren Maher', role: 'Creative Director', image: amar },
    // { name: 'Ben Van Exan', role: 'Snr Account Executive', image: amar },
    // { name: 'John Blown', role: 'Founding Partner', image: amar },
    // { name: 'Chris Breikss', role: 'Founding Partner', image: amar },
];

const Investors: React.FC = () => {
    return (
        <section className="py-16 md:py-24  relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                        MEET OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-600">INVESTORS</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-10 md:gap-x-20 md:gap-y-16 max-w-6xl mx-auto">
                    {investors.map((person, index) => (
                        <div key={index} className="flex flex-col items-center text-center group w-40 md:w-56">
                            <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 border-white/5 group-hover:border-blue-500/50 transition-colors duration-300 bg-white/5">
                                <Image src={person.image} alt={person.name} width={100} height={100} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {person.name}
                            </h3>
                            <p className="text-sm text-gray-400 font-medium">
                                {person.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Investors;

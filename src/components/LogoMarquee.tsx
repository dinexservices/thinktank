import React from 'react';
import Image from 'next/image';

const logos = [

    { name: 'Startup India', src: '/dpit.jpg' },
    { name: 'Ideabaaz', src: '/sponsor/Ideabaaz.png' },
      
  

];

const LogoMarquee = () => {
    return (
        <div className="w-full mt-8 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-black to-transparent"></div>

            <div className="flex gap-8 animate-marquee">
                {/* We double the list to ensure smooth infinite scroll */}
                {[...logos, ...logos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 flex items-center justify-center w-40 h-24  p-2  transition-all  ">
                        <div className="relative w-full h-full">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;

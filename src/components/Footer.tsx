
import React from 'react';
import { Phone, Mail, Instagram, Twitter, Linkedin, Rocket } from 'lucide-react';
import Image from 'next/image';

const logo = '/logo.png';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <div className="flex items-center justify-center ">
              <Image src={logo} alt="Logo" width={200} height={200} />
              </div>
         
            </div>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-8">
              Empowering the student-founder ecosystem across India. An inclusive platform where brands, investors, and students converge to build the future.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Contact Organizer</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">Krishna Yadav</div>
                  <a href="tel:+919523088711" className="text-gray-400 hover:text-white transition-colors">+91 9523088711</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">Official Inquiries</div>
                  <a href="mailto:hello@thinktankcampus.com" className="text-gray-400 hover:text-white transition-colors">team@thinktankcampus.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Location</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Main Event Ground<br />
              Innovation Campus, New Delhi<br />
              India - 110001
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 Think Tank Campus. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Participation</a>
            <a href="#" className="hover:text-white">Sponsorship Deck</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Phone, Mail, Instagram, Twitter, Linkedin, Rocket } from 'lucide-react';
import Image from 'next/image';

const logo = '/logo.png';



const Footer: React.FC = () => {

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/thinktank.campus?igsh=MWlhNWZybTQ4aWhwOQ==' },

    { icon: Linkedin, href: 'https://www.linkedin.com/company/think-tank-campus-rebelive/' },
  ];
  return (
    <footer id="contact" className="py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center ">
                <Image src={logo} alt="Logo" width={200} height={200} />
              </div>

            </div>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-8">
              Empowering the student-founder ecosystem across India. An inclusive platform where brands, investors, and students converge to build the future.
            </p>

          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-gray-500">Contact Organizer</h4>
            <div className="grid sm:grid-cols-2 gap-8">

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">Sakshi Srivastava</div>
                  <a href="tel:+919450655732" className="text-gray-400 hover:text-white transition-colors">+91 8427600516</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">Nishant Mishra</div>
                  <a href="tel:+919598148055" className="text-gray-400 hover:text-white transition-colors">+91 95981 48055</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">Official Inquiries</div>
                  <a href="mailto:team@thinktankcampus.com" className="text-gray-400 hover:text-white transition-colors">team@thinktankcampus.com</a>
                </div>
              </div>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                    <link.icon size={20} />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Think Tank Campus. All rights reserved.</p>
          <p>
            Developed by <a href="https://dinestx.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Dinex services</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

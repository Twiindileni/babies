import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative bg-white pt-20 pb-10 mt-20 border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Decorative Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4E7B38] via-[#FFD700] to-[#D64545]"></div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E8F5E4] rounded-full filter blur-[80px] opacity-60 pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#FFE8E8] rounded-full filter blur-[60px] opacity-50 pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="row g-5">
          <div className="col-lg-4 mb-4">
            <h5 className="mb-4 font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E]">
              Babies & Todd&apos;s
            </h5>
            <p className="text-gray-600 leading-relaxed mb-6 fs-5 font-light">
              Where Every Child&apos;s Journey Begins with Love and Care! 🌟
            </p>
            <div className="d-flex gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=100077684227516" 
                className="w-12 h-12 rounded-full bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center transition-all hover:bg-[#4E7B38] hover:text-white hover:-translate-y-1 shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#FFE8E8] text-[#D64545] flex items-center justify-center transition-all hover:bg-[#D64545] hover:text-white hover:-translate-y-1 shadow-sm">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#FFF9C4] text-[#8B6E4E] flex items-center justify-center transition-all hover:bg-[#8B6E4E] hover:text-white hover:-translate-y-1 shadow-sm">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="mb-4 font-bold text-[#1f2937] text-lg">Quick Links</h5>
            <ul className="list-unstyled space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Programs', path: '/programs' },
                { name: 'Games', path: '/games' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Parent Portal', path: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-gray-600 hover:text-[#4E7B38] transition-colors flex items-center gap-2 group"
                  >
                    <i className="fas fa-chevron-right text-[10px] text-[#4E7B38] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-lg-5 col-md-6 mb-4">
            <h5 className="mb-4 font-bold text-[#1f2937] text-lg">Contact Info</h5>
            <ul className="list-unstyled space-y-4">
              <li className="flex items-start gap-4 text-gray-600 group">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Phone & WhatsApp</div>
                  <a href="tel:+264816737599" className="hover:text-[#4E7B38] transition-colors">+264 81 673 7599</a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-600 group">
                <div className="w-10 h-10 rounded-full bg-[#FFE8E8] text-[#D64545] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Email Address</div>
                  <a href="mailto:babiesandtodds22@gmail.com" className="hover:text-[#D64545] transition-colors">babiesandtodds22@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-600 group">
                <div className="w-10 h-10 rounded-full bg-[#FFF9C4] text-[#8B6E4E] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Location</div>
                  <span>47 Pasteur Street, Windhoek West, Namibia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="mt-8 mb-6 border-gray-200" />
        
        <div className="text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mb-0 text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Babies & Todd&apos;s Day Care. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-[#4E7B38] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#4E7B38] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

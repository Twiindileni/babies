'use client'

import Link from 'next/link'

export default function GamesPage() {
  return (
    <div className="overflow-hidden min-h-screen bg-[#F5F0EB]">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center pt-[120px] pb-10">
        {/* Background Blobs */}
        <div className="blob-shape bg-[#4E7B38] w-96 h-96 rounded-full -top-20 -left-20 opacity-20"></div>
        <div className="blob-shape bg-[#D64545] w-80 h-80 rounded-full bottom-0 right-10 delay-200 opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-block px-5 py-2 rounded-full glass border border-[#D64545]/20 text-[#D64545] font-bold mb-6 shadow-sm fade-in-up">
            <i className="fas fa-gamepad me-2"></i> Play & Learn
          </div>
          <h1 className="display-3 fw-bold mb-4 text-[#1f2937] leading-tight fade-in-up delay-100">
            Fun Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D64545] to-[#FFD700]">Games</span>
          </h1>
          <p className="lead mb-8 fs-4 text-gray-600 max-w-2xl mx-auto fade-in-up delay-200">
            Interactive educational games designed specifically to help your child explore, learn, and grow!
          </p>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 relative">
        <div className="container">
          <div className="row g-5">
            
            {/* Color Learning - Yellow Accent */}
            <div className="col-md-6 fade-in-up delay-100">
              <div className="card h-100 p-8 rounded-3xl bg-white border border-[#FFD700]/30 shadow-xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF9C4] flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                    <i className="fas fa-palette text-4xl text-[#D4AF37]"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-3">Color Learning</h2>
                  <p className="text-gray-600 text-lg mb-8 flex-grow">
                    Help your child discover the rainbow! They will learn colors through fun interactive games.
                  </p>
                  <Link href="/games/colors" className="btn inline-block text-center text-[#8B6E4E] border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-white transition-all rounded-full py-2 px-6 font-bold mt-auto w-max">
                    Play Now <i className="fas fa-play ml-2 text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Letter Learning - Red Accent */}
            <div className="col-md-6 fade-in-up delay-200">
              <div className="card h-100 p-8 rounded-3xl bg-white border border-[#D64545]/30 shadow-xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D64545]/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFE8E8] flex items-center justify-center mb-6 shadow-sm group-hover:-rotate-12 transition-transform">
                    <i className="fas fa-font text-4xl text-[#D64545]"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-3">Letter Learning</h2>
                  <p className="text-gray-600 text-lg mb-8 flex-grow">
                    Master the alphabet! Learn ABCs with engaging letter recognition and sound games.
                  </p>
                  <Link href="/games/letters" className="btn inline-block text-center text-[#D64545] border-2 border-[#D64545] hover:bg-[#D64545] hover:text-white transition-all rounded-full py-2 px-6 font-bold mt-auto w-max">
                    Play Now <i className="fas fa-play ml-2 text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Matching Games - Green Accent */}
            <div className="col-md-6 fade-in-up delay-300">
              <div className="card h-100 p-8 rounded-3xl bg-white border border-[#4E7B38]/30 shadow-xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4E7B38]/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#E8F5E4] flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                    <i className="fas fa-puzzle-piece text-4xl text-[#4E7B38]"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-3">Matching Games</h2>
                  <p className="text-gray-600 text-lg mb-8 flex-grow">
                    Boost cognitive development! Develop memory and matching skills with fun puzzle exercises.
                  </p>
                  <Link href="/games/match" className="btn inline-block text-center text-[#4E7B38] border-2 border-[#4E7B38] hover:bg-[#4E7B38] hover:text-white transition-all rounded-full py-2 px-6 font-bold mt-auto w-max">
                    Play Now <i className="fas fa-play ml-2 text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card Games - Brown Accent */}
            <div className="col-md-6 fade-in-up delay-400">
              <div className="card h-100 p-8 rounded-3xl bg-white border border-[#8B6E4E]/30 shadow-xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6E4E]/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#F5F0EB] flex items-center justify-center mb-6 shadow-sm group-hover:-rotate-12 transition-transform">
                    <i className="fas fa-shapes text-4xl text-[#8B6E4E]"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f2937] mb-3">Card Games</h2>
                  <p className="text-gray-600 text-lg mb-8 flex-grow">
                    Classic fun for little ones! Interactive card games designed to teach numbers and patterns.
                  </p>
                  <Link href="/games/cards" className="btn inline-block text-center text-[#8B6E4E] border-2 border-[#8B6E4E] hover:bg-[#8B6E4E] hover:text-white transition-all rounded-full py-2 px-6 font-bold mt-auto w-max">
                    Play Now <i className="fas fa-play ml-2 text-sm"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

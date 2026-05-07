'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-[120px] pb-20 bg-gradient-to-b from-[#F5F0EB]/50 to-white">
        {/* Background Blobs */}
        <div className="blob-shape bg-[#4E7B38] w-96 h-96 rounded-full -top-20 -left-20 opacity-20"></div>
        <div className="blob-shape bg-[#8B6E4E] w-80 h-80 rounded-full bottom-0 right-10 delay-200 opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-block px-5 py-2 rounded-full glass border border-[#4E7B38]/20 text-[#4E7B38] font-bold mb-6 shadow-sm fade-in-up">
            <i className="fas fa-hand-sparkles me-2"></i> Welcome to Our Family
          </div>
          <h1 className="display-3 fw-bold mb-4 text-[#1f2937] leading-tight fade-in-up delay-100">
            About <span className="text-[#4E7B38]">Babies & Todd&apos;s</span>
          </h1>
          <p className="lead mb-8 fs-4 text-gray-600 max-w-2xl mx-auto fade-in-up delay-200">
            Nurturing Young Minds Since 2010
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 relative">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6 fade-in-up delay-100">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#4E7B38] to-[#FFD700] rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src="/assets/images/hero-kids.png" 
                    alt="Our Story" 
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#8B6E4E]/10 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
            <div className="col-md-6 fade-in-up delay-200 lg:pl-12">
              <h2 className="display-6 font-extrabold text-[#1f2937] mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6E4E] to-[#D64545]">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-8">
                <p>
                  Founded in <span className="font-bold text-[#D64545]">2010</span>, Babies & Todd&apos;s has been unconditionally committed to providing exceptional early childhood education and care.
                </p>
                <p>
                  We believe that every child deserves the best start in life. Our dedicated team of educators and caregivers work together to create a nurturing environment where children can learn, grow, and thrive to their fullest potential.
                </p>
              </div>
              
              <div className="row text-center mt-8 g-4">
                <div className="col-6">
                  <div className="card p-4 rounded-2xl bg-gradient-to-br from-white to-[#E8F5E4] border border-[#4E7B38]/20 shadow-md group hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#4E7B38] text-white flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                      <i className="fas fa-child fa-2x"></i>
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#4E7B38] mb-1">500+</h3>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Happy Children</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card p-4 rounded-2xl bg-gradient-to-br from-white to-[#FFE8E8] border border-[#D64545]/20 shadow-md group hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#D64545] text-white flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                      <i className="fas fa-award fa-2x"></i>
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#D64545] mb-1">13+</h3>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F0EB]">
        <div className="container">
          <div className="row g-5">
            {/* Mission */}
            <div className="col-md-4 fade-in-up delay-100">
              <div className="card h-100 p-8 rounded-[2rem] bg-white border border-[#4E7B38]/20 shadow-xl group hover:-translate-y-2 transition-all text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                  <i className="fas fa-heart fa-3x"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg">
                  To provide a safe, nurturing, and stimulating environment where children can develop their full potential and build a solid foundation.
                </p>
              </div>
            </div>
            
            {/* Vision */}
            <div className="col-md-4 fade-in-up delay-200">
              <div className="card h-100 p-8 rounded-[2rem] bg-white border border-[#FFD700]/30 shadow-xl group hover:-translate-y-2 transition-all text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#FFF9C4] text-[#D4AF37] flex items-center justify-center mb-6 shadow-sm group-hover:-rotate-12 transition-transform">
                  <i className="fas fa-eye fa-3x"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg">
                  To be the leading early childhood education center, globally recognized for unwavering excellence in child development.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="col-md-4 fade-in-up delay-300">
              <div className="card h-100 p-8 rounded-[2rem] bg-white border border-[#D64545]/20 shadow-xl group hover:-translate-y-2 transition-all text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#FFE8E8] text-[#D64545] flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                  <i className="fas fa-star fa-3x"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Our Values</h3>
                <p className="text-gray-600 text-lg">
                  Quality, Safety, Continuous Innovation, and dedicated Individual Attention given to every single child&apos;s needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full max-h-[800px] bg-[#E8F5E4] rounded-full filter blur-[100px] opacity-50 -z-10 pointer-events-none"></div>
        
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="display-6 font-extrabold text-[#1f2937] mb-4">Meet Our <span className="text-[#4E7B38]">Teaching Team</span></h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Dedicated professionals who pour their hearts into shaping the brilliant minds of tomorrow.
            </p>
          </div>

          <div className="row g-5">
            {/* Teacher Yolandi */}
            <div className="col-md-6 col-lg-3 fade-in-up delay-100">
              <div className="card h-100 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:-translate-y-3 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#FFD700] border-dashed group-hover:animate-[spin_10s_linear_infinite]"></div>
                  <Image 
                    src="/assets/images/team/yolandi.jpg" 
                    alt="Teacher Yolandi"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg p-1"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Teacher Yolandi</h4>
                <div className="inline-block px-3 py-1 bg-[#FFD700]/20 text-[#D4AF37] rounded-full text-sm font-bold mb-1">Cuddle Cubs</div>
                <p className="text-sm text-gray-400 font-medium mb-4">(3 months - 1 year)</p>
                <p className="text-gray-600 flex-grow text-sm">
                  Ensures the little ones in the Cuddle Cubs class are well-fed, safe, and nurtured in a loving, safe and caring environment.
                </p>
              </div>
            </div>

            {/* Teacher Nancy */}
            <div className="col-md-6 col-lg-3 fade-in-up delay-200">
              <div className="card h-100 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:-translate-y-3 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#D64545] border-dashed group-hover:animate-[spin_10s_linear_infinite]"></div>
                  <Image 
                    src="/assets/images/team/Teacher Nancy.jpg" 
                    alt="Teacher Nancy"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg p-1"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Teacher Nancy</h4>
                <div className="inline-block px-3 py-1 bg-[#FFE8E8] text-[#D64545] rounded-full text-sm font-bold mb-1">Bright Butterflies</div>
                <p className="text-sm text-gray-400 font-medium mb-4">(1-2 years)</p>
                <p className="text-gray-600 flex-grow text-sm">
                  Introduces toddlers to colors and basic concepts through fun, interactive play, fostering curiosity and early social skills.
                </p>
              </div>
            </div>

            {/* Teacher Tabitha */}
            <div className="col-md-6 col-lg-3 fade-in-up delay-300">
              <div className="card h-100 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:-translate-y-3 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#8B6E4E] border-dashed group-hover:animate-[spin_10s_linear_infinite]"></div>
                  <Image 
                    src="/assets/images/team/Teacher Tabitha.jpg" 
                    alt="Teacher Tabitha"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg p-1"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Teacher Tabitha</h4>
                <div className="inline-block px-3 py-1 bg-[#F5F0EB] text-[#8B6E4E] rounded-full text-sm font-bold mb-1">Tiny Adventures</div>
                <p className="text-sm text-gray-400 font-medium mb-4">(3-4 years)</p>
                <p className="text-gray-600 flex-grow text-sm">
                  Fosters early learning, helping children grasp the basics like the alphabet and numbers through fun, interactive activities.
                </p>
              </div>
            </div>

            {/* Teacher Johana */}
            <div className="col-md-6 col-lg-3 fade-in-up delay-400">
              <div className="card h-100 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:-translate-y-3 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#4E7B38] border-dashed group-hover:animate-[spin_10s_linear_infinite]"></div>
                  <Image 
                    src="/assets/images/team/Teacher Johana.jpg" 
                    alt="Teacher Johana"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg p-1"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-1">Teacher Johana</h4>
                <div className="inline-block px-3 py-1 bg-[#E8F5E4] text-[#4E7B38] rounded-full text-sm font-bold mb-1">Future Stars</div>
                <p className="text-sm text-gray-400 font-medium mb-4">(5-6 years)</p>
                <p className="text-gray-600 flex-grow text-sm">
                  Prepares Future Stars for grade one by focusing on pre-academic skills, critical thinking, and social development.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

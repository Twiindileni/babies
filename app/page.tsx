'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Initialize Bootstrap if needed
    if (typeof window !== 'undefined' && (window as any).bootstrap) {
      // Bootstrap is loaded
    }
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-[100px] pb-20">
        {/* Background Blobs */}
        <div className="blob-shape bg-[#4E7B38] w-96 h-96 rounded-full -top-20 -left-20"></div>
        <div className="blob-shape bg-[#FFD700] w-80 h-80 rounded-full top-40 right-10 delay-200"></div>
        <div className="blob-shape bg-[#D64545] w-72 h-72 rounded-full -bottom-10 left-1/3 delay-500"></div>
        
        <div className="container relative z-10">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 fade-in-up">
              <div className="inline-block px-5 py-2 rounded-full glass border border-[#4E7B38]/20 text-[#4E7B38] font-bold mb-6 shadow-sm">
                🌟 Welcome to the Family
              </div>
              <h1 className="display-3 fw-bold mb-4 text-[#1f2937] leading-tight">
                Where Every Child&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E]">Journey Begins</span>
              </h1>
              <p className="lead mb-8 fs-4 text-gray-600">
                Nurturing environment with love, care, and professional guidance for your little ones.
              </p>
              <div className="d-flex flex-wrap gap-4">
                <Link 
                  href="/enroll" 
                  className="btn-primary text-lg px-10 py-4"
                >
                  Enroll Your Child
                </Link>
                <Link 
                  href="/programs" 
                  className="btn-outline-primary text-lg px-10 py-4 bg-white/50 backdrop-blur-sm"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
            <div className="col-lg-6 fade-in delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4E7B38] to-[#FFD700] rounded-[3rem] transform rotate-3 scale-105 opacity-20 pulse-soft"></div>
                <Image 
                  src="/assets/images/hero-kids.png" 
                  alt="Happy Kids" 
                  width={600}
                  height={600}
                  className="img-fluid rounded-[3rem] shadow-2xl relative z-10 float"
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Floating Badges */}
                <div className="absolute -left-8 top-1/4 glass rounded-2xl p-4 shadow-xl z-20 bounce-slow delay-100 flex items-center gap-4 border border-white/50">
                  <div className="bg-gradient-to-br from-[#E8F5E4] to-white p-3 rounded-full shadow-inner text-[#4E7B38]">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Loving Care</div>
                    <div className="text-sm text-gray-500">100% Guaranteed</div>
                  </div>
                </div>
                
                <div className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4 shadow-xl z-20 bounce-slow delay-300 flex items-center gap-4 border border-white/50">
                  <div className="bg-gradient-to-br from-[#FFE8E8] to-white p-3 rounded-full shadow-inner text-[#D64545]">
                    <i className="fas fa-star text-2xl"></i>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Expert Staff</div>
                    <div className="text-sm text-gray-500">Certified Pros</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container">
          <h2 className="section-title fade-in-up">Why Parents Trust Us</h2>
          <div className="row g-5">
            <div className="col-md-4 fade-in-up delay-100">
              <div className="card h-100 text-center group">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#E8F5E4] to-white rounded-3xl shadow-inner flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <i className="fas fa-heart fa-3x text-[#4E7B38]"></i>
                </div>
                <h3 className="h4 mb-4 font-bold text-[#1f2937]">Loving Environment</h3>
                <p className="text-gray-600 leading-relaxed fs-5">
                  We create a nurturing space where your child feels safe, loved, and inspired to learn through play.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-in-up delay-200">
              <div className="card h-100 text-center group">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#FFF9C4] to-white rounded-3xl shadow-inner flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <i className="fas fa-book-reader fa-3x text-[#FFD700]"></i>
                </div>
                <h3 className="h4 mb-4 font-bold text-[#1f2937]">Educational Focus</h3>
                <p className="text-gray-600 leading-relaxed fs-5">
                  Our curriculum helps develop essential skills through engaging activities and creative learning.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-in-up delay-300">
              <div className="card h-100 text-center group">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#FFE8E8] to-white rounded-3xl shadow-inner flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <i className="fas fa-users fa-3x text-[#D64545]"></i>
                </div>
                <h3 className="h4 mb-4 font-bold text-[#1f2937]">Expert Staff</h3>
                <p className="text-gray-600 leading-relaxed fs-5">
                  Our qualified caregivers are passionate about nurturing your child&apos;s growth and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 relative">
        <div className="blob-shape bg-[#E8F5E4] w-[600px] h-[600px] rounded-full top-0 right-0 opacity-50"></div>
        <div className="blob-shape bg-[#F5F0EB] w-[400px] h-[400px] rounded-full bottom-0 left-0 opacity-50 delay-300"></div>
        <div className="container relative z-10">
          <h2 className="section-title fade-in-up">Our Early Learning Programs</h2>
          <div className="row g-5">
            <div className="col-md-6 fade-in-up delay-100">
              <div className="card h-100 border border-[#8B6E4E]/10 flex flex-col">
                <div className="d-flex align-items-center mb-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#E8F5E4] to-white flex items-center justify-center me-5 shadow-sm transform transition-transform hover:scale-110">
                    <i className="fas fa-baby fa-2x text-[#4E7B38]"></i>
                  </div>
                  <h3 className="h2 mb-0 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E]">Infant Care</h3>
                </div>
                <p className="mb-6 text-gray-600 text-xl leading-relaxed flex-grow">Nurturing care for babies aged 6 weeks to 18 months. Our infant program provides:</p>
                <ul className="list-none space-y-4 mb-8">
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#4E7B38] me-4 text-xl"></i> Individual care routines
                  </li>
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#4E7B38] me-4 text-xl"></i> Sensory activities
                  </li>
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#4E7B38] me-4 text-xl"></i> Safe exploration space
                  </li>
                </ul>
                <Link href="/programs#infant" className="btn-outline-primary inline-flex items-center justify-center gap-3 group mt-auto text-lg w-full sm:w-auto">
                  Learn More <i className="fas fa-arrow-right transition-transform group-hover:translate-x-2"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-6 fade-in-up delay-200">
              <div className="card h-100 border border-[#8B6E4E]/10 flex flex-col">
                <div className="d-flex align-items-center mb-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#FFE8E8] to-white flex items-center justify-center me-5 shadow-sm transform transition-transform hover:scale-110">
                    <i className="fas fa-child fa-2x text-[#D64545]"></i>
                  </div>
                  <h3 className="h2 mb-0 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D64545] to-[#8B6E4E]">Toddler Program</h3>
                </div>
                <p className="mb-6 text-gray-600 text-xl leading-relaxed flex-grow">Active learning for children aged 18 months to 3 years. Program includes:</p>
                <ul className="list-none space-y-4 mb-8">
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#D64545] me-4 text-xl"></i> Interactive play
                  </li>
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#D64545] me-4 text-xl"></i> Basic skill development
                  </li>
                  <li className="flex items-center text-gray-700 text-lg">
                    <i className="fas fa-check-circle text-[#D64545] me-4 text-xl"></i> Social interaction
                  </li>
                </ul>
                <Link href="/programs#toddler" className="btn-secondary inline-flex items-center justify-center gap-3 group mt-auto text-lg w-full sm:w-auto text-white">
                  Learn More <i className="fas fa-arrow-right transition-transform group-hover:translate-x-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden my-12 rounded-[3rem] mx-4 lg:mx-auto max-w-7xl glass-dark shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E] opacity-90"></div>
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 mix-blend-overlay" 
          style={{ 
            background: "url('/assets/images/toys-pattern.svg') repeat", 
            opacity: 0.15 
          }}
        ></div>
        
        {/* Animated Background Elements inside CTA */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#FFD700] rounded-full opacity-20 bounce-slow"></div>
        
        <div className="container text-center position-relative z-10 fade-in-up">
          <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium mb-8 text-sm uppercase tracking-wider">
            Enrollment Now Open
          </span>
          <h2 className="display-4 mb-6 fw-extrabold text-white drop-shadow-md">Ready to Join Our Family?</h2>
          <p className="lead mb-10 text-white/90 fs-4 max-w-3xl mx-auto font-light">
            Secure your child&apos;s spot in our nurturing daycare center today and give them the best start in life!
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <Link 
              href="/enroll" 
              className="btn font-bold text-[#4E7B38] bg-white hover:bg-gray-100 border-0 shadow-xl px-10 py-4 rounded-full text-lg transition-transform hover:-translate-y-1"
            >
              Enroll Now
            </Link>
            <Link 
              href="/contact" 
              className="btn font-bold text-white border-2 border-white/50 hover:bg-white/10 px-10 py-4 rounded-full text-lg backdrop-blur-sm transition-all hover:border-white hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

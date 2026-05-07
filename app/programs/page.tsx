'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProgramsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-[120px] pb-20">
        {/* Background Blobs */}
        <div className="blob-shape bg-[#4E7B38] w-96 h-96 rounded-full -top-20 -left-20 opacity-20"></div>
        <div className="blob-shape bg-[#FFD700] w-80 h-80 rounded-full bottom-0 right-10 delay-200 opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-block px-5 py-2 rounded-full glass border border-[#4E7B38]/20 text-[#4E7B38] font-bold mb-6 shadow-sm fade-in-up">
            <i className="fas fa-graduation-cap me-2"></i> Education & Growth
          </div>
          <h1 className="display-3 fw-bold mb-4 text-[#1f2937] leading-tight fade-in-up delay-100">
            Our <span className="text-[#4E7B38]">Programs</span>
          </h1>
          <p className="lead mb-8 fs-4 text-gray-600 max-w-2xl mx-auto fade-in-up delay-200">
            Nurturing Young Minds, Building Strong Foundations
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 relative">
        <div className="container">
          
          <div className="row g-5 mb-5">
            {/* Infants Program */}
            <div className="col-md-6 fade-in-up delay-100 flex">
              <div className="card w-full flex flex-col p-0 overflow-hidden group">
                <div className="relative h-64 overflow-hidden rounded-t-[2rem] flex-shrink-0">
                  <div className="absolute inset-0 bg-[#4E7B38]/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
                  <Image 
                    src="/assets/images/pro1.jpg" 
                    alt="Infants Program" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform">
                    <i className="fas fa-baby fa-2x text-[#4E7B38]"></i>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <h2 className="h3 font-bold text-[#1f2937] mb-3">Infants (0-12 months)</h2>
                  <p className="text-gray-600 text-lg mb-6 flex-grow">
                    Our infant program provides a nurturing and safe environment where babies can explore and develop at their own pace.
                  </p>
                  <ul className="list-none space-y-3 mb-8">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Sensory development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Motor skills development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Individual care routines
                    </li>
                  </ul>
                  <Link href="/enroll" className="btn-primary w-full text-center block text-white mt-auto">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Toddlers Program */}
            <div className="col-md-6 fade-in-up delay-200 flex">
              <div className="card w-full flex flex-col p-0 overflow-hidden group">
                <div className="relative h-64 overflow-hidden rounded-t-[2rem] flex-shrink-0">
                  <div className="absolute inset-0 bg-[#D64545]/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
                  <Image 
                    src="/assets/images/pro2.jpg" 
                    alt="Toddlers Program" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform">
                    <i className="fas fa-child fa-2x text-[#D64545]"></i>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <h2 className="h3 font-bold text-[#1f2937] mb-3">Toddlers (1-3 years)</h2>
                  <p className="text-gray-600 text-lg mb-6 flex-grow">
                    Our toddler program encourages exploration and independence through engaging activities.
                  </p>
                  <ul className="list-none space-y-3 mb-8">
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Interactive play
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Basic language development
                    </li>
                    <li className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3 text-lg"></i> Social skills building
                    </li>
                  </ul>
                  <Link href="/enroll" className="btn-primary w-full text-center block text-white mt-auto">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Preschool Program - Full Width */}
          <div className="row mt-10">
            <div className="col-12 fade-in-up delay-300">
              <div className="card p-0 overflow-hidden group border-0 shadow-2xl bg-white flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full flex-shrink-0">
                  <div className="absolute inset-0 bg-[#8B6E4E]/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
                  <Image 
                    src="/assets/images/pro3.jpg" 
                    alt="Preschool Program" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform">
                    <i className="fas fa-school fa-2x text-[#8B6E4E]"></i>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
                  <h2 className="display-6 font-extrabold text-[#1f2937] mb-4">Preschool (3-5 yrs)</h2>
                  <p className="text-gray-600 text-xl mb-6 leading-relaxed">
                    Preparing your child for kindergarten through comprehensive early education.
                  </p>
                  <ul className="list-none space-y-3 mb-8">
                    <li className="flex items-center text-gray-700 text-lg">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3"></i> Early literacy & numeracy
                    </li>
                    <li className="flex items-center text-gray-700 text-lg">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3"></i> Science and discovery
                    </li>
                    <li className="flex items-center text-gray-700 text-lg">
                      <i className="fas fa-check-circle text-[#4E7B38] me-3"></i> Art and music
                    </li>
                  </ul>
                  <Link href="/enroll" className="btn-primary inline-block text-center w-full sm:w-auto px-10 text-white mt-auto">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Schedule Table */}
      <section className="py-24 relative bg-gradient-to-b from-white to-[#F5F0EB]">
        <div className="container relative z-10">
          <h2 className="section-title fade-in-up">Weekly Meal Schedule</h2>
          <p className="text-center text-gray-600 fs-5 max-w-3xl mx-auto mb-12 fade-in-up delay-100">
            We provide nutritious meals and snacks for your child throughout the day. Here&apos;s our weekly meal schedule to help you plan accordingly.
          </p>
          
          <div className="card p-0 shadow-2xl fade-in-up delay-200 overflow-hidden bg-white/95 backdrop-blur-xl border border-white">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200 mb-0 align-middle text-center">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E]">
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white text-left">Time</th>
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white">Monday</th>
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white">Tuesday</th>
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white">Wednesday</th>
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white">Thursday</th>
                      <th className="py-5 px-6 font-bold uppercase tracking-wider text-sm text-white">Friday</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                    <tr className="bg-[#E8F5E4]/80 hover:bg-[#E8F5E4] transition-colors">
                      <td className="py-5 px-6 font-extrabold text-[#4E7B38] text-left border-r border-[#4E7B38]/10 whitespace-nowrap">Breakfast</td>
                      <td className="py-5 px-6 whitespace-nowrap">Soft porridge</td>
                      <td className="py-5 px-6 whitespace-nowrap">Jungle oats</td>
                      <td className="py-5 px-6 whitespace-nowrap">Soft porridge</td>
                      <td className="py-5 px-6 whitespace-nowrap">Jungle oats</td>
                      <td className="py-5 px-6 whitespace-nowrap">Soft porridge</td>
                    </tr>
                    <tr className="bg-[#FFE8E8]/80 hover:bg-[#FFE8E8] transition-colors">
                      <td className="py-5 px-6 font-extrabold text-[#D64545] text-left border-r border-[#D64545]/10 whitespace-nowrap">Tea break</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own food</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own food</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own food</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own food</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own food</td>
                    </tr>
                    <tr className="bg-[#F5F0EB] hover:bg-[#F5F0EB]/80 transition-colors">
                      <td className="py-5 px-6 font-extrabold text-[#8B6E4E] text-left border-r border-[#8B6E4E]/10 whitespace-nowrap">Lunch</td>
                      <td className="py-5 px-6 whitespace-nowrap">Meat, rice, veggies</td>
                      <td className="py-5 px-6 whitespace-nowrap">Pap, chicken</td>
                      <td className="py-5 px-6 whitespace-nowrap">Mince, pasta</td>
                      <td className="py-5 px-6 whitespace-nowrap">Boerewors, rice</td>
                      <td className="py-5 px-6 whitespace-nowrap">Meat, pasta</td>
                    </tr>
                    <tr className="bg-[#FFF9C4]/80 hover:bg-[#FFF9C4] transition-colors">
                      <td className="py-5 px-6 font-extrabold text-[#D4AF37] text-left border-r border-[#D4AF37]/20 whitespace-nowrap">Snack</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own snacks</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own snacks</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own snacks</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own snacks</td>
                      <td className="py-5 px-6 text-gray-500 italic whitespace-nowrap">Own snacks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-6 lg:hidden font-medium">
            <i className="fas fa-arrows-alt-h me-2 text-[#4E7B38]"></i> Swipe horizontally to view full schedule
          </div>
        </div>
      </section>
    </div>
  )
}

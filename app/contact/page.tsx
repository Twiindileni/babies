'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'Unread'
        }])

      if (error) throw error

      toast.success('Thank you for your message. We will get back to you soon!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error: any) {
      toast.error(error.message || 'Error sending message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-hidden min-h-screen bg-[#F5F0EB]/30">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-[120px] pb-10">
        {/* Background Blobs */}
        <div className="blob-shape bg-[#4E7B38] w-96 h-96 rounded-full -top-20 -left-20 opacity-20"></div>
        <div className="blob-shape bg-[#D64545] w-80 h-80 rounded-full bottom-0 right-10 delay-200 opacity-20"></div>
        
        <div className="container relative z-10 text-center">
          <div className="inline-block px-5 py-2 rounded-full glass border border-[#4E7B38]/20 text-[#4E7B38] font-bold mb-6 shadow-sm fade-in-up">
            <i className="fas fa-phone-alt me-2"></i> Get In Touch
          </div>
          <h1 className="display-3 fw-bold mb-4 text-[#1f2937] leading-tight fade-in-up delay-100">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E]">Us</span>
          </h1>
          <p className="lead mb-8 fs-4 text-gray-600 max-w-2xl mx-auto fade-in-up delay-200">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 relative z-20 -mt-10">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form Container */}
            <div className="col-lg-7 fade-in-up delay-100">
              <div className="card p-8 md:p-12 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-white shadow-2xl h-full">
                <h2 className="text-3xl font-extrabold text-[#1f2937] mb-2">Send a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form below to reach our team directly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#4E7B38] focus:border-[#4E7B38] block p-3.5 transition-all outline-none"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#4E7B38] focus:border-[#4E7B38] block p-3.5 transition-all outline-none"
                        id="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#4E7B38] focus:border-[#4E7B38] block p-3.5 transition-all outline-none"
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#4E7B38] focus:border-[#4E7B38] block p-3.5 transition-all outline-none resize-none"
                      id="message"
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-primary w-full py-4 text-lg mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group" 
                    disabled={loading}
                  >
                    {loading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending Message...</>
                    ) : (
                      <>Send Message <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i></>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info Sidebar */}
            <div className="col-lg-5 fade-in-up delay-200">
              <div className="flex flex-col gap-6 h-full">
                
                <div className="card p-6 rounded-3xl bg-white border border-[#4E7B38]/20 shadow-lg group hover:-translate-y-1 transition-transform">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                      <p className="text-gray-600 leading-relaxed">
                        47 Pasteur Street<br />
                        Windhoek West, Namibia
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6 rounded-3xl bg-white border border-[#D64545]/20 shadow-lg group hover:-translate-y-1 transition-transform">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#FFE8E8] text-[#D64545] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <i className="fas fa-phone-alt text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Phone & WhatsApp</h3>
                      <p className="text-gray-600 leading-relaxed">
                        <a href="tel:+264816737599" className="hover:text-[#D64545] font-semibold text-lg transition-colors">+264 81 673 7599</a><br />
                        <span className="text-sm text-gray-400">Available on WhatsApp</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6 rounded-3xl bg-white border border-[#FFD700]/30 shadow-lg group hover:-translate-y-1 transition-transform">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#FFF9C4] text-[#D4AF37] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
                      <p className="text-gray-600 leading-relaxed break-all">
                        <a href="mailto:babiesandtodds22@gmail.com" className="hover:text-[#D4AF37] transition-colors">babiesandtodds22@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6 rounded-3xl bg-white border border-[#8B6E4E]/20 shadow-lg group hover:-translate-y-1 transition-transform flex-grow">
                  <div className="flex items-start gap-5 h-full">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#F5F0EB] text-[#8B6E4E] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Operating Hours</h3>
                      <p className="text-gray-600 leading-relaxed mb-1">
                        <span className="font-semibold text-gray-800">Mon - Fri:</span> 7:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-800">Sat - Sun:</span> Closed
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative">
        <div className="container fade-in-up delay-300">
          <div className="text-center mb-10">
            <h2 className="display-6 font-extrabold text-[#1f2937]">Find Us on the <span className="text-[#4E7B38]">Map</span></h2>
          </div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(78,123,56,0.15)] border-4 border-white h-[500px] bg-gray-100 group">
            <div className="absolute inset-0 bg-[#4E7B38]/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59874.55566880978!2d17.027746582356574!3d-22.570006591620914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c0b1b5cb30c01ed%3A0xe4b84940cc445d3b!2sWindhoek%2C%20Namibia!5e0!3m2!1sen!2sna!4v1710271144316!5m2!1sen!2sna"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 filter grayscale-[20%] contrast-125 group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

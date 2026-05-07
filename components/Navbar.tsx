'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createSupabaseClient()
        // Check if Supabase is properly configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url_here') {
          // Supabase not configured, skip auth check
          return
        }
        
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          // Silently fail if auth is not configured
          return
        }
        setUser(user)
      } catch (error) {
        // Silently fail if Supabase is not configured
        console.debug('Supabase auth check skipped:', error)
      }
    }
    getUser()

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
        const supabase = createSupabaseClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        return () => {
          if (subscription) {
            subscription.unsubscribe()
          }
        }
      }
    } catch (error) {
      // Silently fail if Supabase is not configured
      console.debug('Supabase auth subscription skipped')
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      const supabase = createSupabaseClient()
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass" style={{ zIndex: 1030, padding: '0.8rem 0' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-3 group" href="/">
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 transform transition-transform group-hover:scale-105 group-hover:shadow-md">
            <Image 
              src="/assets/images/logo.jpg" 
              alt="Babies&Todd's Logo" 
              width={45} 
              height={45}
              className="rounded-xl"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E] hidden sm:block">
            Babies & Todd&apos;s
          </span>
        </Link>
        <button 
          className="navbar-toggler border-0 shadow-none focus:ring-2 focus:ring-[#4E7B38] bg-white/50 backdrop-blur-sm rounded-xl p-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse bg-white/95 lg:bg-transparent mt-3 lg:mt-0 p-4 lg:p-0 rounded-2xl shadow-xl lg:shadow-none backdrop-blur-xl lg:backdrop-blur-none border lg:border-0 border-gray-100/50" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link 
                className={`nav-link font-medium px-4 py-2 rounded-full transition-all ${isActive('/') ? 'bg-[#E8F5E4] text-[#4E7B38] font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#4E7B38]'}`} 
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link font-medium px-4 py-2 rounded-full transition-all ${isActive('/programs') ? 'bg-[#E8F5E4] text-[#4E7B38] font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#4E7B38]'}`} 
                href="/programs"
              >
                Programs
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link font-medium px-4 py-2 rounded-full transition-all ${isActive('/games') ? 'bg-[#E8F5E4] text-[#4E7B38] font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#4E7B38]'}`} 
                href="/games"
              >
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link font-medium px-4 py-2 rounded-full transition-all ${isActive('/about') ? 'bg-[#E8F5E4] text-[#4E7B38] font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#4E7B38]'}`} 
                href="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link font-medium px-4 py-2 rounded-full transition-all ${isActive('/contact') ? 'bg-[#E8F5E4] text-[#4E7B38] font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#4E7B38]'}`} 
                href="/contact"
              >
                Contact
              </Link>
            </li>
            
            <div className="border-s border-gray-300 h-6 mx-2 hidden lg:block"></div>
            
            {user ? (
              <li className="nav-item dropdown ms-lg-2">
                <a 
                  className="nav-link dropdown-toggle font-medium px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="w-6 h-6 rounded-full bg-[#4E7B38] text-white flex items-center justify-center text-xs">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {user.email?.split('@')[0] || 'User'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-xl rounded-2xl mt-2 p-2 w-48">
                  <li>
                    <Link className="dropdown-item rounded-xl py-2 px-3 text-gray-700 hover:bg-[#E8F5E4] hover:text-[#4E7B38] transition-colors flex items-center gap-2" href="/parent/dashboard">
                      <i className="fas fa-home w-4 text-center"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item rounded-xl py-2 px-3 text-gray-700 hover:bg-[#E8F5E4] hover:text-[#4E7B38] transition-colors flex items-center gap-2" href="/admin/dashboard">
                      <i className="fas fa-cog w-4 text-center"></i> Admin
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider my-2" /></li>
                  <li>
                    <a 
                      className="dropdown-item rounded-xl py-2 px-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2" 
                      href="#" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt w-4 text-center"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link 
                    className="btn font-medium px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-[#4E7B38] to-[#8B6E4E] hover:shadow-[0_10px_20px_rgba(78,123,56,0.2)] hover:-translate-y-1 transition-all border-0 w-full lg:w-auto text-center flex items-center justify-center gap-2"
                    href="/login"
                  >
                    <i className="fas fa-user-circle"></i> Parents Portal
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

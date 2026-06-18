"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import logo from "../public/logo.png"
import { ArrowUpRight, ChevronDown, Menu, X, Code, Palette, Settings, Layers } from "lucide-react"
import { animate } from "animejs"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const menuRef = useRef(null)
  const megaMenuRef = useRef(null)

  useEffect(() => {
    if (isOpen && menuRef.current) {
      animate(menuRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (isMegaOpen && megaMenuRef.current) {
      animate(megaMenuRef.current, {
        translateY: [15, 0],
        opacity: [0, 1],
        duration: 250,
        easing: 'easeOutQuad'
      })
    }
  }, [isMegaOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav data-aos="fade-down" className="w-full sticky top-5 z-[120] bg-transparent font-poppins px-6 md:px-0">
      <div className="max-w-7xl mx-auto flex justify-between md:justify-evenly items-center">
        <div className="flex items-center gap-4">
          <Image src={logo} width={10} height={50} alt="logo" />
          <p className="font-pixelify text-white text-2xl">SabalongWeb</p>
        </div>

        <div className="hidden md:flex items-center text-white gap-6">
          <a className="relative group" href="/">
            Beranda 
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <div 
            className="relative py-3 flex items-center cursor-pointer"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <button className="flex items-center gap-2 group text-white focus:outline-none pointer-events-none">
              Produk
              <ChevronDown className={`transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : ''}`} size={18}/>
            </button>

            {isMegaOpen && (
              <div 
                ref={megaMenuRef}
                className="absolute left-1/2 -translate-x-1/2 top-full w-[520px] bg-[#FFDBFD] border-2 border-primary p-5 grid grid-cols-2 gap-4 z-[150] rounded-none pointer-events-auto"
              >
                <a href="#produk" className="flex gap-3 p-3 border border-transparent hover:border-primary/20 hover:bg-black/5 transition-all group/item">
                  <div className="text-primary bg-primary/10 p-2 h-fit border border-primary/20">
                    <Code size={20} />
                  </div>
                  <div className="text-primary">
                    <h4 className="text-sm font-semibold flex items-center gap-1">
                      Jasa Pembuatan Website 
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">Landing page, company profile, & toko online.</p>
                  </div>
                </a>

                <a href="#produk" className="flex gap-3 p-3 border border-transparent hover:border-primary/20 hover:bg-black/5 transition-all group/item">
                  <div className="text-primary bg-primary/10 p-2 h-fit border border-primary/20">
                    <Palette size={20} />
                  </div>
                  <div className="text-primary">
                    <h4 className="text-sm font-semibold flex items-center gap-1">
                      UI/UX Design
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">Desain antarmuka modern & prototipe interaktif.</p>
                  </div>
                </a>

                <a href="#produk" className="flex gap-3 p-3 border border-transparent hover:border-primary/20 hover:bg-black/5 transition-all group/item">
                  <div className="text-primary bg-primary/10 p-2 h-fit border border-primary/20">
                    <Settings size={20} />
                  </div>
                  <div className="text-primary">
                    <h4 className="text-sm font-semibold flex items-center gap-1">
                      Maintenance & Support
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">Pembaruan berkala, backup data, & optimasi web.</p>
                  </div>
                </a>

                <a href="#produk" className="flex gap-3 p-3 border border-transparent hover:border-primary/20 hover:bg-black/5 transition-all group/item">
                  <div className="text-primary bg-primary/10 p-2 h-fit border border-primary/20">
                    <Layers size={20} />
                  </div>
                  <div className="text-primary">
                    <h4 className="text-sm font-semibold flex items-center gap-1">
                      Produk Lainnya
                      <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs opacity-80 mt-1">E-Commerce khusus, sistem informasi, & kustomisasi.</p>
                  </div>
                </a>
              </div>
            )}
          </div>
          
          <a className="relative group" href="#layanan">Layanan <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
          <a className="relative group" href="#kontak">Kontak <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
          <a className="relative group" href="#portfolio">Portfolio <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
          <a className="relative group" href="/blog">Blog <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
        </div>

        <div className="hidden md:block">
          <a href="https://wa.me/6283824425487" target="_blank" rel="noopener noreferrer" className="px-2 py-2 bg-[#FFDBFD] group border border-transparent hover:border-[#FFDBFD] hover:bg-transparent transition-all inline-flex items-center gap-2 text-primary hover:text-[#FFDBFD]">
            Mulai Konsultasi <ArrowUpRight className="group-hover:mr-2 transition-all"/>
          </a>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div ref={menuRef} className="md:hidden absolute top-16 left-0 w-full bg-primary/95 backdrop-blur-md flex flex-col items-center gap-6 py-8 border-b border-white/10">
          <a onClick={toggleMenu} className="text-white text-lg" href="#Home">Beranda</a>
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-[#FFDBFD] text-sm tracking-wider uppercase font-semibold">Produk kami</p>
            <a onClick={toggleMenu} className="text-white text-base" href="#produk">Jasa Pembuatan Website</a>
            <a onClick={toggleMenu} className="text-white text-base" href="#produk">UI/UX Design</a>
            <a onClick={toggleMenu} className="text-white text-base" href="#produk">Maintenance & Support</a>
            <a onClick={toggleMenu} className="text-white text-base" href="#produk">Produk Lainnya</a>
          </div>
          <a onClick={toggleMenu} className="text-white text-lg" href="#layanan">Layanan</a>
          <a onClick={toggleMenu} className="text-white text-lg" href="#kontak">Kontak</a>
          <a onClick={toggleMenu} className="text-white text-lg" href="#portfolio">Portfolio</a>
          <a onClick={toggleMenu} className="text-white text-lg" href="/blog">Blog</a>
          
          <a onClick={toggleMenu} href="https://wa.me/6283824425487" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#FFDBFD] w-4/5 max-w-[250px] inline-flex justify-center items-center gap-2 text-primary">
            Mulai Konsultasi <ArrowUpRight size={18}/>
          </a>
        </div>
      )}
    </nav>
  )
}
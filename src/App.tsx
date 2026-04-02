import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, X, ChevronRight, Activity, Heart, Shield, Users, 
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, 
  Star, Leaf, Calendar, CheckCircle, ArrowRight
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.pexels.com/photos/19388383/pexels-photo-19388383.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.pexels.com/photos/8219057/pexels-photo-8219057.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.pexels.com/photos/14797760/pexels-photo-14797760.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.pexels.com/photos/6111591/pexels-photo-6111591.jpeg?auto=compress&cs=tinysrgb&w=2000"
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="https://i.ibb.co/8gYFyMdJ/logo.jpg" 
                alt="Fitrevive Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-lg bg-white border-2 border-white/20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                F
              </div>
              <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-secondary' : 'text-white drop-shadow-md'}`}>
                Fitrevive
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${isScrolled ? 'text-gray-600' : 'text-white drop-shadow-sm'}`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#book"
                className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-white px-5 py-3 rounded-xl text-center font-medium mt-4"
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-secondary">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Physiotherapy session ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            <span className="text-cyan-400">Fitrevive</span> Physiotherapy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 mb-10 font-light drop-shadow-md"
          >
            Your partner in recovery
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#team"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              OUR TEAM <ChevronRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-24 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 font-semibold text-sm tracking-widest mb-6 uppercase">
                Discover Fitrevive
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Dedicated to restoring your <span className="text-cyan-400">health & mobility</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-100 leading-relaxed font-light mb-10">
                <p>
                  At Fitrevive Physiotherapy, we believe that movement is medicine. Our dedicated team of professionals is committed to helping you overcome pain, recover from injuries, and achieve your optimal physical potential.
                </p>
                <p>
                  With years of clinical experience and a passion for healing, we utilize evidence-based practices tailored to your unique needs. We don't just treat symptoms; we identify and address the root cause of your discomfort.
                </p>
                <p>
                  Whether you're an elite athlete looking to return to sport, or simply wanting to enjoy daily activities without pain, we are here to guide you every step of the way on your journey to wellness.
                </p>
              </div>
              
              <div className="flex items-center gap-8 pt-6 border-t border-white/20">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-cyan-400">1-on-1</span>
                  <span className="text-sm text-gray-300 uppercase tracking-wider mt-1 font-medium">Personalized Care</span>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-cyan-400">Modern</span>
                  <span className="text-sm text-gray-300 uppercase tracking-wider mt-1 font-medium">Facility & Equipment</span>
                </div>
              </div>
            </motion.div>

            {/* Image Composition */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transform transition-transform hover:scale-[1.02] duration-500">
                <img 
                  src="https://images.pexels.com/photos/20860621/pexels-photo-20860621.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                  alt="Physiotherapy treatment" 
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white text-secondary p-5 md:p-6 rounded-2xl shadow-xl border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-lg md:text-xl">Expert Care</p>
                    <p className="text-gray-500 text-sm">Tailored to you</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 md:mt-32">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-transform duration-300 shadow-xl group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-secondary transition-colors">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-200 leading-relaxed">
                To empower individuals to reclaim their health and mobility through compassionate, expert physiotherapy care.
              </p>
            </motion.div>

            {/* What We Offer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-transform duration-300 shadow-xl group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-secondary transition-colors">
                <Activity size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Personalized Physiotherapy Plans</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Advanced Rehabilitation Techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Holistic Wellness Approach</span>
                </li>
              </ul>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-transform duration-300 shadow-xl group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-secondary transition-colors">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Experienced physiotherapists</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Patient-centered care</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span>Focus on long-term recovery</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 OUR TEAM SECTION */}
      <section id="team" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">Meet Our Experts</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Our team of dedicated professionals is here to provide you with the best care and support on your journey to recovery.
            </p>
            <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Dr. Trishnamoni Haloi */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/5] shadow-lg">
                <img 
                  src="https://i.ibb.co/R16qxJ4/Gemini-Generated-Image-wnf0rewnf0rewnf0.jpg" 
                  alt="Dr. Trishnamoni Haloi" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-secondary mb-1">Dr. Trishnamoni Haloi (P.T.)</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Founder & CEO</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Activity size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Heart size={18} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dr. Dorothy Mazumdar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/5] shadow-lg">
                <img 
                  src="https://i.ibb.co/LzZwM0Tc/Gemini-Generated-Image-722cds722cds722c.png" 
                  alt="Dr. Dorothy Mazumdar" 
                  className="w-full h-full object-cover scale-[1.08] transition-transform duration-500 group-hover:scale-[1.15]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-secondary mb-1">Dr. Dorothy Mazumdar (P.T.)</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Consultant Physiotherapist</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Activity size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Heart size={18} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ms. Sumiya anjum */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/5] shadow-lg">
                <img 
                  src="https://i.ibb.co/8DypZk06/Gemini-Generated-Image-713agx713agx713a.png" 
                  alt="Ms. Sumiya anjum" 
                  className="w-full h-full object-cover scale-[1.08] transition-transform duration-500 group-hover:scale-[1.15]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-secondary mb-1">Ms. Sumiya anjum</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">Assistant Physiotherapist cum Clinic Administrator</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Shield size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <Activity size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="services" className="py-0">
        <div className="text-center py-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {[
          {
            title: "Physiotherapy Consultation",
            desc: "Comprehensive assessment to diagnose your condition and create a tailored treatment plan for your specific needs.",
            img: "https://images.pexels.com/photos/20860586/pexels-photo-20860586.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#8B7355]/10", // Brown tone
            textBg: "bg-[#8B7355]"
          },
          {
            title: "Pain Management Therapy",
            desc: "Targeted interventions using manual therapy, modalities, and exercises to alleviate acute and chronic pain effectively.",
            img: "https://images.pexels.com/photos/20860603/pexels-photo-20860603.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#556B2F]/10", // Olive tone
            textBg: "bg-[#556B2F]"
          },
          {
            title: "Orthopedic Rehabilitation",
            desc: "Specialized care for musculoskeletal injuries, joint problems, and bone conditions to restore mobility and strength.",
            img: "https://images.pexels.com/photos/8376217/pexels-photo-8376217.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#0F6C8D]/10", // Teal tone
            textBg: "bg-[#0F6C8D]"
          },
          {
            title: "Neurological Rehabilitation",
            desc: "Dedicated therapy programs for stroke, Parkinson's, MS, and other neurological conditions to improve function and independence.",
            img: "https://images.pexels.com/photos/7446605/pexels-photo-7446605.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#483D8B]/10", // Purple tone
            textBg: "bg-[#483D8B]"
          },
          {
            title: "Sports Injury Rehabilitation",
            desc: "Intensive recovery protocols designed for athletes to safely return to peak performance after sports-related injuries.",
            img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#2F4F4F]/10", // Dark green tone
            textBg: "bg-[#2F4F4F]"
          },
          {
            title: "Post-Surgical Rehabilitation",
            desc: "Guided recovery following orthopedic surgeries to ensure proper healing, regain range of motion, and rebuild strength.",
            img: "https://images.pexels.com/photos/8460413/pexels-photo-8460413.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#8B7355]/10", // Brown tone
            textBg: "bg-[#8B7355]"
          },
          {
            title: "Pediatric Physiotherapy",
            desc: "Gentle and engaging therapy for children to address developmental delays, injuries, and congenital conditions.",
            img: "https://images.pexels.com/photos/8460035/pexels-photo-8460035.jpeg?auto=compress&cs=tinysrgb&w=1000",
            bg: "bg-[#0F6C8D]/10", // Teal tone
            textBg: "bg-[#0F6C8D]"
          }
        ].map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} ${service.bg} items-center`}
          >
            <div className="w-full md:w-1/2 p-8 md:p-16">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <div className="max-w-md mx-auto md:mx-0">
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-gray-900`}>{service.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.desc}</p>
                <button className={`flex items-center gap-2 text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 ${service.textBg}`}>
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 5. WHY CHOOSE US (VISUAL SECTION) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="border-2 border-gray-100 rounded-3xl p-10 shadow-sm relative">
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-accent/10 rounded-full z-0"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Why Choose Fitrevive?</h2>
                  <div className="space-y-6">
                    {[
                      { title: "Certified physiotherapists", icon: <Shield className="text-primary" size={24} /> },
                      { title: "Modern equipment", icon: <Activity className="text-primary" size={24} /> },
                      { title: "Comfortable clinic", icon: <Heart className="text-primary" size={24} /> },
                      { title: "Proven results", icon: <CheckCircle className="text-primary" size={24} /> }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-lg font-medium text-gray-800">{item.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                <video 
                  src="https://www.pexels.com/video/30352918/download/" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="rounded-2xl w-full h-64 object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Equipment" 
                  className="rounded-2xl w-full h-64 object-cover shadow-md mt-8"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Therapy" 
                  className="rounded-2xl w-full h-48 object-cover shadow-md col-span-2"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL SECTION */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-secondary to-[#152a42] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16"
          >
            Client Testimonials
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                name: "Sarah Jenkins",
                text: "The team at Fitrevive completely cured my chronic back pain. I can finally play with my kids again without wincing.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Michael Chen",
                text: "Post-surgery rehab was tough, but my physiotherapist was incredibly patient and motivating. Highly recommended!",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Emma Thompson",
                text: "Very professional clinic with modern equipment. They explained my injury clearly and gave me great exercises.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "David Rodriguez",
                text: "As an amateur runner, their sports injury rehab got me back on the track faster than I expected. Great service.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-colors"
              >
                <img 
                  src={testimonial.img} 
                  alt={testimonial.name} 
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary/50"
                  referrerPolicy="no-referrer"
                />
                <div className="flex gap-1 mb-4 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-gray-300 text-sm italic mb-6 flex-grow">"{testimonial.text}"</p>
                <h5 className="font-semibold text-white">{testimonial.name}</h5>
              </motion.div>
            ))}
          </div>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Please Share Your Feedback <ChevronRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* 7. GET INVOLVED SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Get Involved</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Collaborate",
                text: "Partner with us to bring better healthcare solutions to the community.",
                icon: <Users size={32} className="text-primary" />,
                btn: "Partner With Us"
              },
              {
                title: "Volunteer",
                text: "Join our community outreach programs and help those in need of care.",
                icon: <Heart size={32} className="text-primary" />,
                btn: "Join Now"
              },
              {
                title: "Spread the word",
                text: "Share our mission and help others discover the benefits of physiotherapy.",
                icon: <Activity size={32} className="text-primary" />,
                btn: "Share"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow group"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-8">{item.text}</p>
                <button className="text-primary font-semibold border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
                  {item.btn}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOOK APPOINTMENT SECTION */}
      <section id="book" className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Clinic background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Take the first step towards a pain-free life
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-lg font-medium">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle size={20} /> Flexible timings
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle size={20} /> Expert guidance
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle size={20} /> Easy access
            </div>
          </div>
          
          <button className="bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-2">
            BOOK NOW <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-3/5"
            >
              <h2 className="text-3xl font-bold text-secondary mb-8">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50" placeholder="john@example.com" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone (Optional)</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50" placeholder="+91 00000 00000" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="button" className="bg-primary hover:bg-accent text-white px-8 py-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg w-full md:w-auto">
                  Submit Message
                </button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-2/5"
            >
              <div className="bg-gray-50 p-10 rounded-3xl h-full border border-gray-100">
                <h2 className="text-3xl font-bold text-secondary mb-8">Contact Info</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600">Bangaon, Nalbari<br/>Assam, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">8473809386</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">fitrevive.org@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Facebook size={20} />
                    </a>
                    <a href="https://www.instagram.com/fitrevive_physiotherapy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-secondary pt-20 pb-10 text-white border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/8gYFyMdJ/logo.jpg" 
                  alt="Fitrevive Logo" 
                  className="w-12 h-12 rounded-full object-cover shadow-lg bg-white border-2 border-white/20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  F
                </div>
                <span className="font-bold text-2xl text-white tracking-tight">
                  Fitrevive
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Dedicated to helping you overcome pain, recover from injuries, and achieve your optimal physical potential through expert physiotherapy care.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/fitrevive_physiotherapy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight size={14} className="text-primary" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  "Physiotherapy Consultation",
                  "Pain Management Therapy",
                  "Orthopedic Rehabilitation",
                  "Neurological Rehabilitation",
                  "Sports Injury Rehab",
                  "Post-Surgical Rehab"
                ].map((service, idx) => (
                  <li key={idx}>
                    <a href="#services" className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight size={14} className="text-primary" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Bangaon, Nalbari<br/>Assam, India</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>8473809386</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>fitrevive.org@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Calendar size={18} className="text-primary shrink-0" />
                  <span>Mon - Sun (10:00 AM - 7:00 PM)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Fitrevive Physiotherapy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

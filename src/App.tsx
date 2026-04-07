import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronLeft, ChevronRight, Activity, Heart, Shield, Users, 
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, 
  Star, Leaf, Calendar, CheckCircle, ArrowRight, MessageCircle,
  Building, Award, LogIn, Settings, Eye, ZoomIn, Maximize2
} from 'lucide-react';
import AppointmentForm from './components/AppointmentForm';
import AdminDashboard from './components/AdminDashboard';
import LegalModal from './components/LegalModal';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms'>('privacy');
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const galleryItems = [
    { url: "/exterior.jpeg", category: "Clinic" },
    { url: "/inog.jpeg", category: "Event" },
    { url: "/interior3.JPG", category: "Equipment" },
    { url: "/inog2.jpeg", category: "Event" },
    { url: "/interiora.jpeg", category: "Recovery" },
    { url: "/inog3.jpeg", category: "Event" },
    { url: "/team.jpeg", category: "Clinic" },
    { url: "/inog4.jpeg", category: "Clinic" },
    { url: "/gust.jpeg", category: "Clinic" },
    { url: "/image.jpeg", category: "Clinic" },
    { url: "/interior.jpeg", category: "Equipment" },
    { url: "/me.jpeg", category: "Clinic" },
    { url: "/me2.jpeg", category: "Clinic" },
  ];

  const filters = ["All", "Treatment", "Clinic", "Equipment", "Event", "Recovery"];

  const filteredGallery = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    if (filteredGallery.length === 0) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % filteredGallery.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [filteredGallery.length]);

  const ADMIN_EMAIL = "fitrevive.org@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    if (user && user.email === ADMIN_EMAIL) {
      setIsAdminView(true);
      return;
    }

    setIsLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === ADMIN_EMAIL) {
        setIsAdminView(true);
      } else {
        alert("Access Denied: You are not authorized to access the admin dashboard.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert(`Domain not authorized.\n\nPlease go to Firebase Console -> Authentication -> Settings -> Authorized Domains and add exactly this text:\n\n${window.location.hostname}`);
      } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        alert("Login failed: " + error.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const testimonials = [
    {
      name: "Bikash Sarma",
      text: "The team at FitRevive completely cured my chronic back pain. I can finally play with my kids again without wincing.",
      img: "/test-1.jpg"
    },
    {
      name: "Rimpi Das",
      text: "Post-surgery rehab was tough, but my physiotherapist was incredibly patient and motivating. Highly recommended!",
      img: "/test-2.jpg"
    },
    {
      name: "Pallabi Kalita",
      text: "Very professional clinic with modern equipment. They explained my injury clearly and gave me great exercises.",
      img: "/test-3.jpg"
    }
  ];

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);
  const heroImages = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg",
    "/hero-4.jpg",
    "/hero-5.jpg"
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden w-full max-w-[100vw]">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="https://fit-images.vercel.app/logo-2.jpg" 
                alt="FitRevive Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-lg bg-white border-2 border-white/20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                F
              </div>
              <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-secondary' : 'text-white drop-shadow-md'}`}>
                FitRevive
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm xl:text-base font-medium transition-colors hover:text-accent ${isScrolled ? 'text-gray-600' : 'text-white drop-shadow-sm'}`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                onClick={() => setIsFormOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-accent text-white px-4 xl:px-6 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book Now
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center z-[60]">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative group w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-slate-100/80 backdrop-blur-md' : 'bg-white/10 backdrop-blur-sm'}`}
                aria-label="Toggle Menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-center items-center gap-1.5 focus:outline-none">
                  <motion.span 
                    animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className={`w-6 h-0.5 rounded-full transition-colors ${isScrolled || mobileMenuOpen ? 'bg-secondary' : 'bg-white'}`}
                  />
                  <motion.span 
                    animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    className={`w-6 h-0.5 rounded-full transition-colors ${isScrolled || mobileMenuOpen ? 'bg-secondary' : 'bg-white'}`}
                  />
                  <motion.span 
                    animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className={`w-6 h-0.5 rounded-full transition-colors ${isScrolled || mobileMenuOpen ? 'bg-secondary' : 'bg-white'}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-white/98 backdrop-blur-2xl flex flex-col p-8 lg:hidden overflow-y-auto overflow-x-hidden shadow-2xl border-l border-slate-100"
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

              <div className="flex flex-col items-start justify-center space-y-8 w-full flex-grow mt-12">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group relative text-3xl md:text-4xl font-display font-bold text-secondary hover:text-primary transition-all duration-300 text-left w-full block"
                  >
                    <span className="relative z-10">{link.name}</span>
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.08 }}
                  className="pt-8 w-full flex flex-col items-start"
                >
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsFormOpen(true);
                    }}
                    className="w-full max-w-xs bg-primary text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/30 active:scale-95 transition-transform mb-4"
                  >
                    Book Appointment
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAdminLogin();
                    }}
                    disabled={isLoggingIn}
                    className="w-full max-w-xs bg-secondary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <Settings size={20} className={isLoggingIn ? 'animate-spin' : ''} />
                    {isLoggingIn ? 'Logging in...' : 'Admin Portal'}
                  </button>
                </motion.div>
              </div>

              {/* Mobile Menu Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full flex flex-col items-center gap-6 pb-8"
              >
                <div className="h-px w-12 bg-slate-200"></div>
                <div className="flex gap-6 justify-start">
                  {[
                    { icon: <Facebook size={24} />, href: "https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" },
                    { icon: <Instagram size={24} />, href: "https://www.instagram.com/fitrevive_physiotherapy?igsh=NW5kNWUwbWVrdzk3&utm_source=qr" },
                    { icon: <Twitter size={24} />, href: "#" }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="text-slate-400 text-sm font-medium tracking-wide">
                  © 2026 FitRevive Physiotherapy
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
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
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ))}
          {/* Dark gradient overlay for text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent"></div>
          {/* Subtle overall dark overlay */}
          <div className="absolute inset-0 bg-secondary/10"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs md:text-sm tracking-widest mb-4 md:mb-6 uppercase backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Welcome to FitRevive
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-extrabold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Reclaim Your Mobility with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Expert Physiotherapy</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium mb-4 md:mb-6 border-l-4 border-accent pl-3 md:pl-4">
              Evidence-Based Care for a Pain-Free, Active Life.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl leading-relaxed">
              Experience world-class rehabilitation in Assam. Our certified specialists combine advanced therapeutic techniques with personalized care to treat chronic pain, sports injuries, and post-surgical conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <motion.button 
                onClick={() => setIsFormOpen(true)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1"
              >
                Book Appointment
              </motion.button>
              <motion.a 
                href="https://wa.me/918473809386?text=Hello%20FitRevive%20Physiotherapy,%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#128C7E] hover:bg-gray-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-white/30 transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/30 -skew-x-12 transform origin-top-right -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-slate-50 select-none -z-20 tracking-tighter"
        >
          RECOVERY
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
            {/* Image Side (Left) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl aspect-video md:aspect-[4/5] max-w-md mx-auto lg:mx-0 border-8 md:border-[12px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=75&w=1200" 
                  alt="Professional Physiotherapy Session" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Experience Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute -bottom-6 right-0 md:-right-10 bg-white p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-200">
                    <div className="relative">
                      <Shield size={24} strokeWidth={2} />
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-slate-900 flex items-center justify-center"
                      >
                        <CheckCircle size={10} strokeWidth={4} />
                      </motion.div>
                    </div>
                  </div>
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Verified</span>
                      <div className="h-px w-4 bg-slate-200"></div>
                    </div>
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="font-display font-bold text-lg text-secondary leading-none"
                    >
                      Clinical Excellence
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-slate-500 font-medium text-xs mt-1"
                    >
                      Certified Specialists
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Dots */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[radial-gradient(#3b82f6_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
            </motion.div>

            {/* Text Content (Right Side) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-1/2"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="w-12 h-[3px] bg-primary rounded-full"></span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Discover FitRevive</span>
              </motion.div>
              
              <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-secondary overflow-hidden">
                {"Your journey to a ".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05 } }
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 inline-block mr-3"
                >
                  pain-free
                </motion.span>
                {"life starts here.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 + (i * 0.05) } }
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
                }}
                className="space-y-6 text-lg text-slate-600 leading-relaxed mb-12"
              >
                <p>
                  At FitRevive Physiotherapy, we believe that movement is medicine. Our dedicated team of professionals is committed to helping you overcome pain, recover from injuries, and achieve your optimal physical potential.
                </p>
                <p>
                  With years of clinical experience and a passion for healing, we utilize evidence-based practices tailored to your unique needs. We don't just treat symptoms; we identify and address the root cause of your discomfort.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10 pt-10 border-t border-slate-100">
                {[
                  { title: "Personalized Care", desc: "1-on-1 dedicated sessions" },
                  { title: "Modern Facility", desc: "Advanced equipment" },
                  { title: "Expert Team", desc: "Certified specialists" },
                  { title: "Proven Results", desc: "Focus on recovery" }
                ].map((item, i) => (
                    <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5 + (i * 0.05) } }
                    }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group/item cursor-default"
                  >
                    <div className="mt-1 bg-primary/10 p-2 rounded-xl text-primary shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                      <CheckCircle size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-secondary group-hover/item:text-primary transition-colors duration-300">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Feature Cards Grid (Mission, Offer, Why Choose Us) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Our Mission",
                desc: "To empower individuals to reclaim their health and mobility through compassionate, expert physiotherapy care.",
                icon: <Heart size={32} />,
                color: "from-rose-500 to-pink-500"
              },
              {
                title: "What We Offer",
                desc: "Personalized plans, advanced rehabilitation, and a holistic approach to your physical wellness journey.",
                icon: <Activity size={32} />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Why Choose Us",
                desc: "Experienced specialists, patient-centered care, and a focus on long-term recovery and prevention.",
                icon: <Shield size={32} />,
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group h-full cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-2xl -z-10 scale-95" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}></div>
                <div className="bg-slate-50 hover:bg-white p-8 md:p-10 rounded-3xl border border-slate-100 hover:border-transparent transition-all duration-500 h-full shadow-sm hover:shadow-2xl flex flex-col">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-8 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 text-secondary">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg flex-1">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
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
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6">Meet Our Experts</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Our team of dedicated professionals is here to provide you with the best care and support on your journey to recovery.
            </p>
            <div className="w-24 h-1.5 bg-primary mx-auto mt-8 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Trishnamoni Haloi (P.T.)",
                role: "Founder cum Consultant Physiotherapist",
                desc: "Specializes in neurological rehabilitation.",
                img: "/trishna.jpeg"
              },
              {
                name: "Dr. Dorothy Mazumdar (P.T.)",
                role: "Consultant Physiotherapist",
                desc: "Expert in orthopedic and sports rehabilitation.",
                img: "/dorothy.jpg"
              },
              {
                name: "Dr. Anjuma Akhtar (P.T.)",
                role: "Consultant Physiotherapist",
                desc: "Dedicated to pediatric physiotherapy and post-surgery recovery programs.",
                img: "/anjuma.jpg"
              },
              {
                name: "Ms. Sumiya anjum",
                role: "Assistant Physiotherapist cum Clinic Administrator",
                desc: "Ensures smooth clinic operations and provides excellent patient care assistance.",
                img: "/sumiya.jpeg"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden m-3 rounded-2xl">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-0 md:translate-y-8 opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-center gap-3">
                    <a href="https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                      <Facebook size={18} />
                    </a>
                    <a href="https://www.instagram.com/fitrevive_physiotherapy?igsh=NW5kNWUwbWVrdzk3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <div className="w-12 h-1 bg-gray-200 mx-auto mb-4 rounded-full group-hover:bg-primary transition-colors"></div>
                  <p className="text-gray-600 text-sm flex-1">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6"
            >
              <Activity size={14} /> Our Expertise
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-secondary mb-6">Comprehensive Care</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Specialized physiotherapy services designed to help you recover faster, regain strength, and live a life without physical limitations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Back & Neck Pain",
                desc: "Targeted therapy to relieve chronic back and neck pain, improving posture and mobility through manual techniques.",
                icon: <Activity size={28} />,
                gradient: "from-blue-500 to-cyan-400"
              },
              {
                title: "Sports Injuries",
                desc: "Intensive recovery protocols designed for athletes to safely return to peak performance and prevent future injuries.",
                icon: <Activity size={28} />,
                gradient: "from-indigo-500 to-blue-400"
              },
              {
                title: "Post-Surgery Rehab",
                desc: "Guided recovery following surgeries to ensure proper healing, reduce scar tissue, and regain full range of motion.",
                icon: <Heart size={28} />,
                gradient: "from-rose-500 to-pink-400"
              },
              {
                title: "Joint Pain & Arthritis",
                desc: "Specialized care to manage joint pain, reduce inflammation, and improve joint function for better quality of life.",
                icon: <Shield size={28} />,
                gradient: "from-emerald-500 to-teal-400"
              },
              {
                title: "Neurological Rehab",
                desc: "Dedicated therapy programs for stroke, Parkinson's, and other neurological conditions to improve motor control.",
                icon: <Activity size={28} />,
                gradient: "from-amber-500 to-orange-400"
              },
              {
                title: "Pediatric Care",
                desc: "Gentle and engaging therapy for children to address developmental delays, congenital issues, and childhood injuries.",
                icon: <Shield size={28} />,
                gradient: "from-purple-500 to-violet-400"
              }
            ].map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-transparent flex flex-col items-start cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed flex-1">{service.desc}</p>
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Book Session <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* Image Grid (Left Side) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:grid-rows-2 md:gap-6 md:h-[600px]">
                {/* Main large image/video */}
                <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white aspect-video md:aspect-auto md:col-span-8 md:row-span-2">
                  <img 
                    src="/interior.jpeg" 
                    alt="Modern Physiotherapy Clinic" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/30 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2">
                      Clinical Excellence
                    </div>
                    <h4 className="font-display text-xl md:text-2xl font-bold text-white">Expert Care</h4>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:contents">
                  {/* Top right image */}
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl group border-4 border-white aspect-square md:aspect-auto md:col-span-4 md:row-span-1">
                    <img 
                      src="/interior3.JPG" 
                      alt="Modern Equipment" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Bottom right image */}
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl group border-4 border-white aspect-square md:aspect-auto md:col-span-4 md:row-span-1">
                    <img 
                      src="/interiora.jpeg" 
                      alt="Physiotherapy Session" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features List (Right Side) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[3px] bg-primary rounded-full"></span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Why Choose Us</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-secondary mb-8 leading-tight">
                The FitRevive <span className="text-primary">Difference</span>
              </h2>
              
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                We combine clinical expertise with a deeply personal approach to ensure every patient receives the highest standard of care.
              </p>

              <div className="grid gap-6">
                {[
                  { title: "Experienced Specialists", desc: "Our team consists of highly qualified and certified physiotherapists.", icon: <Shield size={24} />, color: "from-blue-500 to-cyan-500" },
                  { title: "Personalized Treatment", desc: "Every plan is custom-tailored to your specific needs and goals.", icon: <Activity size={24} />, color: "from-primary to-blue-600" },
                  { title: "Modern Technology", desc: "We utilize the latest equipment and evidence-based techniques.", icon: <Activity size={24} />, color: "from-indigo-500 to-purple-600" },
                  { title: "Compassionate Care", desc: "A friendly, supportive environment that focuses on your well-being.", icon: <Heart size={24} />, color: "from-rose-500 to-pink-600" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-500 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-secondary mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL SECTION */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-secondary to-[#152a42] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16"
          >
            Client Testimonials
          </motion.h2>
          
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="overflow-hidden relative min-h-[400px] md:min-h-[350px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testimonialSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col items-center text-center shadow-2xl"
                >
                  <div className="relative mb-6">
                    <img 
                      src={testimonials[testimonialSlide].img} 
                      alt={testimonials[testimonialSlide].name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-xl"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full shadow-lg">
                      <Star size={16} fill="white" className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-gray-100 italic mb-8 leading-relaxed font-light">
                    "{testimonials[testimonialSlide].text}"
                  </p>
                  
                  <div>
                    <h5 className="font-bold text-xl text-white mb-1">{testimonials[testimonialSlide].name}</h5>
                    <p className="text-primary font-medium text-sm uppercase tracking-widest">Happy Patient</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 hover:bg-primary text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 z-10 hidden sm:flex"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setTestimonialSlide((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 hover:bg-primary text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 z-10 hidden sm:flex"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mb-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialSlide(i)}
                className={`h-2 transition-all duration-300 rounded-full ${testimonialSlide === i ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="py-24 relative overflow-hidden bg-slate-50">
        {/* Blurred Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-purple-50/50 to-white"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Card Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3 block">Gallery</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Our Visual Journey</h2>
              <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                See real patient recovery moments, treatments, and clinic highlights
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'bg-secondary text-white shadow-md' 
                      : 'bg-transparent text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button className="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-secondary border border-slate-200 hover:bg-slate-50 flex items-center gap-1 transition-all">
                View More <ArrowRight size={14} />
              </button>
            </div>

            {/* Carousel */}
            <div className="relative h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden mb-12" style={{ perspective: '1200px' }}>
              <AnimatePresence mode="popLayout">
                {filteredGallery.length > 0 ? (
                  filteredGallery.map((item, index) => {
                    let diff = index - galleryIndex;
                    const total = filteredGallery.length;
                    
                    // Wrap logic for infinite feel
                    if (total > 0) {
                      if (diff > Math.floor(total / 2)) diff -= total;
                      if (diff < -Math.floor(total / 2)) diff += total;
                    }

                    const isCenter = diff === 0;
                    const isEdge = Math.abs(diff) === 1;
                    const isFarEdge = Math.abs(diff) === 2;

                    // Responsive offset
                    const xOffset = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 320;

                    return (
                      <motion.div
                        key={item.url}
                        initial={{ opacity: 0, scale: 0.5, x: diff > 0 ? 500 : -500 }}
                        animate={{ 
                          x: diff * xOffset,
                          scale: isCenter ? 1.15 : isEdge ? 0.85 : 0.6,
                          opacity: isCenter ? 1 : isEdge ? 0.5 : isFarEdge ? 0.15 : 0,
                          zIndex: 50 - Math.abs(diff),
                          rotateY: diff * -15,
                        }}
                        exit={{ opacity: 0, scale: 0.5, x: diff > 0 ? -500 : 500 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 26,
                          opacity: { duration: 0.3 }
                        }}
                        className={`absolute w-[220px] h-[280px] md:w-[380px] md:h-[480px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${isCenter ? 'cursor-zoom-in' : 'cursor-pointer'}`}
                        onClick={() => {
                          if (isCenter) setSelectedGalleryImage(item.url);
                          else setGalleryIndex(index);
                        }}
                        style={{
                          pointerEvents: Math.abs(diff) > 2 ? 'none' : 'auto',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <img 
                          src={item.url} 
                          alt={item.category} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="eager"
                          fetchPriority="high"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                            <div>
                              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">{item.category}</span>
                              <h4 className="text-white font-bold text-lg">FitRevive Moments</h4>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                              <Maximize2 size={20} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="text-slate-400 font-medium"
                  >
                    No images found for this category.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls & Indicators */}
            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setGalleryIndex(prev => (prev - 1 + filteredGallery.length) % filteredGallery.length)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                
                {/* Dots */}
                <div className="flex items-center gap-2 px-4">
                  {filteredGallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`h-2 transition-all duration-500 rounded-full ${galleryIndex === i ? 'w-8 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setGalleryIndex(prev => (prev + 1) % filteredGallery.length)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedGalleryImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-secondary/95 backdrop-blur-md"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10"
                onClick={() => setSelectedGalleryImage(null)}
              >
                <X size={24} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-full rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedGalleryImage} 
                  alt="Gallery View" 
                  className="w-full h-auto max-h-[85vh] object-contain bg-black/20"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* 1. Recovery Journey (Top) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-[0.2em] uppercase mb-8 border border-primary/10 shadow-sm"
              >
                <Activity size={14} className="animate-pulse" /> Your Recovery Journey
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-secondary mb-8 leading-[1.1] tracking-tight">
                Professional <span className="text-primary relative inline-block">
                  Consultation
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                  </svg>
                </span> Process
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                A systematic, evidence-based approach designed to restore your physical potential and long-term health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Initial Assessment",
                  desc: "A thorough evaluation of your physical condition, history, and goals to identify the root cause.",
                  icon: <Users size={28} />,
                  color: "bg-blue-500"
                },
                {
                  step: "02",
                  title: "Personalized Plan",
                  desc: "Developing a custom treatment strategy combining manual therapy, exercise, and education.",
                  icon: <Calendar size={28} />,
                  color: "bg-cyan-500"
                },
                {
                  step: "03",
                  title: "Expert Treatment",
                  desc: "Hands-on therapy sessions using advanced techniques to relieve pain and restore function.",
                  icon: <Activity size={28} />,
                  color: "bg-indigo-500"
                },
                {
                  step: "04",
                  title: "Progress Review",
                  desc: "Regular monitoring and adjustments to your plan to ensure optimal recovery and health.",
                  icon: <CheckCircle size={28} />,
                  color: "bg-emerald-500"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-0 group-hover:opacity-[0.03] -translate-y-1/2 translate-x-1/2 rounded-full transition-all duration-700`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        {item.icon}
                      </div>
                      <span className="text-5xl font-black text-slate-100 group-hover:text-primary/10 transition-colors duration-500">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-600 transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 p-12 rounded-[3rem] bg-secondary text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 max-w-xl text-center lg:text-left">
                <h4 className="text-3xl md:text-4xl font-display font-black mb-4 tracking-tight">Ready to start your recovery?</h4>
                <p className="text-slate-400 text-lg font-medium">Join hundreds of patients who have reclaimed their active lifestyle with FitRevive.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)}
                className="relative z-10 bg-primary hover:bg-accent text-white px-12 py-6 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-primary/40 whitespace-nowrap"
              >
                Book Appointment Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 2. Contact Info (Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-24 border-t border-slate-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Address */}
              <div className="group flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-secondary mb-3">Our Location</h4>
                  <a href="https://maps.app.goo.gl/8VE4xpPK8xc1QS1f6" target="_blank" rel="noopener noreferrer" className="text-lg text-slate-500 hover:text-primary transition-colors leading-relaxed font-medium">
                    Bangaon, Nalbari<br/>Assam, India
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="group flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:-rotate-12 transition-all duration-500">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-secondary mb-3">Get In Touch</h4>
                  <p className="text-lg text-slate-500 mb-1 font-medium">8473809386</p>
                  <p className="text-lg text-slate-500 font-medium">fitrevive.org@gmail.com</p>
                </div>
              </div>

              {/* Socials */}
              <div className="group flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <Users size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-secondary mb-6">Follow Our Journey</h4>
                  <div className="flex gap-5 justify-center">
                    {[
                      { icon: <Facebook size={22} />, href: "https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" },
                      { icon: <Instagram size={22} />, href: "https://www.instagram.com/fitrevive_physiotherapy?igsh=NW5kNWUwbWVrdzk3&utm_source=qr" },
                      { icon: <Twitter size={22} />, href: "#" }
                    ].map((social, i) => (
                      <motion.a 
                        key={i} 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-slate-100"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 text-center">
              <motion.a 
                href="https://maps.app.goo.gl/8VE4xpPK8xc1QS1f6" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 text-primary font-black text-lg group"
              >
                View on Google Maps 
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight size={20} />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 10. FOOTER */}
      <footer className="bg-[#0a192f] text-white pt-20 pb-10 relative overflow-hidden">
        {/* Subtle Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src="https://fit-images.vercel.app/logo-2.jpg" 
                  alt="FitRevive Logo" 
                  className="w-12 h-12 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hidden w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
                  F
                </div>
                <span className="font-display font-black text-2xl tracking-tight">FitRevive</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Expert physiotherapy care dedicated to restoring your mobility and enhancing your quality of life through personalized treatment plans.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1BLPjEKSPt/?mibextid=wwXIfr" },
                  { icon: <Instagram size={18} />, href: "https://www.instagram.com/fitrevive_physiotherapy?igsh=NW5kNWUwbWVrdzk3&utm_source=qr" },
                  { icon: <Twitter size={18} />, href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-primary font-bold mb-8">Navigation</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-primary font-bold mb-8">Specialties</h3>
              <ul className="space-y-4">
                {[
                  "Physiotherapy",
                  "Pain Management",
                  "Orthopedic Rehab",
                  "Sports Injury",
                  "Neurological Rehab",
                  "Post-Surgical Care"
                ].map((service, idx) => (
                  <li key={idx}>
                    <a href="#services" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-primary font-bold mb-8">Get in Touch</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-primary shrink-0" />
                  <a href="https://maps.app.goo.gl/8VE4xpPK8xc1QS1f6" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium leading-relaxed">
                    Bangaon, Nalbari, Assam, India
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={20} className="text-primary shrink-0" />
                  <span className="text-slate-400 text-sm font-medium">8473809386</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={20} className="text-primary shrink-0" />
                  <span className="text-slate-400 text-sm font-medium">fitrevive.org@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs font-medium">
              &copy; {new Date().getFullYear()} FitRevive Physiotherapy. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
                <button 
                  onClick={() => { setLegalType('privacy'); setIsLegalOpen(true); }}
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => { setLegalType('terms'); setIsLegalOpen(true); }}
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  Terms
                </button>
              </div>
              <button 
                onClick={handleAdminLogin}
                disabled={isLoggingIn}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/10 transition-all group"
                title="Admin Portal"
              >
                <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Legal Modals */}
      <LegalModal 
        isOpen={isLegalOpen} 
        onClose={() => setIsLegalOpen(false)} 
        type={legalType} 
      />

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdminView && (
          <AdminDashboard onClose={() => setIsAdminView(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Activity, Heart, Shield, Users, 
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, 
  Star, Leaf, Calendar, CheckCircle, ArrowRight, MessageCircle,
  Building, Award, LogIn, Settings
} from 'lucide-react';
import AppointmentForm from './components/AppointmentForm';
import AdminDashboard from './components/AdminDashboard';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const ADMIN_EMAIL = "prasenjitkakati91@gmail.com";

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
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === ADMIN_EMAIL) {
        setIsAdminView(true);
      } else {
        alert("Access Denied: You are not authorized to access the admin dashboard.");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

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
                alt="FitRevive Logo" 
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
                FitRevive
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm xl:text-base font-medium transition-colors hover:text-accent ${isScrolled ? 'text-gray-600' : 'text-white drop-shadow-sm'}`}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-accent text-white px-4 xl:px-6 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
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
          <div className="lg:hidden bg-white shadow-xl absolute top-full left-0 w-full py-4 px-4 flex flex-col space-y-4 border-t border-gray-100">
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
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsFormOpen(true);
              }}
              className="bg-primary text-white px-5 py-3 rounded-xl text-center font-medium mt-4"
            >
              Book Appointment
            </button>
          </div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-16 lg:pt-0 lg:pb-0">
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
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Reclaim Your Mobility with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Expert Physiotherapy</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium mb-4 md:mb-6 border-l-4 border-accent pl-3 md:pl-4">
              Evidence-Based Care for a Pain-Free, Active Life.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl leading-relaxed">
              Experience world-class rehabilitation in Assam. Our certified specialists combine advanced therapeutic techniques with personalized care to treat chronic pain, sports injuries, and post-surgical conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1"
              >
                Book Appointment
              </button>
              <a 
                href="https://wa.me/918473809386?text=Hello%20FitRevive%20Physiotherapy,%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#128C7E] hover:bg-gray-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-white/30 transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </section>
      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            
            {/* Image Composition (Left Side) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Physiotherapist performing patient assessment" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent"></div>
              </div>
              
              {/* Decorative Border */}
              <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-primary/20 rounded-[2.5rem] -z-10 hidden md:block max-w-md"></div>
              
              {/* Floating Experience Badge */}
              <div className="absolute bottom-12 -right-6 md:-right-12 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-primary/30 rotate-3">
                    <Shield size={28} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-xl text-secondary leading-tight">Certified</p>
                    <p className="text-primary font-semibold tracking-wide text-sm">Clinical Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[3px] bg-primary rounded-full"></span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Discover FitRevive</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1] text-secondary">
                Your journey to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">pain-free</span> life starts here.
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-12">
                <p>
                  At FitRevive Physiotherapy, we believe that movement is medicine. Our dedicated team of professionals is committed to helping you overcome pain, recover from injuries, and achieve your optimal physical potential.
                </p>
                <p>
                  With years of clinical experience and a passion for healing, we utilize evidence-based practices tailored to your unique needs. We don't just treat symptoms; we identify and address the root cause of your discomfort.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10 pt-10 border-t border-slate-100">
                {[
                  { title: "Personalized Care", desc: "1-on-1 dedicated sessions" },
                  { title: "Modern Facility", desc: "Advanced equipment" },
                  { title: "Expert Team", desc: "Certified specialists" },
                  { title: "Proven Results", desc: "Focus on recovery" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-xl text-primary shrink-0">
                      <CheckCircle size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-secondary">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-2xl -z-10 scale-95" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}></div>
                <div className="bg-slate-50 hover:bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-transparent transition-all duration-500 h-full shadow-sm hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 text-secondary">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg flex-1">
                    {feature.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </div>
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
                img: "https://i.ibb.co/R16qxJ4/Gemini-Generated-Image-wnf0rewnf0rewnf0.jpg"
              },
              {
                name: "Dr. Dorothy Mazumdar (P.T.)",
                role: "Consultant Physiotherapist",
                desc: "Expert in orthopedic and sports rehabilitation.",
                img: "https://i.ibb.co/PzFVSVLp/Gemini-Generated-Image-243nd8243nd8243n.png"
              },
              {
                name: "Dr. Anjuma Akhtar (P.T.)",
                role: "Consultant Physiotherapist",
                desc: "Dedicated to pediatric physiotherapy and post-surgery recovery programs.",
                img: "https://i.ibb.co/pvpDzx8m/Gemini-Generated-Image-b0d85mb0d85mb0d8.png"
              },
              {
                name: "Ms. Sumiya anjum",
                role: "Assistant Physiotherapist cum Clinic Administrator",
                desc: "Ensures smooth clinic operations and provides excellent patient care assistance.",
                img: "https://i.ibb.co/vCNrC3Xk/Gemini-Generated-Image-kef4pikef4pikef4.png"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden m-3 rounded-2xl">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-center gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                      <Twitter size={18} />
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-transparent flex flex-col items-start"
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
              <div className="grid grid-cols-12 grid-rows-2 gap-6 h-[600px]">
                {/* Main large image/video */}
                <div className="col-span-8 row-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
                  <video 
                    src="https://storage.googleapis.com/static.antigravity.ai/projects/88c885ba-f3de-44d6-b4de-edd75fec5e87/1743785565547.mp4" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-8 left-8">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-2">
                      Clinical Excellence
                    </div>
                    <h4 className="font-display text-2xl font-bold text-white">Expert Care</h4>
                  </div>
                </div>
                
                {/* Top right image */}
                <div className="col-span-4 row-span-1 relative rounded-[2rem] overflow-hidden shadow-xl group border-4 border-white">
                  <img 
                    src="https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Modern Equipment" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Bottom right stat */}
                <div className="col-span-4 row-span-1 bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center text-white shadow-xl">
                  <div className="text-4xl font-extrabold mb-1 font-display">98%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Success Rate</div>
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
                    className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-500 group"
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
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Bikash Sarma",
                text: "The team at FitRevive completely cured my chronic back pain. I can finally play with my kids again without wincing.",
                img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
              },
              {
                name: "Rimpi Das",
                text: "Post-surgery rehab was tough, but my physiotherapist was incredibly patient and motivating. Highly recommended!",
                img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200"
              },
              {
                name: "Pallabi Kalita",
                text: "Very professional clinic with modern equipment. They explained my injury clearly and gave me great exercises.",
                img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200"
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

      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Clinic Gallery</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Take a look inside our modern facility and see our experts in action.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6129997/pexels-photo-6129997.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/5793998/pexels-photo-5793998.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/5473173/pexels-photo-5473173.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/5473185/pexels-photo-5473185.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800"
            ].map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] group shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={img} 
                  alt={`Clinic gallery ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
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
            Start Your Recovery Today
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
            >
              Book Appointment <ChevronRight size={20} />
            </button>
            <button className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Chat on WhatsApp
            </button>
          </div>
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
                      <a href="https://share.google/2js6WOQRcneu7DiBA" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors block">
                        Bangaon, Nalbari<br/>Assam, India
                      </a>
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
                      <p className="text-gray-600">fitrevivephysio@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                  <div className="flex gap-4 mb-8">
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
                  
                  <a 
                    href="https://share.google/2js6WOQRcneu7DiBA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm w-full justify-center"
                  >
                    <MapPin size={18} />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
            
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 rounded-3xl overflow-hidden shadow-lg h-[400px] border border-gray-100"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Bangaon,%20Nalbari,%20Assam,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="FitRevive Location Map"
            ></iframe>
          </motion.div>
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
                  alt="FitRevive Logo" 
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
                  FitRevive
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
                  <a href="https://share.google/2js6WOQRcneu7DiBA" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Bangaon, Nalbari<br/>Assam, India
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>8473809386</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>fitrevivephysio@gmail.com</span>
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
              &copy; {new Date().getFullYear()} FitRevive Physiotherapy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <button 
                onClick={handleAdminLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group"
              >
                <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                {isLoggingIn ? 'Logging in...' : 'Admin Portal'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdminView && user?.email === ADMIN_EMAIL && (
          <AdminDashboard onClose={() => setIsAdminView(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

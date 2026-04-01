import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Activity, Heart, Shield, Users, 
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, 
  Star, Leaf, Calendar, CheckCircle, ArrowRight
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Services', href: '#services' },
    { name: 'Tips', href: '#tips' },
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
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Physiotherapy session" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg animate-fade-in-up">
            Fitrevive Physiotherapy
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light drop-shadow-md animate-fade-in-up animation-delay-200">
            Your partner in recovery
          </p>
          <div className="animate-fade-in-up animation-delay-400">
            <a 
              href="#about"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              OUR TEAM <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-24 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
            <div className="space-y-6 text-lg text-gray-100 leading-relaxed font-light">
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
          </div>

          <div className="flex flex-col gap-8 mt-16 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-200 text-sm">
                To empower individuals to reclaim their health and mobility through compassionate, expert physiotherapy care.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
              <ul className="space-y-3 text-sm text-gray-200 inline-block text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Personalized Physiotherapy Plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Advanced Rehabilitation Techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Holistic Wellness Approach</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
              <ul className="space-y-3 text-sm text-gray-200 inline-block text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Experienced physiotherapists</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Patient-centered care</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Accessible clinic</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>Focus on long-term recovery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-0">
        <div className="text-center py-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {[
          {
            title: "Physiotherapy Consultation",
            desc: "Comprehensive assessment to diagnose your condition and create a tailored treatment plan for your specific needs.",
            img: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#8B7355]/10", // Brown tone
            textBg: "bg-[#8B7355]"
          },
          {
            title: "Pain Management Therapy",
            desc: "Targeted interventions using manual therapy, modalities, and exercises to alleviate acute and chronic pain effectively.",
            img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#556B2F]/10", // Olive tone
            textBg: "bg-[#556B2F]"
          },
          {
            title: "Orthopedic Rehabilitation",
            desc: "Specialized care for musculoskeletal injuries, joint problems, and bone conditions to restore mobility and strength.",
            img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#0F6C8D]/10", // Teal tone
            textBg: "bg-[#0F6C8D]"
          },
          {
            title: "Neurological Rehabilitation",
            desc: "Dedicated therapy programs for stroke, Parkinson's, MS, and other neurological conditions to improve function and independence.",
            img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
            img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#8B7355]/10", // Brown tone
            textBg: "bg-[#8B7355]"
          },
          {
            title: "Pediatric Physiotherapy",
            desc: "Gentle and engaging therapy for children to address developmental delays, injuries, and congenital conditions.",
            img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            bg: "bg-[#0F6C8D]/10", // Teal tone
            textBg: "bg-[#0F6C8D]"
          }
        ].map((service, index) => (
          <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} ${service.bg} items-center`}>
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
          </div>
        ))}
      </section>

      {/* 4. HEALTH TIPS SECTION */}
      <section id="tips" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <Leaf className="absolute top-10 right-10 text-white/10" size={120} />
        <Leaf className="absolute bottom-10 left-10 text-white/10 transform rotate-180" size={80} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/3">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Health Tips<br/>For You</h2>
              <p className="text-accent-100 text-lg mb-8 opacity-90">
                Incorporate these simple daily habits into your routine to maintain optimal physical health and prevent injuries.
              </p>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-medium transition-colors">
                View All Tips
              </button>
            </div>
            
            <div className="w-full lg:w-2/3">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Maintain Good Posture",
                    desc: "Keep your screen at eye level and sit back in your chair to reduce spinal stress.",
                    date: "Oct 12, 2023",
                    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  },
                  {
                    title: "Eat a Balanced Diet",
                    desc: "Nutrient-rich foods support tissue repair and reduce inflammation in the body.",
                    date: "Oct 28, 2023",
                    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  },
                  {
                    title: "Stretch Daily",
                    desc: "Just 10 minutes of stretching improves flexibility and blood flow to muscles.",
                    date: "Nov 05, 2023",
                    img: "https://images.unsplash.com/photo-1552286450-37b514b87834?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  },
                  {
                    title: "Stay Active",
                    desc: "Aim for at least 30 minutes of moderate physical activity most days of the week.",
                    date: "Nov 18, 2023",
                    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  }
                ].map((tip, i) => (
                  <div key={i} className="bg-white text-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={tip.img} 
                        alt={tip.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2 text-secondary">{tip.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tip.desc}</p>
                      <div className="flex items-center text-xs text-gray-400 font-medium">
                        <Calendar size={14} className="mr-1" /> {tip.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (VISUAL SECTION) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
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
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-lg font-medium text-gray-800">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Clinic" 
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
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL SECTION */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-secondary to-[#152a42] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Client Testimonials</h2>
          
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
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/15 transition-colors">
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
              </div>
            ))}
          </div>
          
          <button className="bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Please Share Your Feedback <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* 7. GET INVOLVED SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Get Involved</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          
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
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-8">{item.text}</p>
                <button className="text-primary font-semibold border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
                  {item.btn}
                </button>
              </div>
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
            <div className="w-full lg:w-3/5">
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
            </div>
            
            {/* Contact Info */}
            <div className="w-full lg:w-2/5">
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
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
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
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors shadow-sm">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors shadow-sm">
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
                  <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
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

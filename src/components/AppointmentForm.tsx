import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronRight, Loader2, CheckCircle2, Activity } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const services = [
  "Physiotherapy Consultation",
  "Sports Injury Rehabilitation",
  "Post-Surgery Recovery",
  "Chronic Pain Management",
  "Manual Therapy",
  "Ergonomic Assessment"
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM"
];

export default function AppointmentForm({ isOpen, onClose, onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
      
      // Close modal after success message is shown
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error booking appointment:", err);
      setError("An error occurred while booking your appointment. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-color)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} className="text-[var(--text-secondary)]" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Side - Info */}
              <div className="hidden md:flex md:w-1/3 bg-primary p-8 flex-col justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Book Your Session</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Take the first step towards a pain-free life. Our experts are ready to help you recover.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span>Certified Experts</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span>Modern Equipment</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 size={40} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Booking Successful!</h3>
                      <p className="text-[var(--text-secondary)]">
                        We've received your request. Our team will contact you shortly to confirm your appointment.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Appointment Request</h2>
                        <p className="text-[var(--text-secondary)] text-sm mt-1">Please fill in your details below.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <User size={14} /> Full Name
                            </label>
                            <input 
                              required
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <Mail size={14} /> Email Address
                            </label>
                            <input 
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <Phone size={14} /> Phone Number
                            </label>
                            <input 
                              required
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <Activity size={14} /> Service
                            </label>
                            <select 
                              required
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            >
                              <option value="">Select a service</option>
                              {services.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <Calendar size={14} /> Preferred Date
                            </label>
                            <input 
                              required
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                              <Clock size={14} /> Preferred Time
                            </label>
                            <select 
                              required
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                            >
                              <option value="">Select a time</option>
                              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                            <MessageSquare size={14} /> Additional Message (Optional)
                          </label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your symptoms or any specific requirements..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                          />
                        </div>

                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 rounded-lg bg-red-100/50 border border-red-200"
                          >
                            <p className="text-red-600 text-xs font-bold flex items-center gap-2">
                              <Activity size={12} /> {error}
                            </p>
                          </motion.div>
                        )}

                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> 
                              <span>Processing Booking...</span>
                            </>
                          ) : (
                            <>
                              <span>Confirm Booking</span>
                              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[var(--bg-primary)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-[var(--border-color)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {type === 'privacy' ? <Shield size={24} /> : <FileText size={24} />}
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                    {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                  </h2>
                  <p className="text-[var(--text-secondary)] text-sm">Last updated: April 2026</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-primary hover:border-primary transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="prose prose-slate max-w-none">
                {type === 'privacy' ? (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 1. Introduction
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        At FitRevive Physiotherapy, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 2. Data We Collect
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong>Health Data:</strong> includes information about your physical condition and medical history provided during appointment booking.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 3. How We Use Your Data
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide our services to you, to manage your appointments, and to improve our website and patient experience.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 4. Data Security
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 1. Agreement to Terms
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 2. Appointment Booking
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        When you book an appointment through our website, you agree to provide accurate and complete information. We reserve the right to cancel or reschedule appointments based on availability and clinical requirements.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 3. Cancellation Policy
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        We request at least 24 hours notice for cancellations. Failure to provide adequate notice may result in a cancellation fee.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-primary" /> 4. Professional Advice
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        The information provided on this website is for general informational purposes only and is not intended as professional medical advice. Always seek the advice of your physiotherapist or other qualified health provider with any questions you may have regarding a medical condition.
                      </p>
                    </section>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] flex justify-end">
              <button
                onClick={onClose}
                className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;

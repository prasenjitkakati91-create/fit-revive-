import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Calendar, Clock, Phone, Mail, MessageSquare, 
  Trash2, LogOut, ChevronLeft, Search, Filter, Download,
  CheckCircle2, AlertCircle, Loader2, RefreshCw
} from 'lucide-react';
import { db, auth } from '../firebase';
import { 
  collection, query, orderBy, onSnapshot, 
  deleteDoc, doc, Timestamp 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  createdAt: Timestamp;
}

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'appointments', id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Check your permissions.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesFilter = filterService === 'All' || app.service === filterService;
    
    return matchesSearch && matchesFilter;
  });

  const services = ["All", ...Array.from(new Set(appointments.map(a => a.service)))];

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 h-[100dvh] w-full z-[300] bg-[var(--bg-primary)] flex flex-col transition-colors duration-300"
    >
      {/* Header */}
      <header className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-[var(--text-secondary)]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
              <Users size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">Appointment Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Live Updates
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-red-600 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all text-sm font-bold"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats & Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1 bg-[var(--card-bg)] p-6 rounded-3xl shadow-sm border border-[var(--border-color)]">
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">Total Bookings</p>
              <h3 className="text-3xl font-bold text-[var(--text-primary)]">{appointments.length}</h3>
              <div className="mt-4 flex items-center gap-2 text-xs text-green-500 font-bold">
                <CheckCircle2 size={14} /> System Online
              </div>
            </div>

            <div className="lg:col-span-3 bg-[var(--card-bg)] p-6 rounded-3xl shadow-sm border border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Filter className="text-[var(--text-secondary)]" size={18} />
                <select 
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="flex-1 sm:w-48 px-4 py-3 rounded-2xl border border-[var(--border-color)] outline-none focus:border-primary transition-all text-sm bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                >
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Table/List */}
          <div className="bg-[var(--card-bg)] rounded-3xl shadow-sm border border-[var(--border-color)] overflow-hidden">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                <Loader2 size={40} className="animate-spin mb-4 text-primary" />
                <p className="font-medium">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                <AlertCircle size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">No appointments found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block lg:hidden divide-y divide-[var(--border-color)]">
                  {filteredAppointments.map((app) => (
                    <motion.div 
                      layout
                      key={app.id}
                      className="p-6 hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-primary font-bold text-lg">
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[var(--text-primary)] text-lg">{app.name}</p>
                            <p className="text-xs text-[var(--text-secondary)]">ID: {app.id.slice(0, 8)}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                          {app.service}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">Schedule</p>
                          <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                            <Calendar size={14} className="text-[var(--text-secondary)]" />
                            {formatDate(app.date)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <Clock size={14} className="text-[var(--text-secondary)]" />
                            {app.time}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">Contact</p>
                          <a href={`tel:${app.phone}`} className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                            <Phone size={14} className="text-[var(--text-secondary)]" />
                            {app.phone}
                          </a>
                          <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] truncate max-w-[120px]">
                            <Mail size={14} className="text-[var(--text-secondary)]" />
                            {app.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                        {app.message && (
                          <button 
                            onClick={() => alert(`Message: ${app.message}`)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl font-bold text-sm"
                          >
                            <MessageSquare size={18} /> View Message
                          </button>
                        )}
                        <button 
                          disabled={deletingId === app.id}
                          onClick={() => handleDelete(app.id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-500 rounded-xl font-bold text-sm"
                        >
                          {deletingId === app.id ? <RefreshCw size={18} className="animate-spin" /> : <Trash2 size={18} />}
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                        <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Patient</th>
                        <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Service</th>
                        <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Schedule</th>
                        <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {filteredAppointments.map((app) => (
                        <motion.tr 
                          layout
                          key={app.id}
                          className="hover:bg-[var(--bg-secondary)] transition-colors group"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-primary font-bold">
                                {app.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-[var(--text-primary)]">{app.name}</p>
                                <p className="text-xs text-[var(--text-secondary)]">ID: {app.id.slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                              {app.service}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                                <Calendar size={14} className="text-[var(--text-secondary)]" />
                                {formatDate(app.date)}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                <Clock size={14} className="text-[var(--text-secondary)]" />
                                {app.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <a href={`tel:${app.phone}`} className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-primary transition-colors font-medium">
                                <Phone size={14} className="text-[var(--text-secondary)]" />
                                {app.phone}
                              </a>
                              <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-primary transition-colors">
                                <Mail size={14} className="text-[var(--text-secondary)]" />
                                {app.email}
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {app.message && (
                                <button 
                                  onClick={() => alert(`Message: ${app.message}`)}
                                  className="p-2 text-[var(--text-secondary)] hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                  title="View Message"
                                >
                                  <MessageSquare size={18} />
                                </button>
                              )}
                              <button 
                                disabled={deletingId === app.id}
                                onClick={() => handleDelete(app.id)}
                                className="p-2 text-[var(--text-secondary)] hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50"
                                title="Delete Appointment"
                              >
                                {deletingId === app.id ? <RefreshCw size={18} className="animate-spin" /> : <Trash2 size={18} />}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Check,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Menu,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import CampusAIAssistant from '../CampusAIAssistant';

export const Navbar = ({ onToggleMobileSidebar, role = 'student' }) => {
  const navigate = useNavigate();
  const {
    studentProfile,
    adminProfile,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setCurrentUserRole
  } = useCampus();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profile = role === 'admin' ? adminProfile : studentProfile;
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (role === 'student') {
      navigate(`/student/notices?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/admin/requests?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-[33px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Search bar */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                role === 'student'
                  ? 'Search timetable, notices, services...'
                  : 'Search student roll, request ID, complaints...'
              }
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
            />
          </form>
        </div>

        {/* Right: Quick Role Toggle, Notifications & Profile Avatar */}
        <div className="header-actions flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-fade-in">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        setShowNotifications(false);
                        if (role === 'student') navigate('/student/notifications');
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        notif.unread ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          notif.unread ? 'bg-indigo-600' : 'bg-transparent'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{notif.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{notif.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      if (role === 'student') navigate('/student/notifications');
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                  >
                    View all notifications <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <CampusAIAssistant />

          {/* Profile pill & dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/20"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{profile.name}</p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {role === 'student' ? `${profile.year} • ${profile.department}` : profile.role}
                </p>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{profile.name}</p>
                  <p className="text-xs text-slate-500 truncate">{profile.email}</p>
                  <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {role === 'student' ? profile.studentId : profile.adminId}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate(role === 'student' ? '/student/profile' : '/admin/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    My Profile & Settings
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      const targetRole = role === 'student' ? 'admin' : 'student';
                      setCurrentUserRole(targetRole);
                      navigate(targetRole === 'student' ? '/student/dashboard' : '/admin/dashboard');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 font-medium"
                  >
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    Switch to {role === 'student' ? 'Admin Portal' : 'Student Portal'}
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

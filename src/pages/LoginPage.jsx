import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import DemoBar from '../components/common/DemoBar';
import VoiceInput from '../components/ui/VoiceInput';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setCurrentUserRole, showToast } = useCampus();

  const roleParam = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState(roleParam === 'admin' ? 'admin' : 'student');
  const [identifier, setIdentifier] = useState('akash.m@campusconnect.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (roleParam === 'admin') {
      setSelectedRole('admin');
      setIdentifier('r.sharma@campusconnect.edu');
    } else if (roleParam === 'student') {
      setSelectedRole('student');
      setIdentifier('akash.m@campusconnect.edu');
    }
  }, [roleParam]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'admin') {
      setIdentifier('r.sharma@campusconnect.edu');
    } else {
      setIdentifier('akash.m@campusconnect.edu');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setCurrentUserRole(selectedRole);
      showToast(`Welcome back, ${selectedRole === 'admin' ? 'Dr. Rajesh Sharma' : 'Akash Mahakud'}!`, 'success');
      if (selectedRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 450);
  };

  const handleQuickDemoLogin = (role) => {
    setSelectedRole(role);
    setCurrentUserRole(role);
    showToast(`Quick Demo logged in as ${role === 'admin' ? 'Administrator' : 'Student'}!`, 'success');
    navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      <DemoBar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side: CampusConnect Branding & Visual Highlights */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-12 text-white flex-col justify-between relative overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="flex items-center gap-3 cursor-pointer z-10" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-white">
                Campus<span className="text-cyan-400">Connect</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
                Digital Campus Platform
              </p>
            </div>
          </div>

          {/* Center Message */}
          <div className="my-auto max-w-lg z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full inline-block mb-4">
              All-In-One Unified Portal
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Your entire campus, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                connected.
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              No physical lines, no paper slips, no delayed approvals. Manage leaves, passes,
              certificates, notices, and grievances through one single dashboard.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant QR-verified digital Gate Passes</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-stage department leave & certificate approvals</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast hostel & mess issue dispatch with tracking</span>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-slate-300 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>CampusConnect Cloud System Online & Fully Synchronized</span>
            </div>
            <span className="font-mono text-cyan-300">v2.4.0</span>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-black text-2xl text-slate-900">
                Campus<span className="text-indigo-600">Connect</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select your role to access your personalized campus dashboard.
                </p>
              </div>

              {/* Role Toggle Tabs */}
              <div className="mt-6 p-1 bg-slate-100 rounded-2xl flex items-center">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedRole === 'student'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedRole === 'admin'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Administrator</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="login-identifier" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {selectedRole === 'student' ? 'Student ID / College Email' : 'Admin ID / Official Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <VoiceInput
                      id="login-identifier"
                      name="identifier"
                      required
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      placeholder={selectedRole === 'student' ? 'e.g. CS-2023-0842' : 'e.g. ADM-2021-04'}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-100 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Password reset link sent to your college email!', 'info');
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-100 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded-md focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 select-none">
                    Remember my credentials on this device
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Login to {selectedRole === 'student' ? 'Student Portal' : 'Admin Console'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Hackathon Demo 1-Click Option */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 text-center mb-3">
                  Hackathon Fast Demo Access
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('student')}
                    className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Demo as Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Demo as Admin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

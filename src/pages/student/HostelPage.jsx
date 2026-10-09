import React, { useState } from 'react';
import {
  Building2,
  Phone,
  Mail,
  User,
  Wifi,
  Wrench,
  AlertTriangle,
  Upload,
  Clock,
  Sparkles,
  Shield,
  Plus
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import VoiceInput from '../../components/ui/VoiceInput';

export const HostelPage = () => {
  const { studentProfile, requests, addRequest, showToast } = useCampus();

  const [category, setCategory] = useState('Wi-Fi');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter hostel complaints for student
  const hostelComplaints = requests.filter(
    (r) =>
      r.requestType === 'Hostel Complaint' &&
      (r.studentId === studentProfile.studentId || r.studentName === studentProfile.name)
  );

  const categoriesList = [
    'Wi-Fi',
    'Plumbing',
    'Electrical',
    'Cleaning',
    'Furniture',
    'Security',
    'Water Supply',
    'Other'
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      showToast(`Attached photo: ${file.name}`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('Please describe the hostel issue', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const complaintId = `HC-${Math.floor(100 + Math.random() * 900)}`;
      addRequest({
        id: complaintId,
        requestType: 'Hostel Complaint',
        category,
        hostel: 'Block C',
        room: studentProfile.room,
        priority,
        status: 'Pending',
        description,
        attachment: photoName || 'issue_photo.jpg',
        assignedStaff: 'Unassigned (Dispatched to Warden Desk)',
        department: 'Estate & Hostel Maintenance',
        adminComment: 'Logged into maintenance roster.'
      });

      setDescription('');
      setPhotoName('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hostel Services & Maintenance
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View room accommodation details, connect with wardens, and file maintenance grievances.
        </p>
      </div>

      {/* Top Hostel Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Accommodation
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                Allocated
              </span>
            </div>

            <div className="mt-4">
              <span className="text-3xl font-black text-slate-900">{studentProfile.room}</span>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{studentProfile.hostel}</p>
              <p className="text-xs text-slate-400 mt-1">Floor: 3rd Floor • Capacity: Triple Sharing</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block mb-2">Roommates</span>
            <div className="space-y-2">
              {studentProfile.roommates.map((rm, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50">
                  <img src={rm.avatar} alt={rm.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">{rm.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rm.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warden Contact Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hostel Warden
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                On Duty
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-bold text-slate-900">{studentProfile.warden.name}</h4>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">{studentProfile.warden.designation}</p>
            </div>

            <div className="mt-5 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{studentProfile.warden.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{studentProfile.warden.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{studentProfile.warden.office}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Emergency 24x7 Helpline:</span>
            <span className="font-bold text-rose-600 font-mono">1800-419-HOSTEL</span>
          </div>
        </div>

        {/* Hostel Guidelines & Facilities */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-2.5 py-1 rounded-full">
              Hostel Amenities
            </span>
            <h4 className="text-lg font-bold mt-3">Block C Facilities</h4>
            <ul className="mt-4 space-y-2 text-xs text-indigo-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>High-Speed Wi-Fi: <span className="font-semibold text-white">Campus_BlockC_5G</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Laundry Room: Ground Floor (08 AM - 08 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Indoor Badminton & TT: Common Hall</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>RO Water Purifier: Floor 1, 2, and 3</span>
              </li>
            </ul>
          </div>

          <p className="text-[11px] text-indigo-300 mt-4 pt-4 border-t border-indigo-800/80">
            Curfew: Entry closes promptly at 09:30 PM.
          </p>
        </div>
      </div>

      {/* Complaint Filing & Tracking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* File Complaint Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Report Hostel Issue</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-100 focus:outline-hidden font-medium text-slate-800"
                >
                  {categoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPriority(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        priority === lvl
                          ? lvl === 'High'
                            ? 'bg-rose-50 border-rose-400 text-rose-700'
                            : 'bg-amber-50 border-amber-400 text-amber-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="hostel-problem-description" className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Problem Description
                </label>
                <VoiceInput
                  id="hostel-problem-description"
                  name="description"
                  multiline
                  rows={3}
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the issue in detail (e.g. bathroom tap dripping, switch spark, Wi-Fi latency)..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Photo Evidence (Optional)
                </label>
                <label className="border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50/80 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <Upload className="w-4 h-4 text-slate-400 group-hover:text-amber-600 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {photoName ? photoName : 'Upload Issue Photo'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    accept="image/*"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Dispatching Complaint...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Submit Hostel Complaint</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Complaints Tracking List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <h3 className="font-bold text-base text-slate-900">Your Maintenance Tickets</h3>
            <span className="text-xs text-slate-500 font-semibold">{hostelComplaints.length} tickets</span>
          </div>

          {hostelComplaints.map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                    {comp.category?.substring(0, 2) || 'HC'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {comp.category} Issue #{comp.id}
                    </h4>
                    <p className="text-[11px] text-slate-400">Reported on {comp.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      comp.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {comp.priority}
                  </span>
                  <StatusBadge status={comp.status} />
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {comp.description}
              </p>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Assigned Technician: <strong className="text-slate-800">{comp.assignedStaff}</strong></span>
                {comp.adminComment && (
                  <span className="text-indigo-600 font-medium">Update: {comp.adminComment}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HostelPage;

import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Paperclip,
  Eye,
  Plus
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import VoiceInput from '../../components/ui/VoiceInput';

export const LeavePage = () => {
  const { studentProfile, requests, addRequest, showToast } = useCampus();

  const [leaveType, setLeaveType] = useState('Medical');
  const [fromDate, setFromDate] = useState('2026-09-22');
  const [toDate, setToDate] = useState('2026-09-24');
  const [reason, setReason] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Filter leave requests for student
  const leaveRequests = requests.filter(
    (r) =>
      r.requestType === 'Leave Application' &&
      (r.studentId === studentProfile.studentId || r.studentName === studentProfile.name)
  );

  const calculateDuration = () => {
    if (!fromDate || !toDate) return '1 day';
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays > 0 ? diffDays : 1} days`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      showToast(`Attached: ${file.name}`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      showToast('Please provide a specific reason for leave', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addRequest({
        requestType: 'Leave Application',
        type: `${leaveType} Leave`,
        fromDate,
        toDate,
        duration: calculateDuration(),
        reason,
        attachment: attachmentName || 'doctor_certificate.pdf',
        priority: leaveType === 'Emergency' || leaveType === 'Medical' ? 'High' : 'Normal',
        status: 'Pending',
        assignedTo: 'Department HOD / Academic Warden',
        department: studentProfile.department,
        adminComment: 'Awaiting initial faculty review'
      });

      setReason('');
      setAttachmentName('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Leave Management
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Submit electronic leave requests, upload doctor notes, and track approval workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Apply Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">New Leave Application</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Leave Type
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-hidden font-medium text-slate-800"
                >
                  <option value="Medical">Medical Leave</option>
                  <option value="Personal">Personal / Family Leave</option>
                  <option value="Emergency">Emergency Leave</option>
                  <option value="Academic">Academic / Conference</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    From Date
                  </label>
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    To Date
                  </label>
                  <input
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-hidden font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="p-2 bg-indigo-50/60 rounded-xl text-indigo-700 font-semibold flex items-center justify-between text-[11px]">
                <span>Calculated Duration:</span>
                <span className="bg-white px-2 py-0.5 rounded-md shadow-2xs font-bold">
                  {calculateDuration()}
                </span>
              </div>

              <div>
                <label htmlFor="leave-reason" className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Reason for Absence
                </label>
                <VoiceInput
                  id="leave-reason"
                  name="reason"
                  multiline
                  rows={4}
                  required
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="Clearly state the reason for requesting leave..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:outline-hidden font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Supporting Document / Prescription
                </label>
                <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/80 rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-1 transition-colors" />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {attachmentName ? attachmentName : 'Upload Medical Slip or Document'}
                  </span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 5MB</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Submit Leave Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: History & Past Leave Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="font-bold text-base text-slate-900">Previous Leave Applications</h3>
                <p className="text-xs text-slate-500">Track approvals from department mentor & hostel warden</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {leaveRequests.length} Applications
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pl-2">Applied Date</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Reason</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pl-2 font-medium">
                        <span className="font-bold text-slate-900 block">{req.date}</span>
                        <span className="text-[10px] text-slate-400 font-mono">#{req.id}</span>
                      </td>

                      <td className="py-3.5">
                        <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {req.type || 'Leave'}
                        </span>
                      </td>

                      <td className="py-3.5 text-slate-600">
                        <span className="font-semibold text-slate-800">{req.duration}</span>
                        <span className="text-[10px] text-slate-400 block">{req.fromDate} to {req.toDate}</span>
                      </td>

                      <td className="py-3.5 text-slate-600 max-w-[200px] truncate" title={req.reason}>
                        {req.reason}
                      </td>

                      <td className="py-3.5">
                        <StatusBadge status={req.status} />
                      </td>

                      <td className="py-3.5 pr-2 text-right">
                        <button
                          onClick={() => setSelectedLeave(req)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedLeave}
        onClose={() => setSelectedLeave(null)}
        title={`Leave Application: #${selectedLeave?.id}`}
      >
        {selectedLeave && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">{selectedLeave.type}</span>
              <StatusBadge status={selectedLeave.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Leave Period:</span>
                <span className="text-slate-900 font-bold">{selectedLeave.fromDate} → {selectedLeave.toDate}</span>
                <span className="text-slate-500 font-semibold block mt-0.5">({selectedLeave.duration})</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Assigned Approver:</span>
                <span className="text-slate-900 font-bold">{selectedLeave.assignedTo || 'Academic Warden'}</span>
                <span className="text-slate-500 block mt-0.5">{selectedLeave.department}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Reason:</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedLeave.reason}
              </p>
            </div>

            {selectedLeave.attachment && (
              <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-indigo-900">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium">{selectedLeave.attachment}</span>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-indigo-600 border border-indigo-200">
                  Verified
                </span>
              </div>
            )}

            {selectedLeave.adminComment && (
              <div>
                <span className="font-bold text-slate-700 block mb-1">Review Comments:</span>
                <p className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl text-amber-900">
                  {selectedLeave.adminComment}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
export default LeavePage;

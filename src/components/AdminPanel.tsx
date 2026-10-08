import React, { useState } from 'react';
import { WorkerData } from '../types';
import { Lock, Unlock, Key, Filter, Download, Trash2, Printer, Send, Search, FileText, CheckCircle2 } from 'lucide-react';
import { generateStandaloneHTMLPortal } from '../utils/htmlPortalGenerator';

interface Props {
  workers: WorkerData[];
  onDeleteWorker: (id: string) => void;
  onTransferToVerification: (id: string) => void;
  onSelectWorkerDoc: (worker: WorkerData, docType: 'stamp100' | 'cert25' | 'verification') => void;
}

export const AdminPanel: React.FC<Props> = ({
  workers,
  onDeleteWorker,
  onTransferToVerification,
  onSelectWorkerDoc
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [adminPin, setAdminPin] = useState<string>('1234');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  // Filtering states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'stamp100' | 'cert25' | 'verification'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // PIN Change modal
  const [showPinChange, setShowPinChange] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === adminPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('ভুল পিন নম্বর! পুনরায় চেষ্টা করুন (ডিফল্ট: 1234)');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      setAdminPin(newPin);
      setShowPinChange(false);
      setNewPin('');
      alert('অ্যাডমিন পিন সফলভাবে পরিবর্তন করা হয়েছে!');
    } else {
      alert('পিন অবশ্যই কমপক্ষে ৪ ডিজিটের হতে হবে।');
    }
  };

  // Naming format rule: [কর্মীর নাম]_[সংক্ষিপ্ত ঠিকানা]_[ডকুমেন্ট নাম].html
  const downloadSingleWorkerHTML = (w: WorkerData, docName: string) => {
    const cleanName = w.workerName.replace(/\s+/g, '_');
    const cleanAddress = (w.permDistrict || w.permUpazila || 'যশোর').replace(/\s+/g, '_');
    const filename = `${cleanName}_${cleanAddress}_${docName}.html`;

    const htmlContent = generateStandaloneHTMLPortal([w]);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredWorkers = workers.filter(w => {
    const matchesQuery = 
      w.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.mobile.includes(searchQuery) ||
      w.slNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.branchOffice.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || w.docCategory === categoryFilter;

    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && w.joiningDate >= startDate;
    }
    if (endDate) {
      matchesDate = matchesDate && w.joiningDate <= endDate;
    }

    return matchesQuery && matchesCategory && matchesDate;
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">অ্যাডমিন প্যানেল সিকিউরিটি</h2>
          <p className="text-xs text-slate-500 mt-1">
            প্রবেশ করতে ৪ ডিজিটের সিকিউরিটি পিন দিন (ডিফল্ট: <span className="font-mono font-bold text-slate-700">1234</span>)
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="পিন কোড লিখুন..."
              className="w-full text-center text-2xl tracking-widest font-mono p-3 border-2 border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none"
              autoFocus
            />
          </div>

          {pinError && (
            <p className="text-xs text-rose-600 font-bold">{pinError}</p>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
          >
            প্রবেশ করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Unlock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold">RRF অ্যাডমিন ড্যাশবোর্ড</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            কর্মী নথি ব্যবস্থাপনা, তারিখ অনুযায়ী ফিল্টার, এইচটিএমএল/পিডিএফ এক্সপোর্ট ও তথ্য যাচাই শাখা
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPinChange(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>পিন পরিবর্তন</span>
          </button>

          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            লগআউট
          </button>
        </div>
      </div>

      {/* Change PIN Modal */}
      {showPinChange && (
        <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-3">
          <h3 className="font-bold text-amber-900 text-sm">নতুন সিকিউরিটি পিন নির্ধারণ</h3>
          <form onSubmit={handleChangePin} className="flex gap-2 items-center max-w-sm">
            <input 
              type="password"
              placeholder="নতুন পিন (e.g. 5678)"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="p-2 border rounded text-xs w-full bg-white font-mono"
            />
            <button type="submit" className="bg-amber-800 text-white px-4 py-2 rounded text-xs font-bold whitespace-nowrap">
              সংরক্ষণ
            </button>
            <button type="button" onClick={() => setShowPinChange(false)} className="text-xs text-slate-500 underline">
              বাতিল
            </button>
          </form>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-800" />
            <h3 className="font-bold text-sm text-slate-800">ফিল্টার ও দ্রুত সার্চ</h3>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            মোট রক্ষিত নথি: <span className="font-bold text-emerald-900">{filteredWorkers.length} টি</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">কর্মীর নাম / মোবাইল / পদবী:</label>
            <div className="relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="লাইভ সার্চ..."
                className="w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">শুরু তারিখ:</label>
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">শেষ তারিখ:</label>
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button 
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              categoryFilter === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            সকল নথি
          </button>
          <button 
            onClick={() => setCategoryFilter('stamp100')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              categoryFilter === 'stamp100' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ১০০ টাকার স্ট্যাম্প
          </button>
          <button 
            onClick={() => setCategoryFilter('cert25')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              categoryFilter === 'cert25' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ২৫ টাকার প্রত্যয়ন
          </button>
          <button 
            onClick={() => setCategoryFilter('verification')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              categoryFilter === 'verification' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            তথ্য যাচাই শাখা
          </button>
        </div>
      </div>

      {/* Workers Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">আইডি / ক্রঃ</th>
                <th className="p-3">কর্মীর নাম & মোবাইল</th>
                <th className="p-3">পদবী & শাখা</th>
                <th className="p-3">যোগদানের তারিখ</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3 text-right">অ্যাকশন ও এক্সপোর্ট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    কোনো কর্মীর রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredWorkers.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-emerald-900">{w.slNo}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{w.workerName}</p>
                      <p className="text-slate-500 font-mono text-[11px]">{w.mobile}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{w.designation}</p>
                      <p className="text-slate-500 text-[11px]">{w.branchOffice}</p>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{w.joiningDate}</td>
                    <td className="p-3">
                      {w.status === 'verified' && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          <CheckCircle2 className="w-3 h-3" /> যাচাইকৃত
                        </span>
                      )}
                      {w.status === 'verification_pending' && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          যাচাইয়ের অধীন
                        </span>
                      )}
                      {w.status === 'stamp_printed' && (
                        <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          ১০০Tk স্ট্যাম্প
                        </span>
                      )}
                      {w.status === 'cert_printed' && (
                        <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          ২৫Tk প্রত্যয়ন
                        </span>
                      )}
                      {w.status === 'draft' && (
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                          খসড়া
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* Print / View Options */}
                        <button 
                          onClick={() => onSelectWorkerDoc(w, 'stamp100')}
                          title="১০০ টাকার স্ট্যাম্প প্রিভিউ"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-1.5 rounded border border-emerald-200"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <button 
                          onClick={() => onSelectWorkerDoc(w, 'verification')}
                          title="তথ্য যাচাই শাখা প্রিভিউ"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-800 p-1.5 rounded border border-blue-200"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        {/* Naming Rule Export HTML */}
                        <button 
                          onClick={() => downloadSingleWorkerHTML(w, 'চুক্তিপত্র_পোর্টাল')}
                          title="HTML ফাইল ডাউনলোড ([কর্মীর নাম]_[ঠিকানা]_[নথি].html)"
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 border border-slate-300"
                        >
                          <Download className="w-3 h-3 text-emerald-700" />
                          <span>.html</span>
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => {
                            if (confirm(`আপনি কি নিশ্চিত যে ${w.workerName}-এর নথিটি মুছে ফেলতে চান?`)) {
                              onDeleteWorker(w.id);
                            }
                          }}
                          title="মুছে ফেলুন"
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1.5 rounded border border-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

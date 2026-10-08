import React from 'react';
import { WorkerData, ViewTab } from '../types';
import { 
  FileText, FileCheck, ShieldCheck, FolderPlus, Globe, Lock, UserPlus, Search, 
  ChevronRight, Printer, Download, Send, Trash2, CheckCircle, Sparkles
} from 'lucide-react';

interface Props {
  workers: WorkerData[];
  onSelectTab: (tab: ViewTab) => void;
  onSelectWorkerDoc: (worker: WorkerData, docType: 'stamp100' | 'cert25' | 'verification') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDeleteWorker: (id: string) => void;
  onTransferToVerification: (id: string) => void;
  onExportWorkerHTML: (worker: WorkerData) => void;
}

export const HomeScreen: React.FC<Props> = ({
  workers,
  onSelectTab,
  onSelectWorkerDoc,
  searchQuery,
  onSearchChange,
  onDeleteWorker,
  onTransferToVerification,
  onExportWorkerHTML
}) => {
  const filteredWorkers = workers.filter(w => 
    w.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.mobile.includes(searchQuery) ||
    w.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.branchOffice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 md:p-8 rounded-2xl shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF) - এইচআর চুক্তি পোর্টাল</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-bn leading-tight">
              কর্মী চুক্তিপত্র, প্রত্যয়ন পত্র ও তথ্য যাচাইকরণ ব্যবস্থাপনা
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              ১০০ টাকার লিগাল স্ট্যাম্প চুক্তিপত্র, ২৫ টাকার প্রত্যয়ন পত্র, ২ পাতার A4 তথ্য যাচাইকরণ ফরম ও রেসপন্সিভ ওয়েব পোর্টাল দ্রুত প্রস্তুত ও প্রিন্ট করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('entry')}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>নতুন কর্মী যোগ করুন</span>
            </button>

            <button 
              onClick={() => onSelectTab('admin')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-600 shadow-md transition"
            >
              <Lock className="w-4 h-4" />
              <span>অ্যাডমিন প্যানেল</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="pt-2">
          <div className="relative max-w-2xl">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="কর্মীর নাম, মোবাইল নম্বর, পদবী বা শাখা দিয়ে দ্রুত অনুসন্ধান করুন..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs md:text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </div>

      {/* 5 Quick Action Cards (কুইক অ্যাকশন কার্ডস) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div 
          onClick={() => {
            if (workers[0]) onSelectWorkerDoc(workers[0], 'stamp100');
            else onSelectTab('entry');
          }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition space-y-3 group"
        >
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-900 transition">
              ১০০Tk স্ট্যাম্প চুক্তিপত্র
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">৩ পাতা লিগাল সাইজ প্রিন্ট (৯ সেঃমিঃ স্ট্যাম্প মার্জিনসহ)</p>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => {
            if (workers[0]) onSelectWorkerDoc(workers[0], 'cert25');
            else onSelectTab('entry');
          }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition space-y-3 group"
        >
          <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-900 transition">
              ২৫Tk প্রত্যয়ন পত্র
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">A4 সাইজ এইচআর লেটারহেড সত্যায়ন ফরম্যাট</p>
          </div>
        </div>

        {/* Card 3 */}
        <div 
          onClick={() => {
            if (workers[0]) onSelectWorkerDoc(workers[0], 'verification');
            else onSelectTab('entry');
          }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition space-y-3 group"
        >
          <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition">
              তথ্য যাচাইকরণ ফরম
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">২ পাতা A4 সাইজ - তথ্য যাচাই শাখা</p>
          </div>
        </div>

        {/* Card 4 */}
        <div 
          onClick={() => onSelectTab('forms_hub')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition space-y-3 group"
        >
          <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center group-hover:bg-purple-800 group-hover:text-white transition">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-900 transition">
              অন্যান্য ফরম হাব
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">আইডি কার্ড, ট্রেনিং ও শপথ, পারিবারিক ঘোষণা</p>
          </div>
        </div>

        {/* Card 5 */}
        <div 
          onClick={() => onSelectTab('web_portal')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition space-y-3 group"
        >
          <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-900 transition">
              ফুল ওয়েব পোর্টাল
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">HTML রেসপন্সিভ সিঙ্গেল-ফাইল ডাউলোড</p>
          </div>
        </div>
      </div>

      {/* Recent Workers / Agreements List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">সাম্প্রতিক চুক্তিপত্র ও কর্মী তালিকা</h3>
            <p className="text-xs text-slate-500">নথি নির্বাচন করে ১০০Tk স্ট্যাম্প, ২৫Tk প্রত্যয়ন বা তথ্য যাচাই ফরম প্রিভিউ করুন</p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onSelectTab('admin')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>সকল চুক্তিপত্র ড্যাশবোর্ড</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredWorkers.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              কোনো কর্মী রেকর্ড পাওয়া যায়নি। নতুন কর্মী যোগ করতে "নতুন কর্মী যোগ করুন" বাটনে ক্লিক করুন।
            </div>
          ) : (
            filteredWorkers.map(w => (
              <div 
                key={w.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{w.workerName}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                      {w.slNo}
                    </span>
                    {w.status === 'verified' && (
                      <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">
                        যাচাইকৃত
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">
                    {w.designation} · {w.branchOffice}
                  </p>
                  <p className="text-xs text-slate-500">
                    📞 {w.mobile} | 📍 স্থায়ী: {w.permVillage}, {w.permDistrict} | যোগদানের তারিখ: {w.joiningDate}
                  </p>
                </div>

                {/* Quick Document Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button 
                    onClick={() => onSelectWorkerDoc(w, 'stamp100')}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>১০০Tk স্ট্যাম্প</span>
                  </button>

                  <button 
                    onClick={() => onSelectWorkerDoc(w, 'cert25')}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>২৫Tk প্রত্যয়ন</span>
                  </button>

                  <button 
                    onClick={() => onSelectWorkerDoc(w, 'verification')}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>তথ্য যাচাই</span>
                  </button>

                  <button 
                    onClick={() => onExportWorkerHTML(w)}
                    title="HTML এক্সপোর্ট"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg border border-slate-300 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-800" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

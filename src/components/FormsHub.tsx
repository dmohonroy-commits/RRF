import React, { useState } from 'react';
import { WorkerData } from '../types';
import { CreditCard, Award, Users, Printer, CheckCircle } from 'lucide-react';

interface Props {
  worker: WorkerData;
}

export const FormsHub: React.FC<Props> = ({ worker }) => {
  const [activeTab, setActiveTab] = useState<'id_card' | 'training' | 'family'>('id_card');

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tabs */}
      <div className="no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">অন্যান্য চুক্তিপত্র ও সার্ভিস ফরম হাব</h2>
          <p className="text-xs text-slate-500">কর্মী: {worker.workerName} ({worker.designation})</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('id_card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'id_card' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>আইডি কার্ড ফরম</span>
          </button>

          <button 
            onClick={() => setActiveTab('training')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'training' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ট্রেনিং ও শপথ গ্রহণ</span>
          </button>

          <button 
            onClick={() => setActiveTab('family')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'family' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>পারিবারিক সম্পর্ক ঘোষণা</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow hover:bg-emerald-900 transition"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট করুন</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ID Card Request Form */}
      {activeTab === 'id_card' && (
        <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-3xl mx-auto space-y-6">
          <div className="text-center border-b-2 border-emerald-800 pb-3">
            <h2 className="text-2xl font-bold font-serif-bn text-emerald-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h2>
            <p className="text-xs text-slate-600 font-semibold">অফিশিয়াল স্টাফ পরিচয়পত্র (ID Card) আবেদন ফরম</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p><strong>কর্মীর নাম:</strong> {worker.workerName}</p>
            <p><strong>আইডি নং / ক্রমিক:</strong> {worker.slNo}</p>
            <p><strong>পদবী:</strong> {worker.designation}</p>
            <p><strong>শাখা কার্যালয়:</strong> {worker.branchOffice}</p>
            <p><strong>মোবাইল নং:</strong> {worker.mobile}</p>
            <p><strong>রক্তের গ্রুপ:</strong> {worker.idCardBloodGroup || 'O+'}</p>
            <p><strong>যোগদানের তারিখ:</strong> {worker.joiningDate}</p>
            <p><strong>জরুরী যোগাযোগ:</strong> {worker.guarantor1.mobile} ({worker.guarantor1.relation})</p>
          </div>

          <div className="text-xs text-justify leading-relaxed text-slate-700 space-y-2">
            <p>
              আমি অঙ্গীকার করিতেছি যে, উল্লেখিত সকল তথ্য আমার জাতীয় পরিচয়পত্র অনুযায়ী সঠিক। অফিশিয়াল পরিচয়পত্রটি আমি কর্মক্ষেত্রে সর্বদা দৃশ্যমান রাখিব এবং চাকুরী ত্যাগকালে কার্ডটি সংস্থায় জমা প্রদান করিব।
            </p>
          </div>

          <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs font-bold">
            <div>
              <p className="border-t border-slate-600 pt-1">আবেদনকারী কর্মীর স্বাক্ষর</p>
            </div>
            <div>
              <p className="border-t border-slate-600 pt-1">শাখা ব্যবস্থাপকের সত্যায়ন ও সিল</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Training & Oath Confirmation */}
      {activeTab === 'training' && (
        <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-3xl mx-auto space-y-6">
          <div className="text-center border-b-2 border-emerald-800 pb-3">
            <h2 className="text-2xl font-bold font-serif-bn text-emerald-900">রুরাল রিকন্সট্রাকশন FOUNDATION (RRF)</h2>
            <p className="text-xs text-slate-600 font-semibold">মৌলিক পরিচিতি ট্রেনিং ও নীতিমালা শপথ গ্রহণ ফরম</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-xs space-y-2">
            <p><strong>ট্রেনিং ব্যাচ নং:</strong> {worker.trainingBatchNo || 'RRF-TR-94'}</p>
            <p><strong>অংশগ্রহণকারী কর্মী:</strong> {worker.workerName} ({worker.designation})</p>
            <p><strong>স্থান:</strong> আরআরএফ প্রশিক্ষণ কেন্দ্র, আরবপুর, যশোর</p>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-justify text-slate-800">
            <h3 className="font-bold text-slate-900 text-sm">শপথ বাক্য:</h3>
            <p className="p-3 bg-slate-50 border-l-4 border-emerald-800 italic">
              "আমি স্বজ্ঞানে শপথ করিতেছি যে, রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)-এর আদর্শ, মূল্যবোধ ও চাকুরীর শৃঙ্খলা রক্ষা করিয়া চলিব। কোনো গ্রাহক বা কর্মীর সহিত অসদাচরণ করিব না এবং সংস্থার তহবিল সুরক্ষায় সর্বদা সচেষ্ট থাকিব।"
            </p>
          </div>

          <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs font-bold">
            <div>
              <p className="border-t border-slate-600 pt-1">ট্রেইনি কর্মীর স্বাক্ষর</p>
            </div>
            <div>
              <p className="border-t border-slate-600 pt-1">প্রশিক্ষণ কো-অর্ডিনেটর, RRF</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Family Relationship Declaration */}
      {activeTab === 'family' && (
        <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-3xl mx-auto space-y-6">
          <div className="text-center border-b-2 border-emerald-800 pb-3">
            <h2 className="text-2xl font-bold font-serif-bn text-emerald-900">রুরাল রিকন্সট্রাকশন FOUNDATION (RRF)</h2>
            <p className="text-xs text-slate-600 font-semibold">পারিবারিক সম্পর্ক ও স্বজনপ্রীতি রোধ ঘোষণা ফরম</p>
          </div>

          <div className="text-xs text-justify leading-relaxed space-y-3 text-slate-800">
            <p>
              আমি <strong>{worker.workerName}</strong>, পদবী: <strong>{worker.designation}</strong>, শাখা: <strong>{worker.branchOffice}</strong>, এই মর্মে ঘোষণা করিতেছি যে, আমার কোনো নিকটাত্মীয় (পিতা, মাতা, ভাই, বোন, স্বামী/স্ত্রী) RRF-এর একই শাখা বা নিয়ন্ত্রণকারী পদে কর্মরত নাই।
            </p>

            <div className="bg-slate-50 p-3 rounded border text-xs">
              <p><strong>ঘোষিত মোট পরিবার সদস্য সংখ্যা:</strong> {worker.familyMembersCount || 4} জন</p>
              <p className="mt-1"><strong>জরুরী অভিভাবক:</strong> {worker.fatherHusbandName} (ফোন: {worker.mobile})</p>
            </div>
          </div>

          <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs font-bold">
            <div>
              <p className="border-t border-slate-600 pt-1">ঘোষণাকারীর স্বাক্ষর</p>
            </div>
            <div>
              <p className="border-t border-slate-600 pt-1">এইচআর অফিসার</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { WorkerData } from '../types';
import { Printer, ShieldCheck, UserCheck, Download, CheckCircle } from 'lucide-react';

interface Props {
  worker: WorkerData;
  onSaveVerification?: (updatedWorker: WorkerData) => void;
  onExportHTML?: () => void;
}

export const FormVerification: React.FC<Props> = ({ worker, onSaveVerification, onExportHTML }) => {
  const [verification, setVerification] = useState(worker.verificationData || {
    relatives: worker.verificationData?.relatives || [
      { name: worker.fatherHusbandName, relation: 'পিতা/স্বামী', occupation: 'ব্যবসায়ী', address: worker.permVillage, mobile: worker.mobile }
    ],
    chairmanName: worker.verificationData?.chairmanName || 'মোঃ আব্দুল কুদ্দুস',
    chairmanUnionName: worker.verificationData?.chairmanUnionName || 'চাঁচড়া ইউনিয়ন পরিষদ',
    chairmanOpinion: worker.verificationData?.chairmanOpinion || 'উক্ত কর্মী অত্যন্ত সৎ, কর্মঠ ও চরিত্রবান। তাহার বিরুদ্ধে সামাজিক কোনো অভিযোগ পাওয়া যায়নি।',
    neighbor1Name: worker.verificationData?.neighbor1Name || 'আলহাজ্ব মোঃ জহুরুল হক',
    neighbor1Opinion: worker.verificationData?.neighbor1Opinion || 'ব্যক্তিগতভাবে পরিবারটিকে চিনি। সম্ভ্রান্ত ও নির্ভরযোগ্য পরিবার।',
    neighbor2Name: worker.verificationData?.neighbor2Name || 'প্রভাষক মোস্তফা কামাল',
    neighbor2Opinion: worker.verificationData?.neighbor2Opinion || 'প্রার্থী সুশিক্ষিত ও সুনামের সহিত সামাজিক কর্মকাণ্ডে যুক্ত।',
    staffBondAgreed: worker.verificationData?.staffBondAgreed ?? true,
    investigatingOfficerName: worker.verificationData?.investigatingOfficerName || 'মোঃ সাজ্জাদ হোসেন',
    investigatingOfficerDesignation: worker.verificationData?.investigatingOfficerDesignation || 'সিনিয়র মনিটরিং অফিসার, তথ্য যাচাই শাখা, RRF',
    investigationComments: worker.verificationData?.investigationComments || 'সরজমিনে কর্মীর স্থায়ী ও বর্তমান ঠিকানা সঠিকভাবে যাচাই করা হইয়াছে। জামিনদারদের প্রদত্ত তথ্য ও স্বাক্ষর নির্ভুল পাওয়া গিয়াছে।',
    recommendationStatus: worker.verificationData?.recommendationStatus || 'recommended',
    investigationDate: worker.verificationData?.investigationDate || new Date().toISOString().split('T')[0]
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    const updated: WorkerData = {
      ...worker,
      status: verification.recommendationStatus === 'recommended' ? 'verified' : 'verification_pending',
      verificationData: verification
    };
    if (onSaveVerification) {
      onSaveVerification(updated);
    }
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>কর্মী তথ্য যাচাইকরণ ফরম (২ পাতা A4 - তথ্য যাচাই শাখা)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            কর্মী: <span className="font-semibold text-slate-800">{worker.workerName}</span> ({worker.designation})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
          >
            <UserCheck className="w-4 h-4" />
            <span>{isEditing ? 'প্রিভিউ মোড' : 'তথ্য সম্পাদনা করুন'}</span>
          </button>

          {isEditing && (
            <button 
              onClick={handleSave}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
            >
              সংরক্ষণ করুন
            </button>
          )}

          {onExportHTML && (
            <button 
              onClick={onExportHTML}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              <span>HTML এক্সপোর্ট</span>
            </button>
          )}

          <button 
            onClick={handlePrint}
            className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition"
          >
            <Printer className="w-4 h-4" />
            <span>২ পাতা A4 প্রিন্ট / PDF</span>
          </button>
        </div>
      </div>

      {/* Editing Drawer Form (No Print) */}
      {isEditing && (
        <div className="no-print bg-amber-50 border border-amber-200 p-5 rounded-xl shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-amber-900 text-sm border-b border-amber-300 pb-2">
            তথ্য যাচাই শাখার ইনপুট সম্পাদনা
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">চেয়ারম্যান/কাউন্সিলর নাম ও ইউনিয়ন:</label>
              <input 
                type="text"
                value={verification.chairmanName}
                onChange={(e) => setVerification({ ...verification, chairmanName: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">চেয়ারম্যানের চারিত্রিক মতামত:</label>
              <input 
                type="text"
                value={verification.chairmanOpinion}
                onChange={(e) => setVerification({ ...verification, chairmanOpinion: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">প্রতিবেশী ১ নাম ও মতামত:</label>
              <input 
                type="text"
                value={verification.neighbor1Opinion}
                onChange={(e) => setVerification({ ...verification, neighbor1Opinion: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">তদন্তকারী কর্মকর্তা নাম ও পদবী:</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text"
                  value={verification.investigatingOfficerName}
                  onChange={(e) => setVerification({ ...verification, investigatingOfficerName: e.target.value })}
                  placeholder="নাম"
                  className="p-2 border rounded bg-white text-xs"
                />
                <input 
                  type="text"
                  value={verification.investigatingOfficerDesignation}
                  onChange={(e) => setVerification({ ...verification, investigatingOfficerDesignation: e.target.value })}
                  placeholder="পদবী"
                  className="p-2 border rounded bg-white text-xs"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">তদন্তকারীর সুনির্দিষ্ট মন্তব্য:</label>
              <textarea 
                rows={2}
                value={verification.investigationComments}
                onChange={(e) => setVerification({ ...verification, investigationComments: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">চূড়ান্ত সিদ্ধান্ত:</label>
              <select 
                value={verification.recommendationStatus}
                onChange={(e) => setVerification({ ...verification, recommendationStatus: e.target.value as any })}
                className="w-full p-2 border rounded bg-white text-xs font-bold text-emerald-900"
              >
                <option value="recommended">✅ সুপারিশকৃত (Recommended)</option>
                <option value="rejected">❌ প্রত্যাখ্যাত (Rejected)</option>
                <option value="pending">⏳ বিবেচনাধীন (Pending)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Printable 2-Page Document */}
      <div className="print-container space-y-8 bg-white p-6 md:p-10 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-4xl mx-auto">
        
        {/* PAGE 1: Verification Form Page 1 */}
        <div className="a4-page page-break text-xs space-y-4">
          {/* Header */}
          <div className="text-center border-b-2 border-emerald-900 pb-3 mb-4">
            <h1 className="text-xl font-bold font-serif-bn text-emerald-950">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h1>
            <p className="text-[11px] text-slate-600 font-semibold">তথ্য যাচাই শাখা (Information Verification Branch) · প্রধান কার্যালয়, যশোর</p>
            <div className="mt-2 inline-block bg-emerald-900 text-white px-4 py-1 rounded text-xs font-bold">
              কর্মী তথ্য যাচাইকরণ ফরম (পাতা - ০১)
            </div>
          </div>

          {/* Section A: Employee Profile */}
          <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <h3 className="font-bold text-sm text-emerald-900 mb-2 border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>সেকশন এ: কর্মীর ব্যক্তিগত ও অফিশিয়াল প্রোফাইল</span>
              <span className="text-xs text-slate-500 font-mono">আইডি: {worker.slNo}</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 leading-relaxed">
              <p><strong>১. কর্মীর নাম:</strong> {worker.workerName}</p>
              <p><strong>২. পদবী:</strong> {worker.designation}</p>
              <p><strong>৩. পিতা/স্বামীর নাম:</strong> {worker.fatherHusbandName}</p>
              <p><strong>৪. মাতার নাম:</strong> {worker.motherName}</p>
              <p><strong>৫. মোবাইল নম্বর:</strong> {worker.mobile}</p>
              <p><strong>৬. এনআইডি/জন্ম সনদের নং:</strong> {worker.nidNumber}</p>
              <p><strong>৭. যোগদানকৃত শাখা:</strong> {worker.branchOffice}</p>
              <p><strong>৮. যোগদানের তারিখ:</strong> {worker.joiningDate}</p>
              <p><strong>৯. স্থায়ী ঠিকানা:</strong> {worker.permVillage}, {worker.permPost}, {worker.permUpazila}, {worker.permDistrict}</p>
              <p className="col-span-2"><strong>১০. বর্তমান ঠিকানা:</strong> {worker.presAddress}</p>
            </div>
          </div>

          {/* Section B: Relatives Info */}
          <div className="border border-slate-300 rounded-lg p-3 bg-white">
            <h3 className="font-bold text-sm text-emerald-900 mb-2 border-b border-slate-300 pb-1">
              সেকশন বি: নিকটাত্মীয়দের নাম, পেশা ও যোগাযোগের ঠিকানা
            </h3>

            <table className="w-full border-collapse border border-slate-300 text-left text-xs mb-2">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-800">
                  <th className="border p-1.5">ক্রঃ</th>
                  <th className="border p-1.5">নাম</th>
                  <th className="border p-1.5">সম্পর্ক</th>
                  <th className="border p-1.5">পেশা</th>
                  <th className="border p-1.5">ঠিকানা</th>
                  <th className="border p-1.5">মোবাইল নং</th>
                </tr>
              </thead>
              <tbody>
                {verification.relatives.map((rel, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="border p-1.5 font-bold text-center">{i + 1}</td>
                    <td className="border p-1.5 font-medium">{rel.name || '-'}</td>
                    <td className="border p-1.5">{rel.relation || '-'}</td>
                    <td className="border p-1.5">{rel.occupation || '-'}</td>
                    <td className="border p-1.5">{rel.address || '-'}</td>
                    <td className="border p-1.5">{rel.mobile || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section C: Chairman / Councillor Verification */}
          <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <h3 className="font-bold text-sm text-emerald-900 mb-2 border-b border-slate-300 pb-1">
              সেকশন সি: ইউনিয়ন পরিষদ চেয়ারম্যান / ওয়ার্ড কাউন্সিলর এর চারিত্রিক তথ্য যাচাই
            </h3>
            <div className="space-y-2">
              <p><strong>জনপ্রতিনিধির নাম ও প্রতিষ্ঠান:</strong> {verification.chairmanName} ({verification.chairmanUnionName})</p>
              <p><strong>চারিত্রিক ও সামাজিক মতামত:</strong> "{verification.chairmanOpinion}"</p>
            </div>
          </div>

          {/* Section D: Neighbors & Respected Persons */}
          <div className="border border-slate-300 rounded-lg p-3 bg-white">
            <h3 className="font-bold text-sm text-emerald-900 mb-2 border-b border-slate-300 pb-1">
              সেকশন ডি: স্থানীয় প্রতিবেশী ও সম্মানিত ব্যক্তিবর্গের মতামত
            </h3>
            <div className="space-y-2">
              <p><strong>১. প্রতিবেশী ১ ({verification.neighbor1Name}):</strong> {verification.neighbor1Opinion}</p>
              <p><strong>২. প্রতিবেশী ২ ({verification.neighbor2Name}):</strong> {verification.neighbor2Opinion}</p>
            </div>
          </div>

          <div className="mt-8 text-right text-xs font-bold text-slate-500">
            [পাতা ১ সমাপ্ত - ২য় পাতা স্টাফ বন্ড ও সিদ্ধান্ত দ্রষ্টব্য]
          </div>
        </div>

        {/* PAGE 2: Verification Form Page 2 */}
        <div className="a4-page text-xs space-y-4">
          <div className="text-center border-b-2 border-emerald-900 pb-2 mb-4">
            <h2 className="text-lg font-bold font-serif-bn text-emerald-950">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h2>
            <p className="text-xs font-bold text-slate-700">কর্মী তথ্য যাচাইকরণ ফরম (পাতা - ০২)</p>
          </div>

          {/* Section E: Staff Bond Clause */}
          <div className="border border-slate-300 rounded-lg p-4 bg-slate-50 space-y-3">
            <h3 className="font-bold text-sm text-emerald-900 border-b border-slate-300 pb-1">
              সেকশন ই: কর্মী অঙ্গীকারনামা ও স্টাফ বন্ড (Staff Bond Clause)
            </h3>
            
            <p className="text-justify leading-relaxed">
              আমি <strong>{worker.workerName}</strong>, এই মর্মে স্টাফ বন্ড প্রদান করিতেছি যে, সংস্থায় চাকুরীতে যোগদান করার পর প্রদত্ত সকল তথ্যাবলী সত্য ও সঠিক প্রমাণিত হইয়াছে। যদি ভবিষ্যতে কোনো তথ্য অসত্য, জাল বা বিভ্রান্তিকর প্রমাণিত হয়, তবে সংস্থা কোনো প্রকার কারণ দর্শানো ব্যতিরেকে আমার চাকুরী অবসান করিতে পারিবে এবং আইনি ব্যবস্থা গ্রহণ করিতে পারিবে।
            </p>

            <div className="flex items-center gap-2 pt-2 text-emerald-900 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>কর্মী স্টাফ বন্ডের সকল শর্তাবলীতে সম্মত্তি জ্ঞাপন করিয়াছেন।</span>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-4 text-center font-bold">
              <div>
                <p className="border-t border-slate-500 pt-1">কর্মীর পূর্ণ স্বাক্ষর</p>
                <p className="text-[10px] text-slate-500 font-normal">{worker.workerName}</p>
              </div>
              <div>
                <p className="border-t border-slate-500 pt-1">প্রধান জামিনদারের স্বাক্ষর</p>
                <p className="text-[10px] text-slate-500 font-normal">{worker.guarantor1.name}</p>
              </div>
            </div>
          </div>

          {/* Section F: Investigating Officer Decision */}
          <div className="border-2 border-emerald-800 rounded-lg p-4 bg-emerald-50/50 space-y-3">
            <h3 className="font-bold text-sm text-emerald-950 border-b border-emerald-300 pb-1 flex items-center justify-between">
              <span>সেকশন এফ: তদন্তকারী কর্মকর্তার (Investigating Officer) সুনির্দিষ্ট মন্তব্য ও সিদ্ধান্ত</span>
              <span className="text-xs bg-emerald-800 text-white px-2 py-0.5 rounded font-mono">
                তারিখ: {verification.investigationDate}
              </span>
            </h3>

            <div>
              <p><strong>তদন্তকারী কর্মকর্তা:</strong> {verification.investigatingOfficerName}</p>
              <p><strong>পদবী:</strong> {verification.investigatingOfficerDesignation}</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 mb-1">তদন্তকালীন সুনির্দিষ্ট মন্তব্য:</p>
              <div className="p-3 bg-white rounded border border-emerald-200 text-slate-800 leading-relaxed">
                "{verification.investigationComments}"
              </div>
            </div>

            {/* Decision Box */}
            <div className="p-3 bg-white rounded border-2 border-emerald-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">তদন্তকারী শাখার চূড়ান্ত সুপারিশ:</span>
              </div>
              <div>
                {verification.recommendationStatus === 'recommended' && (
                  <span className="bg-emerald-800 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow">
                    ✅ চাকুরীর জন্য সুপারিশকৃত (RECOMMENDED)
                  </span>
                )}
                {verification.recommendationStatus === 'rejected' && (
                  <span className="bg-rose-700 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow">
                    ❌ আবেদন প্রত্যাখ্যাত (REJECTED)
                  </span>
                )}
                {verification.recommendationStatus === 'pending' && (
                  <span className="bg-amber-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow">
                    ⏳ তদন্তাধীন (PENDING)
                  </span>
                )}
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-12 grid grid-cols-2 gap-8 text-center font-bold text-slate-900">
              <div>
                <div className="border-t border-slate-700 pt-1">
                  তদন্তকারী কর্মকর্তার স্বাক্ষর ও নামীয় সিল
                  <p className="text-[10px] text-slate-500 font-normal">{verification.investigatingOfficerName}</p>
                </div>
              </div>
              <div>
                <div className="border-t border-slate-700 pt-1">
                  অনুমোদনকারী কর্তৃপক্ষের স্বাক্ষর ও অফিশিয়াল সিল
                  <p className="text-[10px] text-slate-500 font-normal">প্রধান, তথ্য যাচাই শাখা, RRF</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

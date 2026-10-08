import React from 'react';
import { WorkerData } from '../types';
import { Printer, FileCheck, Download } from 'lucide-react';

interface Props {
  worker: WorkerData;
  onExportHTML?: () => void;
}

export const FormCert25: React.FC<Props> = ({ worker, onExportHTML }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-700" />
            <span>২৫ টাকার প্রত্যয়ন পত্র (A4 Size Letterhead)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            কর্মী: <span className="font-semibold text-slate-800">{worker.workerName}</span> ({worker.designation})
          </p>
        </div>

        <div className="flex items-center gap-3">
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
            <span>A4 প্রিন্ট / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable A4 Certificate Page */}
      <div className="print-container bg-white p-8 md:p-12 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-3xl mx-auto a4-page">
        
        {/* Official HR Letterhead */}
        <div className="border-b-2 border-emerald-800 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-800 text-white font-bold rounded-lg flex items-center justify-center text-xl shadow">
              RRF
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif-bn text-emerald-900 leading-tight">
                রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)
              </h1>
              <p className="text-xs text-slate-600 font-semibold">
                আরআরএফ ভবন, আরআরএফ সড়ক, উপশহর, যশোর-৭৪০০, বাংলাদেশ।
              </p>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">
                মানব সম্পদ ও প্রশাসন বিভাগ (Human Resource & Admin)
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            <p>ফোন: 02477763150</p>
            <p>ইমেইল: hr@rrfbd.org</p>
            <p>ওয়েব: www.rrfbd.org</p>
          </div>
        </div>

        {/* Ref and Date */}
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-8">
          <p>স্মারক নম্বর: <strong>RRF/HR/CERT-25/{worker.slNo}</strong></p>
          <p>তারিখ: <strong>{worker.joiningDate}</strong> খ্রিঃ</p>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="inline-block border-b-2 border-slate-900 text-xl font-bold font-serif-bn tracking-wide text-slate-900 pb-1">
            প্রত্যয়ন পত্র (CERTIFICATE)
          </h2>
        </div>

        {/* Body Prose */}
        <div className="text-sm md:text-base leading-relaxed space-y-6 text-justify text-slate-800">
          <p>
            এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <strong>{worker.workerName}</strong>, পিতা/স্বামী: <strong>{worker.fatherHusbandName}</strong>, মাতা: <strong>{worker.motherName}</strong>, স্থায়ী ঠিকানা: গ্রাম/রাস্তা: {worker.permVillage}, ডাকঘর: {worker.permPost}, উপজেলা/থানা: {worker.permUpazila}, জেলা: {worker.permDistrict}। তিনি রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)-এর <strong>{worker.branchOffice}</strong> কার্যালয়ে <strong>{worker.designation}</strong> পদে আগামী <strong>{worker.joiningDate}</strong> খ্রিঃ তারিখ হইতে চাকুরীতে যোগদান করার জন্য নির্বাচিত হইয়াছেন।
          </p>

          <p>
            সংস্থার প্রচলিত নিয়মাবলী অনুযায়ী ২৫ টাকার প্রত্যয়ন পত্র বন্ড হিসেবে তাহার জামিনদার হিসেবে <strong>{worker.guarantor1.name}</strong> (সম্পর্ক: {worker.guarantor1.relation}, ঠিকানা: {worker.guarantor1.address}, এনআইডি নং: {worker.guarantor1.nid}, মোবাইল: {worker.guarantor1.mobile}) দায়িত্ব গ্রহণ করিয়াছেন।
          </p>

          <p>
            আমাদের জানা মতে এবং স্থানীয় পুলিশ প্রশাসন ও এলাকার গণ্যমান্য ব্যক্তিবর্গের নিকট হইতে প্রাপ্ত তথ্যানুযায়ী তিনি নৈতিক চরিত্র সম্পন্ন, কোনো রাষ্ট্রবিরোধী বা সমাজবিরোধী কার্যকলাপের সহিত জড়িত নহেন।
          </p>

          <p>
            আমরা তাহার উত্তরোত্তর পেশাগত সাফল্য ও সার্বিক মঙ্গল কামনা করি।
          </p>
        </div>

        {/* Guarantor & Witness Summary Table */}
        <div className="mt-8 border border-slate-300 rounded-lg p-4 bg-slate-50 text-xs space-y-2">
          <p className="font-bold text-slate-900 border-b border-slate-300 pb-1">সত্যায়নকারী জামিনদার ও সাক্ষীগণের সংক্ষিপ্ত বিবরণ:</p>
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <p>• <strong>প্রধান জামিনদার:</strong> {worker.guarantor1.name}</p>
              <p className="text-slate-600">• এনআইডি: {worker.guarantor1.nid} | ফোন: {worker.guarantor1.mobile}</p>
            </div>
            <div>
              <p>• <strong>প্রাসঙ্গিক সাক্ষী:</strong> {worker.witness1.name}</p>
              <p className="text-slate-600">• ঠিকানা: {worker.witness1.address} | ফোন: {worker.witness1.mobile}</p>
            </div>
          </div>
        </div>

        {/* Official Signatures Block */}
        <div className="mt-20 pt-10 border-t border-slate-300 grid grid-cols-3 gap-4 text-xs font-bold text-slate-800 text-center">
          <div>
            <div className="border-t border-slate-700 pt-1">
              প্রস্তুতকারীর স্বাক্ষর
              <p className="text-[10px] text-slate-500 font-normal">এইচআর এক্সিকিউটিভ</p>
            </div>
          </div>

          <div>
            <div className="border-t border-slate-700 pt-1">
              যাচাইকারীর স্বাক্ষর
              <p className="text-[10px] text-slate-500 font-normal">সহকারী পরিচালক (এইচআর)</p>
            </div>
          </div>

          <div>
            <div className="border-t border-slate-700 pt-1">
              সত্যায়নকারী কর্তৃপক্ষের স্বাক্ষর ও সিল
              <p className="text-[10px] text-slate-500 font-normal">পরিচালক (এইচআর ও প্রশাসন), RRF</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

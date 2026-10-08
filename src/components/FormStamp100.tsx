import React, { useState } from 'react';
import { WorkerData } from '../types';
import { Printer, FileText, Download } from 'lucide-react';

interface Props {
  worker: WorkerData;
  onBack?: () => void;
  onExportHTML?: () => void;
}

export const FormStamp100: React.FC<Props> = ({ worker, onExportHTML }) => {
  const [leaveStampMargin, setLeaveStampMargin] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>১০০ টাকার স্ট্যাম্প চুক্তিপত্র (৩ পাতা - Legal Size)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            কর্মী: <span className="font-semibold text-slate-800">{worker.workerName}</span> ({worker.designation})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Stamp Margin Toggle Switch */}
          <label className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-900 cursor-pointer hover:bg-amber-100 transition">
            <input 
              type="checkbox" 
              checked={leaveStampMargin} 
              onChange={(e) => setLeaveStampMargin(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <span>১০০ টাকার স্ট্যাম্পের খালি জায়গা (৯ সেঃমিঃ) ছেড়ে প্রিন্ট করুন</span>
          </label>

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
            <span>লিগাল সাইজ প্রিন্ট / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable 3-Page Document Container */}
      <div className="print-container space-y-8 bg-white p-6 md:p-10 rounded-xl shadow-md border border-slate-200 text-slate-900 max-w-4xl mx-auto">
        
        {/* PAGE 1: Stamp Page 1 */}
        <div className={`legal-page page-break ${leaveStampMargin ? 'stamp-margin-top' : ''}`}>
          {/* Optional visual stamp placeholder indicator for screen */}
          {leaveStampMargin && (
            <div className="no-print mb-6 border-2 border-dashed border-amber-300 bg-amber-50/50 p-4 rounded-lg text-center text-xs text-amber-800 font-medium">
              🏷️ ১০০ টাকার জুডিশিয়াল স্ট্যাম্পের ৯ সেঃমিঃ খালি জায়গা (প্রিন্ট করলে এটি ফাঁকা থাকবে)
            </div>
          )}

          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h1 className="text-2xl font-bold font-serif-bn text-slate-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h1>
            <p className="text-xs font-semibold text-slate-700">প্রধান কার্যালয়: আরআরএফ ভবন, আরআরএফ সড়ক, উপশহর, যশোর-৭৪০০</p>
            <div className="mt-2 inline-block bg-slate-900 text-white px-4 py-1 rounded text-sm font-bold">
              চাকুরীর চুক্তিপত্র (স্ট্যাম্প পাতা - ০১)
            </div>
          </div>

          <div className="text-justify text-xs md:text-sm leading-relaxed space-y-4">
            <p className="font-semibold text-slate-800">
              স্মারক নম্বর: RRF/HR/STAMP/{worker.slNo} <span className="float-right">তারিখ: {worker.joiningDate}</span>
            </p>

            <p>
              এই চুক্তিপত্রটি আজ <strong>{worker.joiningDate}</strong> খ্রিঃ তারিখে ১ম পক্ষ <strong>রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</strong>, প্রধান কার্যালয়: উপশহর, যশোর (যাহাকে অতঃপর 'সংস্থা' বা 'প্রথম পক্ষ' বলিয়া গণ্য করা হইবে) এবং ২য় পক্ষ <strong>{worker.workerName}</strong> (যাহাকে অতঃপর 'কর্মী' বা 'second party' বলিয়া গণ্য করা হইবে)-এর মধ্যে সম্পাদিত হইল।
            </p>

            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <p><strong>দ্বিতীয় পক্ষের সংক্ষিপ্ত পরিচয়:</strong></p>
              <p>• কর্মীর নাম: <strong>{worker.workerName}</strong></p>
              <p>• পিতা/স্বামীর নাম: <strong>{worker.fatherHusbandName}</strong></p>
              <p>• মাতার নাম: <strong>{worker.motherName}</strong></p>
              <p>• স্থায়ী ঠিকানা: গ্রাম/রাস্তা: {worker.permVillage}, ডাকঘর: {worker.permPost}, উপজেলা: {worker.permUpazila}, জেলা: {worker.permDistrict}</p>
              <p>• বর্তমান ঠিকানা: {worker.presAddress}</p>
              <p>• মোবাইল নং: {worker.mobile} | এনআইডি/জন্ম নিবন্ধন: {worker.nidNumber}</p>
              <p>• পদবী: <strong>{worker.designation}</strong> | যোগদানকৃত শাখা: <strong>{worker.branchOffice}</strong></p>
            </div>

            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-300 pb-1 mt-4">চুক্তির শর্তাবলী (ধারা ১ থেকে ধারা ৫):</h3>

            <p>
              <strong>১. চাকুরীর দায়িত্ব ও আনুগত্য:</strong> দ্বিতীয় পক্ষ ১ম পক্ষের নিয়মানুযায়ী অর্পিত সকল দায়িত্ব সততা, নিষ্ঠা ও দক্ষতার সহিত পালন করিবেন। তিনি সংস্থার স্বার্থ পরিপন্থী কোনো কার্যকলাপে লিপ্ত হইতে পারিবেন না।
            </p>

            <p>
              <strong>২. জামানত ও বন্ড:</strong> দ্বিতীয় পক্ষ সংস্থায় চাকুরীতে যোগদানের পূর্বে সংস্থার নির্ধারিত জামানত বা জামিনদার বন্ড জমাদান করিতে বাধ্য থাকিবেন।
            </p>

            <p>
              <strong>৩. আর্থিক সততা:</strong> দ্বিতীয় পক্ষ কোনো অবস্থাতেই সংস্থার সঞ্চয়, ঋণ বা অন্যান্য তহবিল নিজস্ব বা অননুমোদিত কাজে ব্যবহার করিতে পারিবেন না। কোনোপ্রকার তছরুপ পরিলক্ষিত হইলে তাহা ফৌজদারী অপরাধ হিসেবে গণ্য হইবে।
            </p>

            <p>
              <strong>৪. বদলী ও পদায়ন:</strong> প্রথম পক্ষ সংস্থা কর্তৃক দ্বিতীয় পক্ষকে সংস্থার যেকোনো শাখা কার্যালয় বা প্রকল্পে বদলী বা পদায়ন করার সর্বময় ক্ষমতা সংরক্ষণ করে।
            </p>

            <p>
              <strong>৫. গোপনীয়তা রক্ষা:</strong> দ্বিতীয় পক্ষ সংস্থার যাবতীয় নথি, পাসওয়ার্ড, গ্রাহক তথ্য ও হিসাবের পূর্ণ গোপনীয়তা বজায় রাখিবেন।
            </p>
          </div>

          <div className="mt-12 text-right text-xs font-bold text-slate-500">
            [পাতা ১ সমাপ্ত - ২য় পাতায় দ্রষ্টব্য]
          </div>
        </div>

        {/* PAGE 2: Stamp Page 2 */}
        <div className={`legal-page page-break ${leaveStampMargin ? 'stamp-margin-top' : ''}`}>
          {leaveStampMargin && (
            <div className="no-print mb-6 border-2 border-dashed border-amber-300 bg-amber-50/50 p-4 rounded-lg text-center text-xs text-amber-800 font-medium">
              🏷️ ১০০ টাকার জুডিশিয়াল স্ট্যাম্পের ৯ সেঃমিঃ খালি জায়গা (প্রিন্ট করলে এটি ফাঁকা থাকবে)
            </div>
          )}

          <div className="text-center border-b border-slate-400 pb-2 mb-4">
            <h2 className="text-lg font-bold text-slate-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h2>
            <p className="text-xs font-bold text-emerald-800">চাকুরীর চুক্তিপত্র (স্ট্যাম্প পাতা - ০২)</p>
          </div>

          <div className="text-justify text-xs md:text-sm leading-relaxed space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-300 pb-1">চুক্তির অবশিষ্টাংশ শর্তাবলী (ধারা ৬ থেকে ধারা ১২):</h3>

            <p>
              <strong>৬. চাকুরী ইস্তফা/অবসান:</strong> দ্বিতীয় পক্ষ চাকুরী ইস্তফা দিতে চাহিলে ন্যূনতম ৩০ (ত্রিশ) দিন পূর্বে প্রথম পক্ষকে লিখিত নোটিশ প্রদান করিতে হইবে, অন্যথায় ৩০ দিনের বেতন কর্তন বা জামানত বাজেয়াপ্ত করা হইবে।
            </p>

            <p>
              <strong>৭. শৃঙ্খলাভঙ্গ ও বরখাস্ত:</strong> নৈতিক অবক্ষয়, অনিয়ম, কর্মস্থলে অনুপস্থিতি বা কর্তৃপক্ষের আদেশ অমান্য করিলে কোনো প্রকার পূর্ব নোটিশ ছাড়াই প্রথম পক্ষ দ্বিতীয় পক্ষকে চাকুরী হইতে সাময়িক বা স্থায়ী বরখাস্ত করিতে পারিবে।
            </p>

            <p>
              <strong>৮. জামিনদারের দায়বদ্ধতা:</strong> দ্বিতীয় পক্ষ কর্তৃক সংস্থার অর্থ বা সম্পদের কোনো ক্ষতি সাধিত হইলে কিংবা ঋণ অনাদায়ী রাখিয়া প্রস্থান করিলে তাহার যাবতীয় দায়ভার নিম্নে উল্লিখিত ২ (দুই) জন জামিনদার যৌথ ও এককভাবে বহন করিতে বাধ্য থাকিবেন।
            </p>

            <p>
              <strong>৯. নিরীক্ষা ও পরিদর্শন:</strong> সংস্থা কর্তৃক নিয়োগকৃত অডিটর বা পরিদর্শনকারী কর্মকর্তা যেকোনো সময় কর্মীর হিসাব পরীক্ষা করিতে পারিবেন এবং কর্মী তাহাতে পূর্ণ সহযোগিতা দিতে বাধ্য থাকিবেন।
            </p>

            <p>
              <strong>১০. ছুটি নীতি:</strong> প্রথম পক্ষের বিধি মোতাবেক ছুটি প্রযোজ্য হইবে। অনুমতি ব্যতীত কর্মস্থলে অনুপস্থিত থাকা কঠোর শাস্তিযোগ্য অপরাধ।
            </p>

            <p>
              <strong>১১. বিরোধ নিস্পত্তি:</strong> এই চুক্তিপত্র সম্পর্কিত কোনো বিরোধ সৃষ্টি হইলে প্রথম পক্ষের নির্বাহী পরিচালক বা তৎকর্তৃক মনোনীত সালিশী কমিটির সিদ্ধান্তই চূড়ান্ত বলিয়া গণ্য হইবে।
            </p>

            <p>
              <strong>১২. এখতিয়ার:</strong> এই চুক্তিপত্রের যেকোনো আইনি বিরোধের ক্ষেত্রে যশোর বিচারিক আদালতের এখতিয়ার সংরক্ষিত থাকিবে।
            </p>

            <div className="border p-3 rounded bg-slate-50 mt-4">
              <p className="font-bold text-xs text-slate-900 mb-1">যৌথ জামিনদারগণের অঙ্গিকার:</p>
              <p className="text-xs text-slate-700">
                আমরা নিম্নস্বাক্ষরকারী জামিনদারদ্বয় ১ম ও ২য় পক্ষের সকল শর্তাবলী মনোযোগ সহকারে পাঠ করিয়া এবং উহার ফলাফল উপলব্ধি করিয়া স্বেচ্ছায়, সজ্ঞানে জামিনদার হিসেবে স্বাক্ষর প্রদান করিলাম।
              </p>
            </div>
          </div>

          <div className="mt-12 text-right text-xs font-bold text-slate-500">
            [পাতা ২ সমাপ্ত - ৩য় পাতা অঙ্গিকারনামা দ্রষ্টব্য]
          </div>
        </div>

        {/* PAGE 3: Final Page (Signatures, Undertaking & Seals) */}
        <div className="legal-page">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h2 className="text-xl font-bold font-serif-bn text-slate-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h2>
            <div className="mt-1 inline-block bg-emerald-800 text-white px-4 py-1 rounded text-sm font-bold">
              চাকুরীর অঙ্গীকারনামা ও স্বাক্ষর পাতা (পাতা - ০৩)
            </div>
          </div>

          <div className="space-y-6 text-xs md:text-sm">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
              <h3 className="font-bold text-sm text-slate-900 mb-2">কর্মীর চূড়ান্ত অঙ্গীকারনামা:</h3>
              <p className="text-justify leading-relaxed text-slate-800">
                আমি <strong>{worker.workerName}</strong>, শপথ পূর্বক ঘোষণা করিতেছি যে, উপরোক্ত ১ম ও ২য় পাতার ১২টি শর্তাবলী আমি স্বজ্ঞানে পাঠ করিয়া সম্পূর্ণ সম্মত হইয়াছি। আমি সংস্থা কর্তৃক অর্পিত দায়িত্ব সততার সহিত পালন করিব এবং কোনো অসদুপায় অবলম্বন করিব না।
              </p>
            </div>

            {/* Guarantors Section */}
            <div className="border border-slate-300 rounded-lg p-4 bg-white">
              <h3 className="font-bold text-sm text-emerald-900 mb-3 border-b pb-1">২ জন জামিনদারের বিস্তারিত বিবরণ ও স্বাক্ষর:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">জামিনদার ১:</p>
                  <p>• নাম: {worker.guarantor1.name}</p>
                  <p>• সম্পর্ক: {worker.guarantor1.relation}</p>
                  <p>• এনআইডি: {worker.guarantor1.nid}</p>
                  <p>• মোবাইল: {worker.guarantor1.mobile}</p>
                  <p>• ঠিকানা: {worker.guarantor1.address}</p>
                  <div className="mt-8 pt-2 border-t border-slate-400 text-center font-bold text-xs text-slate-700">
                    জামিনদার ১-এর স্বাক্ষর ও তারিখ
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">জামিনদার ২:</p>
                  <p>• নাম: {worker.guarantor2.name}</p>
                  <p>• সম্পর্ক: {worker.guarantor2.relation}</p>
                  <p>• এনআইডি: {worker.guarantor2.nid}</p>
                  <p>• মোবাইল: {worker.guarantor2.mobile}</p>
                  <p>• ঠিকানা: {worker.guarantor2.address}</p>
                  <div className="mt-8 pt-2 border-t border-slate-400 text-center font-bold text-xs text-slate-700">
                    জামিনদার ২-এর স্বাক্ষর ও তারিখ
                  </div>
                </div>
              </div>
            </div>

            {/* Witnesses Section */}
            <div className="border border-slate-300 rounded-lg p-4 bg-white">
              <h3 className="font-bold text-sm text-slate-900 mb-3 border-b pb-1">২ জন সাক্ষীর বিস্তারিত বিবরণ ও স্বাক্ষর:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p><strong>১ম সাক্ষী:</strong> {worker.witness1.name}</p>
                  <p>ঠিকানা: {worker.witness1.address} | ফোন: {worker.witness1.mobile}</p>
                  <div className="mt-6 pt-2 border-t border-slate-400 text-center font-bold text-xs text-slate-700">
                    ১ম সাক্ষীর স্বাক্ষর
                  </div>
                </div>

                <div className="space-y-1">
                  <p><strong>২য় সাক্ষী:</strong> {worker.witness2.name}</p>
                  <p>ঠিকানা: {worker.witness2.address} | ফোন: {worker.witness2.mobile}</p>
                  <div className="mt-6 pt-2 border-t border-slate-400 text-center font-bold text-xs text-slate-700">
                    ২য় সাক্ষীর স্বাক্ষর
                  </div>
                </div>
              </div>
            </div>

            {/* Final Authority Signatures & Official Seals */}
            <div className="pt-10 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs font-bold text-slate-900">
              <div className="text-center space-y-12">
                <div className="border-t border-slate-800 pt-1">
                  কর্মীর স্বাক্ষর (দ্বিতীয় পক্ষ)
                  <p className="text-[10px] text-slate-500 font-normal">{worker.workerName}</p>
                </div>
              </div>

              <div className="text-center space-y-12">
                <div className="border-t border-slate-800 pt-1">
                  প্রথম পক্ষের পক্ষে কর্তৃপক্ষের স্বাক্ষর ও অফিশিয়াল সিল
                  <p className="text-[10px] text-slate-500 font-normal">পরিচালক (এইচআর ও প্রশাসন), RRF</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

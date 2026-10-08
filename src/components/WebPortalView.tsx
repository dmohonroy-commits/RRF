import React from 'react';
import { WorkerData } from '../types';
import { Globe, Download, Sparkles, ExternalLink } from 'lucide-react';
import { generateStandaloneHTMLPortal } from '../utils/htmlPortalGenerator';

interface Props {
  workers: WorkerData[];
}

export const WebPortalView: React.FC<Props> = ({ workers }) => {
  const downloadHTMLPortal = () => {
    const htmlContent = generateStandaloneHTMLPortal(workers);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'RRF_HR_Web_Version_Portal.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-300" />
            <h2 className="text-xl font-bold">RRF রেসপন্সিভ সিঙ্গেল-ফাইল ওয়েব পোর্টাল</h2>
          </div>
          <p className="text-xs text-emerald-100 max-w-xl">
            এক ক্লিকে ১০০% রেসপন্সিভ সিঙ্গেল-ফাইল এইচটিএমএল ওয়েব পোর্টাল জেনারেট করুন (<code className="font-mono bg-emerald-950 px-1.5 py-0.5 rounded">RRF_HR_Web_Version_Portal.html</code>)। এটি যেকোনো মোবাইল বা কম্পিউটারের ব্রাউজারে অফলাইনেও সরাসরি কাজ করবে।
          </p>
        </div>

        <button 
          onClick={downloadHTMLPortal}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition"
        >
          <Download className="w-4 h-4" />
          <span>RRF_HR_Web_Version_Portal.html ডাউনলোড</span>
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <p className="font-bold text-emerald-900 text-sm">📱 ১০০% মোবাইল ও পিসি রেসপন্সিভ</p>
          <p className="text-slate-600">আইফোন, অ্যান্ড্রয়েড, ট্যাবলেট ও ল্যাপটপ স্ক্রিনে চমৎকার লেআউট ও সাইডবার ড্রয়ার।</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <p className="font-bold text-emerald-900 text-sm">💾 LocalStorage & JSON সিঙ্ক</p>
          <p className="text-slate-600">সব তথ্য লোকাল স্টোরেজে স্বয়ংক্রিয় সংরক্ষিত হইবে এবং ব্যাকআপ ডাউনলোড করা যাইবে।</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <p className="font-bold text-emerald-900 text-sm">🖨️ সরাসরি প্রিন্ট ও মার্জিন সাপোর্ট</p>
          <p className="text-slate-600">১০০ টাকার স্ট্যাম্প, ২৫ টাকার প্রত্যয়ন ও তথ্য যাচাইকরণ ফরম প্রিভিউ ও প্রিন্ট।</p>
        </div>
      </div>

      {/* Live Web Portal Interactive Preview Box */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>লাইভ ওয়েব পোর্টাল ইন্টারঅ্যাক্টিভ প্রিভিউ</span>
          </h3>
          <span className="text-xs text-slate-500">
            বর্তমানে মোট {workers.length} জন কর্মী লোড করা আছে
          </span>
        </div>

        <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-100 min-h-[450px]">
          <iframe 
            title="RRF HR Single File Web Portal Live Preview"
            srcDoc={generateStandaloneHTMLPortal(workers)}
            className="w-full h-[550px] border-none"
          />
        </div>
      </div>
    </div>
  );
};

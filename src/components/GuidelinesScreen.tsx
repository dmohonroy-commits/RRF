import React from 'react';
import { HelpCircle, BookOpen, Printer, Download, Key } from 'lucide-react';

export const GuidelinesScreen: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">অ্যাপ নির্দেশিকা ও ইউজার গাইডলাইন্স</h2>
          <p className="text-xs text-slate-500">RRF HR Agreement & Verification Management System Guide</p>
        </div>
      </div>

      <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
          <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>১. ১০০ টাকার স্ট্যাম্প চুক্তিপত্র প্রিন্ট করার নিয়ম</span>
          </h3>
          <p>
            • প্রথম ও দ্বিতীয় পাতায় যদি আপনার কাছে পূর্বেই ১০০ টাকার সরকারী জুডিশিয়াল স্ট্যাম্প থাকে, তবে টগল অপশন <strong>"১০০ টাকার স্ট্যাম্পের খালি জায়গা ছেড়ে প্রিন্ট করুন"</strong> সক্রিয় রাখুন। ইহাতে প্রথম ২ পাতায় ৯ সেন্টিমিটার স্ট্যাম্প মার্জিন ফাঁকা থাকিবে।
          </p>
          <p>
            • সাধারণ কাগজে প্রিন্ট করার ক্ষেত্রে উক্ত টগল বন্ধ করিলেই সম্পূর্ণ লিগাল সাইজের ৩টি পৃথক পাতায় মানসম্মত প্রিন্ট হইবে।
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-700" />
            <span>২. ফাইল এক্সপোর্ট ও ফাইল নামকরণের নিয়ম</span>
          </h3>
          <p>
            • অ্যাডমিন প্যানেল হইতে ফাইল এক্সপোর্ট করার সময় ফাইলগুলোর নাম স্বয়ংক্রিয়ভাবে <code>[কর্মীর নাম]_[সংক্ষিপ্ত ঠিকানা]_[ডকুমেন্ট নাম].html</code> ফরম্যাটে সংরক্ষিত হয়।
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
          <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-700" />
            <span>৩. সিকিউরিটি পিন ও অ্যাডমিন তথ্য</span>
          </h3>
          <p>
            • ডিফল্ট সিকিউরিটি পিন: <strong className="font-mono text-slate-900">1234</strong>।
          </p>
          <p>
            • অ্যাডমিন প্যানেলে লগইন করার পর পিন পরিবর্তন করতে পারবেন।
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

export const ConditionsScreen: React.FC = () => {
  const conditions = [
    '১. অর্পিত দায়িত্ব ও সততা: কর্মী প্রথম পক্ষের (RRF) প্রচলিত চাকরি বিধিমালা ও প্রশাসনিক নির্দেশিকা অনুসরন করিয়া সততা ও নিষ্ঠার সহিত দায়িত্ব পালন করিবেন।',
    '২. আর্থিক সততা ও সঞ্চয়/ঋণ পরিচালনা: কর্মী কোনো অবস্থাতেই সংস্থার ঋণের কিস্তি, সঞ্চয় বা অন্যান্য তহবিল নিজের ব্যক্তিগত কাজে ব্যবহার করিতে পারিবেন না।',
    '৩. জামানত জমা ও সিকিউরিটি বন্ড: চাকুরীতে যোগদানের পূর্বে সংস্থার নির্ধারিত সিকিউরিটি জামানত ও ২ জন যোগ্য জামিনদারের বন্ড জমা দিতে হইবে।',
    '৪. বদলী ও পদায়ন বিধি: সংস্থা প্রয়োজনবোধে যেকোনো কর্মী বা কর্মকর্তাকে যেকোনো শাখা, প্রকল্প বা এলাকায় তাৎক্ষণিক বদলী করার ক্ষমতা সংরক্ষণ করে।',
    '৫. তথ্য ও পাসওয়ার্ড গোপনীয়তা: কর্মী সংস্থার গ্রাহক তথ্য, সফটওয়্যার পাসওয়ার্ড ও আর্থিক হিসাব সম্পূর্ণ গোপন রাখিবেন।',
    '৬. চাকুরী ইস্তফা নিয়মাবলী: চাকুরী হইতে ইস্তফা প্রদানের ক্ষেত্রে ন্যূনতম ৩০ (ত্রিশ) দিন পূর্বে লিখিত নোটিশ প্রদান বা ৩০ দিনের বেতন সমন্বয় করিতে হইবে।',
    '৭. কর্মস্থলে উপস্থিতি ও আচরণ: ছুটি অনুমোদন ব্যতীত অনুপস্থিতি শৃঙ্খলাভঙ্গ বলিয়া বিবেচিত হইবে এবং উপযুক্ত প্রশাসনিক ব্যবস্থা গৃহীত হইবে।',
    '৮. অডিট ও হিসাব নিস্পত্তি: কর্মী স্থানান্তরের সময় পূর্বতন শাখার সমস্ত হিসাব অডিটর ও নতুন দায়িত্বপ্রাপ্ত কর্মকর্তার নিকট সঠিকভাব বুঝাইয়া দিতে বাধ্য থাকিবেন।',
    '৯. ক্ষতিপূরণ ও জামিনদারদের দায়: কর্মী কর্তৃক আর্থিক তছরুপ ঘটিলে জামিনদারগণ যৌথভাবে ক্ষতিপূরণ প্রদানে আইনত বাধ্য থাকিবেন।',
    '১০. পোশাক ও পরিচয়পত্র বিধান: কর্মস্থলে অবস্থানকালে আরআরএফ-এর অফিশিয়াল আইডি কার্ড দৃশ্যমান রাখিতে হইবে।',
    '১১. সালিশ ও প্রশাসনিক আপিল: যেকোনো বিরোধের ক্ষেত্রে সংস্থার নির্বাহী পরিচালক বা পরিচালনা পর্ষদের সিদ্ধান্তই চূড়ান্ত বলিয়া গণ্য হইবে।',
    '১২. আইনি এখতিয়ার: এই চুক্তিপত্রের আইনি বিচারিক ক্ষেত্র হইবে যশোর জেলা আদালত।'
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4 text-center md:text-left flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">চাকুরীর ১২টি সাধারণ শর্তাবলী (Standard Terms)</h2>
          <p className="text-xs text-slate-500">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF) - মানব সম্পদ ও প্রশাসন বিভাগ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditions.map((cond, index) => (
          <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-start gap-2 text-emerald-900 font-semibold text-xs leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{cond}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

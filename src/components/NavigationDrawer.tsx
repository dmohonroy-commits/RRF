import React from 'react';
import { ViewTab, DisplayMode } from '../types';
import { 
  Home, UserPlus, FileText, FileCheck, ShieldCheck, 
  FolderPlus, Lock, Globe, Shield, BookOpen, Cloud, Phone, X, Smartphone, Monitor
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
  onOpenHelpline: () => void;
}

export const NavigationDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  displayMode,
  onToggleDisplayMode,
  onOpenHelpline
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'হোম স্ক্রিন', icon: Home },
    { id: 'entry', label: 'নতুন কর্মী তথ্য প্রবেশ', icon: UserPlus },
    { id: 'stamp100_preview', label: '১০০ টাকার স্ট্যাম্প চুক্তিপত্র', icon: FileText },
    { id: 'cert25_preview', label: '২৫ টাকার প্রত্যয়ন পত্র', icon: FileCheck },
    { id: 'verification_preview', label: 'কর্মী তথ্য যাচাইকরণ শাখা', icon: ShieldCheck },
    { id: 'forms_hub', label: 'অন্যান্য ফরম হাব (আইডি/ট্রেনিং)', icon: FolderPlus },
    { id: 'admin', label: 'অ্যাডমিন ড্যাশবোর্ড', icon: Lock },
    { id: 'web_portal', label: 'ফুল ওয়েব ভার্সন পোর্টাল (HTML)', icon: Globe },
    { id: 'conditions', label: 'চাকুরীর ১২টি সাধারণ শর্তাবলী', icon: Shield },
    { id: 'guidelines', label: 'অ্যাপ নির্দেশিকা', icon: BookOpen },
    { id: 'firebase_status', label: 'ফায়ারবেস ক্লাউড স্ট্যাটাস', icon: Cloud }
  ];

  return (
    <div className="fixed inset-0 z-50 flex no-print">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Box (Material Design 3 Style) */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-emerald-900 font-bold rounded-xl flex items-center justify-center text-lg shadow">
                RRF
              </div>
              <div>
                <h2 className="font-bold text-sm leading-tight">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন</h2>
                <p className="text-[10px] text-emerald-200">এইচআর চুক্তি ও প্রত্যয়ন পত্র</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg text-emerald-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id as ViewTab);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left ${
                    isActive 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          {/* View Mode Switcher */}
          <button 
            onClick={onToggleDisplayMode}
            className="w-full flex items-center justify-between p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-2">
              {displayMode === 'android_app' ? <Smartphone className="w-4 h-4 text-emerald-700" /> : <Monitor className="w-4 h-4 text-blue-700" />}
              <span>{displayMode === 'android_app' ? 'অ্যান্ড্রয়েড অ্যাপ মোড' : 'ফুল ওয়েব ভিউ মোড'}</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
              পরিবর্তন
            </span>
          </button>

          <button 
            onClick={() => {
              onClose();
              onOpenHelpline();
            }}
            className="w-full flex items-center justify-center gap-2 p-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-200 transition"
          >
            <Phone className="w-4 h-4" />
            <span>RRF যশোর হেড অফিস হেল্পলাইন</span>
          </button>
        </div>
      </div>
    </div>
  );
};

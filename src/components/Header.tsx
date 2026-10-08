import React, { useState } from 'react';
import { ViewTab, DisplayMode } from '../types';
import { 
  Menu, QrCode, Lock, Phone, X, Share2, Smartphone, Monitor, Search, Globe, Building2
} from 'lucide-react';

interface Props {
  onOpenDrawer: () => void;
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<Props> = ({
  onOpenDrawer,
  activeTab,
  onSelectTab,
  displayMode,
  onToggleDisplayMode,
  searchQuery,
  onSearchChange
}) => {
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [showHelpline, setShowHelpline] = useState<boolean>(false);

  return (
    <>
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          
          {/* Left: Drawer Toggle & Brand Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenDrawer}
              className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-100 transition"
              title="মেনু খুলুন"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => onSelectTab('home')}
              className="cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 bg-white text-emerald-900 font-bold rounded-lg flex items-center justify-center text-base shadow">
                RRF
              </div>
              <div>
                <h1 className="text-sm md:text-base font-bold leading-tight font-serif-bn">
                  রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)
                </h1>
                <p className="text-[10px] text-emerald-200 hidden sm:block">
                  এইচআর চুক্তিপত্র, প্রত্যয়ন পত্র ও তথ্য যাচাইকরণ সিস্টেম
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Quick Search Input (On Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="কর্মীর নাম, ফোন, পদবী দিয়ে লাইভ সার্চ..."
                className="w-full pl-8 pr-3 py-1.5 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-xs text-white placeholder-emerald-300/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <Search className="w-3.5 h-3.5 text-emerald-300 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Mode Switcher */}
            <button 
              onClick={onToggleDisplayMode}
              title={displayMode === 'android_app' ? 'ফুল ওয়েব পোর্টাল ভিউতে যান' : 'অ্যান্ড্রয়েড অ্যাপ ভিউতে যান'}
              className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-emerald-700 transition"
            >
              {displayMode === 'android_app' ? (
                <>
                  <Monitor className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">ওয়েব মোড</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-emerald-300" />
                  <span className="hidden sm:inline">অ্যাপ মোড</span>
                </>
              )}
            </button>

            {/* QR Code / Share Button */}
            <button 
              onClick={() => setShowQRModal(true)}
              className="p-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-emerald-100 transition"
              title="কিউআর কোড / শেয়ার মোডাল"
            >
              <QrCode className="w-5 h-5" />
            </button>

            {/* Admin Panel Shortcut */}
            <button 
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                activeTab === 'admin' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-800 hover:bg-emerald-700 text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">অ্যাডমিন</span>
            </button>
          </div>

        </div>
      </header>

      {/* QR Code & Share Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 text-slate-900">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-emerald-900 text-sm">অ্যাপ কিউআর কোড ও শেয়ার</h3>
              <button onClick={() => setShowQRModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-xl inline-block">
              {/* Simulated Crisp QR Code SVG */}
              <svg className="w-40 h-40 mx-auto text-emerald-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                <rect x="40" y="10" width="15" height="15" fill="currentColor" />
                <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                <rect x="70" y="50" width="15" height="25" fill="currentColor" />
                <rect x="20" y="40" width="10" height="20" fill="currentColor" />
                <rect x="50" y="70" width="20" height="15" fill="currentColor" />
              </svg>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              যে কোনো মোবাইল স্ক্যানার দিয়ে স্ক্যান করে সরাসরি RRF এইচআর ওয়েব পোর্টালে প্রবেশ করুন।
            </p>

            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('অ্যাপলিকেশন লিংক কপি করা হয়েছে!');
              }}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>পোর্টাল লিংক কপি করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Helpline & Contact Modal */}
      {showHelpline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-900 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2 text-emerald-900">
                <Building2 className="w-5 h-5" />
                <h3 className="font-bold text-sm">RRF প্রধান কার্যালয় যশোর তথ্য</h3>
              </div>
              <button onClick={() => setShowHelpline(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <p className="font-bold text-emerald-900 text-sm">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</p>
              <p>📍 ঠিকানা: আরআরএফ ভবন, আরআরএফ সড়ক, উপশহর, যশোর-৭৪০০, বাংলাদেশ।</p>
              <p>📞 ফোন / হটলাইন: 02477763150, 01711-828800</p>
              <p>✉️ এইচআর ইমেইল: hr@rrfbd.org, info@rrfbd.org</p>
              <p>🌐 অফিশিয়াল ওয়েবসাইট: www.rrfbd.org</p>
            </div>

            <button 
              onClick={() => setShowHelpline(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </>
  );
};

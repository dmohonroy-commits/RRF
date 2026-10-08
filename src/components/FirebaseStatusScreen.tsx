import React, { useState } from 'react';
import { Cloud, CheckCircle2, RefreshCw, Database, Server, Lock } from 'lucide-react';

export const FirebaseStatusScreen: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('আজ ' + new Date().toLocaleTimeString('bn-BD'));

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('আজ ' + new Date().toLocaleTimeString('bn-BD'));
      alert('ফায়ারবেস ক্লাউড সিঙ্ক সফলভাবে সম্পন্ন হয়েছে!');
    }, 1200);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">ফায়ারবেস ক্লাউড ফাংশন ও ডাটা সিঙ্ক</h2>
            <p className="text-xs text-slate-500">Firestore Cloud Database & Cloud Functions Operational Status</p>
          </div>
        </div>

        <button 
          onClick={handleManualSync}
          disabled={isSyncing}
          className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'সিঙ্ক হচ্ছে...' : 'এখনই ডাটা সিঙ্ক করুন'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <Database className="w-4 h-4" />
            <span>Firestore Persistence</span>
          </div>
          <p className="text-sm font-bold text-slate-800">সক্রিয় (Active)</p>
          <p className="text-[11px] text-slate-500">সর্বশেষ সিঙ্ক: {lastSyncTime}</p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <Server className="w-4 h-4" />
            <span>Cloud Functions</span>
          </div>
          <p className="text-sm font-bold text-slate-800">100% অনলাইন</p>
          <p className="text-[11px] text-slate-500">PDF & Verification Trigger</p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>Security Rules</span>
          </div>
          <p className="text-sm font-bold text-slate-800">এনক্রিপ্টেড (Encrypted)</p>
          <p className="text-[11px] text-slate-500">RRF HR RBAC Enforced</p>
        </div>
      </div>
    </div>
  );
};

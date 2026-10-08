import React, { useState, useEffect } from 'react';
import { WorkerData, ViewTab, DisplayMode } from './types';
import { initialWorkers } from './mockData';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HomeScreen } from './components/HomeScreen';
import { WorkerForm } from './components/WorkerForm';
import { FormStamp100 } from './components/FormStamp100';
import { FormCert25 } from './components/FormCert25';
import { FormVerification } from './components/FormVerification';
import { FormsHub } from './components/FormsHub';
import { AdminPanel } from './components/AdminPanel';
import { WebPortalView } from './components/WebPortalView';
import { ConditionsScreen } from './components/ConditionsScreen';
import { GuidelinesScreen } from './components/GuidelinesScreen';
import { FirebaseStatusScreen } from './components/FirebaseStatusScreen';
import { generateStandaloneHTMLPortal } from './utils/htmlPortalGenerator';
import { Phone, Building2, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [workers, setWorkers] = useState<WorkerData[]>(() => {
    const saved = localStorage.getItem('RRF_HR_WORKERS');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialWorkers; }
    }
    return initialWorkers;
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('android_app');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(workers[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHelplineDialog, setShowHelplineDialog] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('RRF_HR_WORKERS', JSON.stringify(workers));
  }, [workers]);

  const activeWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];

  const handleSaveWorker = (newWorker: WorkerData) => {
    setWorkers(prev => {
      const idx = prev.findIndex(w => w.id === newWorker.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newWorker;
        return copy;
      }
      return [newWorker, ...prev];
    });
    setSelectedWorkerId(newWorker.id);
  };

  const handleDeleteWorker = (id: string) => {
    setWorkers(prev => prev.filter(w => w.id !== id));
    if (selectedWorkerId === id && workers.length > 1) {
      setSelectedWorkerId(workers.find(w => w.id !== id)?.id || '');
    }
  };

  const handleTransferToVerification = (id: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          status: 'verification_pending',
          docCategory: 'verification'
        };
      }
      return w;
    }));
    setSelectedWorkerId(id);
    setActiveTab('verification_preview');
  };

  const handleSelectWorkerDoc = (worker: WorkerData, docType: 'stamp100' | 'cert25' | 'verification') => {
    setSelectedWorkerId(worker.id);
    if (docType === 'stamp100') setActiveTab('stamp100_preview');
    else if (docType === 'cert25') setActiveTab('cert25_preview');
    else if (docType === 'verification') setActiveTab('verification_preview');
  };

  const exportSingleWorkerHTML = (w: WorkerData) => {
    const cleanName = w.workerName.replace(/\s+/g, '_');
    const cleanAddress = (w.permDistrict || w.permUpazila || 'যশোর').replace(/\s+/g, '_');
    const filename = `${cleanName}_${cleanAddress}_চুক্তিপত্র.html`;

    const htmlContent = generateStandaloneHTMLPortal([w]);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col justify-between selection:bg-emerald-200">
      
      {/* Top Main Header */}
      <Header 
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        displayMode={displayMode}
        onToggleDisplayMode={() => setDisplayMode(displayMode === 'android_app' ? 'full_web' : 'android_app')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        displayMode={displayMode}
        onToggleDisplayMode={() => setDisplayMode(displayMode === 'android_app' ? 'full_web' : 'android_app')}
        onOpenHelpline={() => setShowHelplineDialog(true)}
      />

      {/* Main Content Area - Rendered in full desktop width or wrapped in Android Jetpack Compose Phone/Tablet Frame */}
      <main className="flex-1 py-6 px-4 max-w-7xl w-full mx-auto">
        
        {/* Mode Switcher Banner */}
        <div className="no-print mb-4 flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 shadow-xs">
          <div className="flex items-center gap-2">
            {displayMode === 'android_app' ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Smartphone className="w-4 h-4" />
                Jetpack Compose (Android App Frame View)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-blue-800 font-bold">
                <Monitor className="w-4 h-4" />
                100% Full Responsive Web Portal View
              </span>
            )}
          </div>

          <button 
            onClick={() => setDisplayMode(displayMode === 'android_app' ? 'full_web' : 'android_app')}
            className="text-emerald-800 hover:underline font-bold"
          >
            {displayMode === 'android_app' ? 'ফুল ওয়েব মোডে সুইচ করুন ➔' : 'অ্যান্ড্রয়েড অ্যাপ মোডে সুইচ করুন ➔'}
          </button>
        </div>

        {/* Optional Android Phone Frame Container when in Android Mode */}
        <div className={displayMode === 'android_app' ? 'max-w-4xl mx-auto rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden bg-slate-50 p-2 md:p-6 transition-all' : ''}>
          
          {activeTab === 'home' && (
            <HomeScreen 
              workers={workers}
              onSelectTab={setActiveTab}
              onSelectWorkerDoc={handleSelectWorkerDoc}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onDeleteWorker={handleDeleteWorker}
              onTransferToVerification={handleTransferToVerification}
              onExportWorkerHTML={exportSingleWorkerHTML}
            />
          )}

          {activeTab === 'entry' && (
            <WorkerForm 
              initialWorker={null}
              onSaveWorker={handleSaveWorker}
              onPreviewDoc={(w, docType) => handleSelectWorkerDoc(w, docType)}
            />
          )}

          {activeTab === 'stamp100_preview' && activeWorker && (
            <FormStamp100 
              worker={activeWorker}
              onExportHTML={() => exportSingleWorkerHTML(activeWorker)}
            />
          )}

          {activeTab === 'cert25_preview' && activeWorker && (
            <FormCert25 
              worker={activeWorker}
              onExportHTML={() => exportSingleWorkerHTML(activeWorker)}
            />
          )}

          {activeTab === 'verification_preview' && activeWorker && (
            <FormVerification 
              worker={activeWorker}
              onSaveVerification={handleSaveWorker}
              onExportHTML={() => exportSingleWorkerHTML(activeWorker)}
            />
          )}

          {activeTab === 'forms_hub' && activeWorker && (
            <FormsHub worker={activeWorker} />
          )}

          {activeTab === 'admin' && (
            <AdminPanel 
              workers={workers}
              onDeleteWorker={handleDeleteWorker}
              onTransferToVerification={handleTransferToVerification}
              onSelectWorkerDoc={handleSelectWorkerDoc}
            />
          )}

          {activeTab === 'web_portal' && (
            <WebPortalView workers={workers} />
          )}

          {activeTab === 'conditions' && (
            <ConditionsScreen />
          )}

          {activeTab === 'guidelines' && (
            <GuidelinesScreen />
          )}

          {activeTab === 'firebase_status' && (
            <FirebaseStatusScreen />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-900 text-slate-400 text-xs py-6 px-4 border-t border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-800 text-white font-bold rounded flex items-center justify-center text-xs">
              RRF
            </div>
            <p className="font-semibold text-slate-300">
              রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF) - এইচআর চুক্তি ও প্রত্যয়ন ব্যবস্থাপনা
            </p>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 Rural Reconstruction Foundation (RRF). All Rights Reserved. · যশোর, বাংলাদেশ
          </p>
        </div>
      </footer>

      {/* Helpline Dialog */}
      {showHelplineDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-900 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 border-b pb-2">
              <Building2 className="w-5 h-5" />
              <h3 className="font-bold text-sm">RRF হেড অফিস যোগাযোগের ঠিকানা</h3>
            </div>

            <div className="space-y-2 text-xs leading-relaxed">
              <p className="font-bold text-slate-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</p>
              <p>আরআরএফ ভবন, আরআরএফ সড়ক, উপশহর, যশোর-৭৪০০, বাংলাদেশ।</p>
              <p>📞 ফোন: 02477763150, 01711-828800</p>
              <p>✉️ ইমেইল: hr@rrfbd.org, info@rrfbd.org</p>
            </div>

            <button 
              onClick={() => setShowHelplineDialog(false)}
              className="w-full bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { WorkerData } from '../types';
import { UserPlus, Save, Sparkles, Eye } from 'lucide-react';

interface Props {
  initialWorker?: WorkerData | null;
  onSaveWorker: (worker: WorkerData) => void;
  onPreviewDoc?: (worker: WorkerData, docType: 'stamp100' | 'cert25' | 'verification') => void;
}

export const WorkerForm: React.FC<Props> = ({ initialWorker, onSaveWorker, onPreviewDoc }) => {
  const [formData, setFormData] = useState<WorkerData>(initialWorker || {
    id: 'rrf-' + Date.now(),
    slNo: 'RRF-HR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    workerName: '',
    fatherHusbandName: '',
    motherName: '',
    permVillage: '',
    permPost: '',
    permUpazila: '',
    permDistrict: '',
    presAddress: '',
    mobile: '',
    nidNumber: '',
    designation: 'ক্রেডিট অফিসার (CO)',
    branchOffice: 'চাঁচড়া শাখা কার্যালয়, যশোর',
    joiningDate: new Date().toISOString().split('T')[0],
    guarantor1: { name: '', address: '', relation: '', nid: '', mobile: '' },
    guarantor2: { name: '', address: '', relation: '', nid: '', mobile: '' },
    witness1: { name: '', address: '', mobile: '' },
    witness2: { name: '', address: '', mobile: '' },
    docCategory: 'stamp100',
    status: 'draft',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  });

  const loadSampleData = () => {
    setFormData({
      id: 'rrf-' + Date.now(),
      slNo: 'RRF-HR-2026-' + Math.floor(1000 + Math.random() * 9000),
      workerName: 'মোঃ শরিফুল ইসলাম',
      fatherHusbandName: 'মোঃ আমজাদ হোসেন',
      motherName: 'মোসাঃ জাহানারা বেগম',
      permVillage: 'বাঘারপাড়া সদর, রামনগর',
      permPost: 'বাঘারপাড়া',
      permUpazila: 'বাঘারপাড়া',
      permDistrict: 'যশোর',
      presAddress: 'আরআরএফ প্রশিক্ষণ ভবন রোড, উপশহর, যশোর',
      mobile: '01715-998877',
      nidNumber: '19944115678901234',
      designation: 'ক্রেডিট অফিসার (CO)',
      branchOffice: 'বাঘারপাড়া শাখা কার্যালয়, যশোর',
      joiningDate: '2026-03-10',
      guarantor1: {
        name: 'মোঃ মনিরুল ইসলাম',
        address: 'গ্রাম: রামনগর, বাঘারপাড়া, যশোর',
        relation: 'মামা',
        nid: '19824119988776655',
        mobile: '01819-112233'
      },
      guarantor2: {
        name: 'মোঃ হাফিজুর রহমান',
        address: 'গ্রাম: প্রেমচারা, বাঘারপাড়া, যশোর',
        relation: 'শ্বশুর',
        nid: '19784112233445566',
        mobile: '01911-445566'
      },
      witness1: {
        name: 'মোঃ কামরুল ইসলাম',
        address: 'বাঘারপাড়া বাজার, যশোর',
        mobile: '01712-334455'
      },
      witness2: {
        name: 'শেখ আব্দুল বাকী',
        address: 'উপশহর বাজার, যশোর',
        mobile: '01812-556677'
      },
      docCategory: 'stamp100',
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.workerName || !formData.mobile) {
      alert('অনুগ্রহ করে কর্মীর নাম এবং মোবাইল নম্বর প্রদান করুন।');
      return;
    }
    onSaveWorker(formData);
    alert('কর্মী তথ্য সফলভাবে সংরক্ষিত হয়েছে!');
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-emerald-800" />
            <span>{initialWorker ? 'কর্মী তথ্য সম্পাদনা' : 'নতুন কর্মী তথ্য প্রবেশ ফরম'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF) - এইচআর চুক্তি ব্যবস্থাপনা</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={loadSampleData}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>স্যাম্পল ডাটা লোড করুন</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-sm text-emerald-900 border-b pb-2">১. মূল পরিচিতি ও যোগদানের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ক্রমিক/আইডি নম্বর:</label>
              <input 
                type="text" 
                value={formData.slNo} 
                onChange={(e) => setFormData({ ...formData, slNo: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">কর্মীর পূর্ণ নাম *:</label>
              <input 
                type="text" 
                value={formData.workerName} 
                onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                placeholder="মোঃ রফিকুল ইসলাম"
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর *:</label>
              <input 
                type="text" 
                value={formData.mobile} 
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="01712-XXXXXX"
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">পিতা/স্বামীর নাম:</label>
              <input 
                type="text" 
                value={formData.fatherHusbandName} 
                onChange={(e) => setFormData({ ...formData, fatherHusbandName: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">মাতার নাম:</label>
              <input 
                type="text" 
                value={formData.motherName} 
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">এনআইডি/জন্ম নিবন্ধন নং:</label>
              <input 
                type="text" 
                value={formData.nidNumber} 
                onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs font-mono focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">পদবী:</label>
              <input 
                type="text" 
                value={formData.designation} 
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="ক্রেডিট অফিসার / শাখা ব্যবস্থাপক"
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">যোগদানকৃত শাখা কার্যালয়:</label>
              <input 
                type="text" 
                value={formData.branchOffice} 
                onChange={(e) => setFormData({ ...formData, branchOffice: e.target.value })}
                placeholder="চাঁচড়া শাখা কার্যালয়, যশোর"
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">যোগদানের তারিখ:</label>
              <input 
                type="date" 
                value={formData.joiningDate} 
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-sm text-emerald-900 border-b pb-2">২. স্থায়ী ও বর্তমান ঠিকানা</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">স্থায়ী গ্রাম/রাস্তা:</label>
              <input 
                type="text" 
                value={formData.permVillage} 
                onChange={(e) => setFormData({ ...formData, permVillage: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ডাকঘর:</label>
              <input 
                type="text" 
                value={formData.permPost} 
                onChange={(e) => setFormData({ ...formData, permPost: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">উপজেলা/থানা:</label>
              <input 
                type="text" 
                value={formData.permUpazila} 
                onChange={(e) => setFormData({ ...formData, permUpazila: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">জেলা:</label>
              <input 
                type="text" 
                value={formData.permDistrict} 
                onChange={(e) => setFormData({ ...formData, permDistrict: e.target.value })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block font-semibold text-slate-700 mb-1">বর্তমান ঠিকানা (সম্পূর্ণ):</label>
              <input 
                type="text" 
                value={formData.presAddress} 
                onChange={(e) => setFormData({ ...formData, presAddress: e.target.value })}
                placeholder="বাড়ী #, সড়ক, এলাকা, জেলা"
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Guarantors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Guarantor 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-900 border-b pb-1">জামিনদার ১-এর বিবরণ</h4>
            <div>
              <label className="block font-medium">নাম:</label>
              <input 
                type="text" 
                value={formData.guarantor1.name} 
                onChange={(e) => setFormData({ ...formData, guarantor1: { ...formData.guarantor1, name: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">সম্পর্ক:</label>
              <input 
                type="text" 
                value={formData.guarantor1.relation} 
                onChange={(e) => setFormData({ ...formData, guarantor1: { ...formData.guarantor1, relation: e.target.value } })}
                placeholder="চাচা / মামা / ভাই"
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">এনআইডি:</label>
              <input 
                type="text" 
                value={formData.guarantor1.nid} 
                onChange={(e) => setFormData({ ...formData, guarantor1: { ...formData.guarantor1, nid: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-medium">মোবাইল নং:</label>
              <input 
                type="text" 
                value={formData.guarantor1.mobile} 
                onChange={(e) => setFormData({ ...formData, guarantor1: { ...formData.guarantor1, mobile: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">ঠিকানা:</label>
              <input 
                type="text" 
                value={formData.guarantor1.address} 
                onChange={(e) => setFormData({ ...formData, guarantor1: { ...formData.guarantor1, address: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
          </div>

          {/* Guarantor 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-900 border-b pb-1">জামিনদার ২-এর বিবরণ</h4>
            <div>
              <label className="block font-medium">নাম:</label>
              <input 
                type="text" 
                value={formData.guarantor2.name} 
                onChange={(e) => setFormData({ ...formData, guarantor2: { ...formData.guarantor2, name: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">সম্পর্ক:</label>
              <input 
                type="text" 
                value={formData.guarantor2.relation} 
                onChange={(e) => setFormData({ ...formData, guarantor2: { ...formData.guarantor2, relation: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">এনআইডি:</label>
              <input 
                type="text" 
                value={formData.guarantor2.nid} 
                onChange={(e) => setFormData({ ...formData, guarantor2: { ...formData.guarantor2, nid: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-medium">মোবাইল নং:</label>
              <input 
                type="text" 
                value={formData.guarantor2.mobile} 
                onChange={(e) => setFormData({ ...formData, guarantor2: { ...formData.guarantor2, mobile: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-medium">ঠিকানা:</label>
              <input 
                type="text" 
                value={formData.guarantor2.address} 
                onChange={(e) => setFormData({ ...formData, guarantor2: { ...formData.guarantor2, address: e.target.value } })}
                className="w-full p-2 border rounded bg-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-200 gap-4">
          <div className="flex items-center gap-2">
            {onPreviewDoc && (
              <>
                <button 
                  type="button"
                  onClick={() => onPreviewDoc(formData, 'stamp100')}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>১০০Tk স্ট্যাম্প প্রিন্ট প্রিভিউ</span>
                </button>

                <button 
                  type="button"
                  onClick={() => onPreviewDoc(formData, 'cert25')}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>২৫Tk প্রত্যয়ন প্রিভিউ</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>তথ্য সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

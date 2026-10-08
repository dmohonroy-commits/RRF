import { WorkerData } from '../types';

export function generateStandaloneHTMLPortal(workers: WorkerData[]): string {
  const jsonWorkers = JSON.stringify(workers, null, 2);

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF) - এইচআর ওয়েব পোর্টাল</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Hind Siliguri', sans-serif; }
    .font-serif-bn { font-family: 'Noto Serif Bengali', serif; }
    @media print {
      .no-print { display: none !important; }
      .print-only { display: block !important; }
      .page-break { page-break-after: always !important; }
      body { background: white !important; color: black !important; padding: 0 !important; }
      @page { margin: 15mm; }
      .stamp-space { padding-top: 8.8cm !important; }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">

  <!-- Header / Navbar -->
  <header class="bg-emerald-800 text-white shadow-md sticky top-0 z-50 no-print">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white text-emerald-800 rounded-lg flex items-center justify-center font-bold text-xl shadow">
          RRF
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold leading-tight">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h1>
          <p class="text-xs text-emerald-200">এইচআর চুক্তিপত্র, প্রত্যয়ন পত্র ও তথ্য যাচাইকরণ ওয়েব পোর্টাল</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="exportJSONBackup()" class="bg-emerald-700 hover:bg-emerald-600 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition">
          💾 ব্যাকআপ ডাউনলোড (JSON)
        </button>
        <button onclick="window.print()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow transition">
          🖨️ প্রিন্ট করুন
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-6">
    <!-- Controls Bar -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 no-print flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:w-96">
        <label class="block text-xs font-medium text-slate-500 mb-1">অনুসন্ধান করুন</label>
        <input type="text" id="searchInput" onkeyup="renderWorkerList()" placeholder="কর্মীর নাম, ফোন নম্বর, পদবী বা শাখা..." 
          class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
      </div>

      <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <button onclick="setFilter('all')" id="btn-all" class="filter-btn bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">সকল কর্মী</button>
        <button onclick="setFilter('stamp100')" id="btn-stamp100" class="filter-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">১০০ টাকার স্ট্যাম্প</button>
        <button onclick="setFilter('cert25')" id="btn-cert25" class="filter-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">২৫ টাকার প্রত্যয়ন</button>
        <button onclick="setFilter('verification')" id="btn-verification" class="filter-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">তথ্য যাচাই শাখা</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Worker List Sidebar -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 no-print lg:col-span-1">
        <h2 class="text-base font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>কর্মীদের তালিকা</span>
          <span id="workerCount" class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">0</span>
        </h2>
        <div id="workerList" class="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          <!-- Populated by JavaScript -->
        </div>
      </div>

      <!-- Preview Document Display -->
      <div id="previewContainer" class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
        <div class="text-center py-16 text-slate-400 no-print">
          <div class="text-4xl mb-2">📄</div>
          <p class="font-medium">বামপাশের তালিকা থেকে যেকোনো কর্মীকে নির্বাচন করুন</p>
          <p class="text-xs mt-1 text-slate-400">অথবা ১০০ টাকার স্ট্যাম্প, ২৫ টাকার প্রত্যয়ন পত্র বা তথ্য যাচাই ফরম প্রিন্ট দেখুন</p>
        </div>
      </div>
    </div>
  </main>

  <script>
    let workersData = ${jsonWorkers};
    let activeWorkerId = workersData[0] ? workersData[0].id : null;
    let activeFilter = 'all';
    let currentDocMode = 'stamp100'; // stamp100, cert25, verification

    // Load from LocalStorage if available
    const saved = localStorage.getItem('RRF_HR_WORKERS');
    if (saved) {
      try { workersData = JSON.parse(saved); } catch(e){}
    } else {
      localStorage.setItem('RRF_HR_WORKERS', JSON.stringify(workersData));
    }

    function setFilter(filter) {
      activeFilter = filter;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-emerald-800', 'text-white');
        btn.classList.add('bg-slate-100', 'text-slate-700');
      });
      const currentBtn = document.getElementById('btn-' + filter);
      if(currentBtn) {
        currentBtn.classList.remove('bg-slate-100', 'text-slate-700');
        currentBtn.classList.add('bg-emerald-800', 'text-white');
      }
      renderWorkerList();
    }

    function renderWorkerList() {
      const query = document.getElementById('searchInput').value.toLowerCase().trim();
      const listContainer = document.getElementById('workerList');
      listContainer.innerHTML = '';

      const filtered = workersData.filter(w => {
        const matchesQuery = w.workerName.toLowerCase().includes(query) ||
          w.mobile.includes(query) ||
          w.designation.toLowerCase().includes(query) ||
          w.branchOffice.toLowerCase().includes(query);
        
        const matchesFilter = activeFilter === 'all' || w.docCategory === activeFilter;
        return matchesQuery && matchesFilter;
      });

      document.getElementById('workerCount').innerText = filtered.length + ' জন';

      if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">কোনো কর্মী পাওয়া যায়নি</div>';
        return;
      }

      filtered.forEach(w => {
        const isSelected = w.id === activeWorkerId;
        const item = document.createElement('div');
        item.className = \`p-3 rounded-lg border text-left cursor-pointer transition \${
          isSelected ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
        }\`;
        item.onclick = () => {
          activeWorkerId = w.id;
          renderWorkerList();
          renderPreview();
        };

        item.innerHTML = \`
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-sm">\${w.workerName}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800">\${w.slNo}</span>
          </div>
          <p class="text-xs text-slate-600 font-medium">\${w.designation}</p>
          <p class="text-xs text-slate-500 mt-0.5">📍 \${w.branchOffice} · 📞 \${w.mobile}</p>
        \`;
        listContainer.appendChild(item);
      });

      if (activeWorkerId && !filtered.some(w => w.id === activeWorkerId)) {
        if(filtered[0]) activeWorkerId = filtered[0].id;
      }
      renderPreview();
    }

    function renderPreview() {
      const container = document.getElementById('previewContainer');
      const worker = workersData.find(w => w.id === activeWorkerId);
      if (!worker) {
        container.innerHTML = '<div class="text-center py-12 text-slate-400">অনুগ্রহ করে একজন কর্মী নির্বাচন করুন।</div>';
        return;
      }

      container.innerHTML = \`
        <!-- Document Mode Tabs -->
        <div class="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 no-print">
          <button onclick="setDocMode('stamp100')" class="px-3 py-1.5 text-xs font-bold rounded-md transition \${currentDocMode === 'stamp100' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
            ১০০ টাকার স্ট্যাম্প (৩ পাতা)
          </button>
          <button onclick="setDocMode('cert25')" class="px-3 py-1.5 text-xs font-bold rounded-md transition \${currentDocMode === 'cert25' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
            ২৫ টাকার প্রত্যয়ন পত্র
          </button>
          <button onclick="setDocMode('verification')" class="px-3 py-1.5 text-xs font-bold rounded-md transition \${currentDocMode === 'verification' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
            তথ্য যাচাইকরণ ফরম (২ পাতা)
          </button>
        </div>

        <div class="print-preview-content">
          \${getFormHTML(worker, currentDocMode)}
        </div>
      \`;
    }

    function setDocMode(mode) {
      currentDocMode = mode;
      renderPreview();
    }

    function getFormHTML(w, mode) {
      if (mode === 'cert25') {
        return \`
          <div class="bg-white p-6 border rounded-lg text-slate-900 leading-relaxed">
            <!-- Header -->
            <div class="text-center border-b-2 border-emerald-800 pb-4 mb-6">
              <h2 class="text-2xl font-bold text-emerald-900">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</h2>
              <p class="text-xs text-slate-600 font-semibold">আরআরএফ ভবন, আরআরএফ সড়ক, উপশহর, যশোর-৭৪০০, বাংলাদেশ</p>
              <p class="text-xs text-emerald-800 font-bold mt-1">মানব সম্পদ বিভাগ · প্রত্যয়ন পত্র</p>
            </div>

            <div class="flex justify-between text-xs text-slate-600 mb-6 font-semibold">
              <p>স্মারক নং: RRF/HR/CERT/\${w.slNo}</p>
              <p>তারিখ: \${w.joiningDate}</p>
            </div>

            <h3 class="text-center text-lg font-bold text-slate-900 underline underline-offset-4 mb-6">প্রত্যয়ন পত্র</h3>

            <p class="text-sm text-justify mb-4">
              এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <strong>\${w.workerName}</strong>, পিতা/স্বামী: \${w.fatherHusbandName}, মাতা: \${w.motherName}, 
              স্থায়ী ঠিকানা: গ্রাম/রাস্তা: \${w.permVillage}, ডাকঘর: \${w.permPost}, উপজেলা: \${w.permUpazila}, জেলা: \${w.permDistrict}। 
              তিনি রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)-এর <strong>\${w.branchOffice}</strong> কার্যালয়ে <strong>\${w.designation}</strong> পদে আগামী <strong>\${w.joiningDate}</strong> খ্রিঃ তারিখে যোগদান করিয়াছেন।
            </p>

            <p class="text-sm text-justify mb-6">
              আমাদের জানা মতে, তিনি নৈতিক চরিত্র সম্পন্ন ও সুনাগরিক। তাঁহার জামিনদার হিসেবে <strong>\${w.guarantor1.name}</strong> (সম্পর্ক: \${w.guarantor1.relation}, এনআইডি: \${w.guarantor1.nid}) দায়িত্ব গ্রহণ করিয়াছেন।
            </p>

            <div class="mt-16 pt-8 border-t border-slate-200 flex justify-between text-xs font-bold text-slate-800">
              <div class="text-center">
                <p class="border-t border-slate-400 pt-1">প্রস্তুতকারীর স্বাক্ষর</p>
              </div>
              <div class="text-center">
                <p class="border-t border-slate-400 pt-1">যাচাইকারীর স্বাক্ষর</p>
              </div>
              <div class="text-center">
                <p class="border-t border-slate-400 pt-1">পরিচালক (এইচআর ও প্রশাসন)</p>
                <p class="text-[10px] text-slate-500">রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF)</p>
              </div>
            </div>
          </div>
        \`;
      }

      if (mode === 'verification') {
        return \`
          <div class="bg-white p-6 border rounded-lg text-slate-900 text-xs space-y-4">
            <div class="text-center border-b pb-2">
              <h2 class="text-xl font-bold text-emerald-800">রুরাল রিকন্সট্রাকশন FOUNDATION (RRF)</h2>
              <p class="font-bold text-slate-700">কর্মী তথ্য যাচাইকরণ ফরম (Information Verification Form)</p>
            </div>

            <!-- Sec A -->
            <div class="border p-3 rounded bg-slate-50">
              <h4 class="font-bold text-emerald-900 mb-2 border-b pb-1">সেকশন এ: কর্মীর প্রোফাইল</h4>
              <div class="grid grid-cols-2 gap-2">
                <p><strong>কর্মীর নাম:</strong> \${w.workerName}</p>
                <p><strong>পদবী:</strong> \${w.designation}</p>
                <p><strong>পিতা/স্বামী:</strong> \${w.fatherHusbandName}</p>
                <p><strong>মোবাইল:</strong> \${w.mobile}</p>
                <p><strong>এনআইডি:</strong> \${w.nidNumber}</p>
                <p><strong>শাখা:</strong> \${w.branchOffice}</p>
              </div>
            </div>

            <!-- Sec B -->
            <div class="border p-3 rounded">
              <h4 class="font-bold text-emerald-900 mb-2 border-b pb-1">সেকশন বি: নিকটাত্মীয়ের তথ্য</h4>
              <p class="text-slate-600 mb-1">১. \${w.verificationData?.relatives[0]?.name || 'তথ্য প্রদান করা হয়নি'} (\${w.verificationData?.relatives[0]?.relation || ''}) - \${w.verificationData?.relatives[0]?.mobile || ''}</p>
            </div>

            <!-- Sec C & D -->
            <div class="border p-3 rounded bg-slate-50">
              <h4 class="font-bold text-emerald-900 mb-2 border-b pb-1">সেকশন সি ও ডি: স্থানীয় মতামত</h4>
              <p><strong>চেয়ারম্যান/কাউন্সিলর মতামত:</strong> \${w.verificationData?.chairmanOpinion || 'যাচাইকৃত'}</p>
              <p class="mt-1"><strong>প্রতিবেশীর মতামত:</strong> \${w.verificationData?.neighbor1Opinion || 'সঠিক পাওয়া গিয়াছে'}</p>
            </div>

            <!-- Sec F -->
            <div class="border p-3 rounded border-emerald-300 bg-emerald-50">
              <h4 class="font-bold text-emerald-900 mb-1">সেকশন এফ: তদন্তকারী কর্মকর্তার মন্তব্য ও সিদ্ধান্ত</h4>
              <p><strong>তদন্তকারী:</strong> \${w.verificationData?.investigatingOfficerName} (\${w.verificationData?.investigatingOfficerDesignation})</p>
              <p><strong>মন্তব্য:</strong> \${w.verificationData?.investigationComments}</p>
              <p class="mt-2 font-bold text-emerald-800">সিদ্ধান্ত: \${w.verificationData?.recommendationStatus === 'recommended' ? '✅ সুপারিশকৃত (Recommended)' : '❌ প্রত্যাখ্যাত (Rejected)'}</p>
            </div>
          </div>
        \`;
      }

      // Default Stamp 100
      return \`
        <div class="bg-white p-6 border rounded-lg text-slate-900 text-xs space-y-4">
          <div class="text-center border-b pb-2">
            <h2 class="text-xl font-bold text-emerald-800">১০০ টাকার স্ট্যাম্প চাকুরীর চুক্তিপত্র (RRF Staff Agreement)</h2>
            <p class="text-slate-600 font-semibold">কর্মী: \${w.workerName} · পদবী: \${w.designation} · শাখা: \${w.branchOffice}</p>
          </div>

          <div class="space-y-3 text-justify leading-relaxed">
            <p><strong>প্রথম পক্ষ:</strong> রুরাল রিকন্সট্রাকশন ফাউন্ডেশন (RRF), প্রধান কার্যালয়: উপশহর, যশোর।</p>
            <p><strong>দ্বিতীয় পক্ষ (কর্মী):</strong> \${w.workerName}, পিতা/স্বামী: \${w.fatherHusbandName}, মাতা: \${w.motherName}, এনআইডি: \${w.nidNumber}, মোবাইল: \${w.mobile}।</p>

            <div class="bg-slate-50 p-3 rounded border text-slate-700">
              <p class="font-bold mb-1 text-slate-900">মূল শর্তাবলীসংক্ষেপ:</p>
              <ul class="list-disc pl-4 space-y-1">
                <li>দ্বিতীয় পক্ষ সংস্থা কর্তৃক নির্ধারিত দায়িত্ব ও সততার সাথে পালন করিবেন।</li>
                <li>সংস্থার অর্থ বা সম্পদের কোনো প্রকার ক্ষতি সাধন করিলে জামিনদারসহ আইনানুগ ব্যবস্থা গৃহীত হইবে।</li>
                <li>চাকুরী ত্যাগের ক্ষেত্রে ন্যূনতম ৩০ দিনের অগ্রিম লিখিত নোটিশ প্রদান করিতে হইবে।</li>
              </ul>
            </div>

            <div class="border-t pt-4 grid grid-cols-2 gap-4 mt-6">
              <div>
                <p class="font-bold text-slate-900">জামিনদার ১:</p>
                <p>\${w.guarantor1.name} (\${w.guarantor1.relation})</p>
                <p>এনআইডি: \${w.guarantor1.nid} · ফোন: \${w.guarantor1.mobile}</p>
              </div>
              <div>
                <p class="font-bold text-slate-900">জামিনদার ২:</p>
                <p>\${w.guarantor2.name} (\${w.guarantor2.relation})</p>
                <p>এনআইডি: \${w.guarantor2.nid} · ফোন: \${w.guarantor2.mobile}</p>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    function exportJSONBackup() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workersData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "RRF_HR_Workers_Backup.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    // Initial load
    renderWorkerList();
  </script>
</body>
</html>`;
}

"use client";
import React from "react";

// export default function DataRainPage() {

//   return (
//     <div className="flex flex-col items-center justify-start min-h-[600px] h-full w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 relative">
//       <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Add sources</h1>
//       <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm text-center max-w-2xl">
//         Sources let DataRain base its responses on the information that matters most to you.<br/>
//         <span className="text-xs text-gray-400">(Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)</span>
//       </p>
//       {/* Upload area */}
//       <div className="w-full max-w-2xl flex flex-col items-center mb-4">
//         <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-800 mb-4 relative">
//           <div className="flex flex-col items-center">
//             <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-900 mb-4">
//               <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//               </svg>
//             </div>
//             <div className="font-medium text-gray-700 dark:text-gray-200 mb-1">Upload sources</div>
//             <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Drag & drop or <span className="text-sky-600 cursor-pointer underline">choose file</span> to upload</div>
//             <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3), .png, .jpg, .jpeg, database, spreadsheet</div>
//             {/* File type chips */}
//             <div className="flex flex-wrap gap-2 justify-center mt-2">
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">SQL Server (.mdf, .ndf, .ldf)</span>
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Access (.accdb)</span>
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">SQLite (.db)</span>
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">CSV</span>
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Oracle (.dbf, .ora)</span>
//               <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Excel (.xls, .xlsx)</span>
//             </div>
//           </div>
//         </div>
//         {/* Source options */}
//         <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
//           <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
//             <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Google Drive</div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">Google Docs</button>
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">Google Slides</button>
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">Google Sheets</button>
//             </div>
//           </div>
//           <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
//             <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Link</div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">Website</button>
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">YouTube</button>
//             </div>
//           </div>
//           <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
//             <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Paste text</div>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-medium hover:bg-sky-200">Copied text</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Source limit bar */}
//       <div className="w-full max-w-2xl flex items-center gap-2 mb-4">
//         <span className="text-xs text-gray-400">Source limit</span>
//         <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
//           <div className="h-full bg-sky-500 rounded-full" style={{ width: '0%' }}></div>
//         </div>
//         <span className="text-xs text-gray-400">0 / 50</span>
//       </div>
//       {/* DataRain Notebooks */}
//       <div className="w-full max-w-2xl mb-2">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your DataRain Notebooks</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {/* Mock notebook cards */}
//           <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
//                   <path d="M8 4v16" strokeWidth="2" />
//                 </svg>
//               </span>
//               <span className="font-medium text-gray-900 dark:text-white">Sales Analysis 2024</span>
//             </div>
//             <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 10, 2024</span>
//           </div>
//           <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
//                   <path d="M8 4v16" strokeWidth="2" />
//                 </svg>
//               </span>
//               <span className="font-medium text-gray-900 dark:text-white">Customer Segments</span>
//             </div>
//             <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 28, 2024</span>
//           </div>
//           <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
//                   <path d="M8 4v16" strokeWidth="2" />
//                 </svg>
//               </span>
//               <span className="font-medium text-gray-900 dark:text-white">Market Research Q2</span>
//             </div>
//             <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Mar 15, 2024</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 


//import AskAdoraApp from '@/components/askadora/AskAdoraApp';

// export default function DataRainPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-6">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Data Rain - AI Document Analysis
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Upload and analyze documents with AI-powered insights
//           </p>
//         </div>
        
//         <AskAdoraApp 
//           apiBaseUrl="https://563e8358-acf7-474a-b830-5c7a4aefc9dc-00-3ikehtbgszt7v.riker.replit.dev/api"
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
//         />
//       </div>
//     </div>
//   );
// }

//import AskAdoraScrollableWrapper from '@/components/askadora/AskAdoraScrollableWrapper';

import AskAdoraScrollableWrapper from '@/components/askadora/AskAdoraScrollableWrapper';
export default function DataRainPage() {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Fixed Header */}
      <div className="container mx-auto px-4 py-6 flex-shrink-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Data Rain - AI Document Analysis
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload and analyze documents with AI-powered insights
          </p>
        </div>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 container mx-auto px-4 pb-6 min-h-0">
        <AskAdoraScrollableWrapper 
          apiBaseUrl="https://563e8358-acf7-474a-b830-5c7a4aefc9dc-00-3ikehtbgszt7v.riker.replit.dev/api"
          maxHeight="100%"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full"
        />
      </div>
    </div>
  );
}
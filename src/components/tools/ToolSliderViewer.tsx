"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, PlayCircle, CheckCircle2, FileText, Download } from "lucide-react";

interface Step {
  step: number;
  image: string;
  textEn: string;
  marketingCopy?: string;
}

interface Props {
  totalSteps: number;
  videoId: string;
  steps: Step[];
  locale: string;
  labels: {
    video: string;
    manual: string;
    next: string;
    prev: string;
    complete: string;
  };
}

export default function ToolSliderViewer({ videoId, steps, totalSteps, labels, locale }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const isFinished = activeStep === totalSteps;

  const handleNext = () => {
    if (activeStep < totalSteps) setActiveStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleJump = (index: number) => {
    setActiveStep(index);
  };

  const currentStep = !isFinished ? steps[activeStep] : null;

  return (
    <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-stretch pt-4 min-h-[auto] xl:min-h-[750px]">
      
      {/* --- LEFT: Fixed Video & Index Module --- */}
      <div className="w-full xl:w-[450px] 2xl:w-[500px] flex-shrink-0 flex flex-col justify-start">
        <div className="border-2 border-slate-900 bg-slate-50 flex flex-col h-full rounded-none overflow-hidden">
          
          <div className="bg-slate-900 border-b-2 border-slate-900 text-brand-400 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
              <PlayCircle className="w-4 h-4 text-white" />
              {labels.video}
            </div>
            <div className="text-[10px] font-bold text-slate-400 tracking-wider">MANDATORY VIEWING</div>
          </div>
          
          <div className="w-full aspect-video bg-black relative border-b-2 border-slate-200">
             <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&color=white`}
                title="Operation Video"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
          </div>
          
          <div className="p-4 flex-shrink-0 bg-white border-b-2 border-slate-100">
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Industrial grade piping requires precise alignment. Please completely review this masterclass video overview before moving on to the detailed step-by-step slider on the right.
            </p>
          </div>

          {/* Product Catalog Action Area */}
          <div className="flex-grow bg-white p-4 flex flex-col justify-start gap-4">
             <div className="bg-slate-50 border-2 border-slate-200 p-5 relative overflow-hidden flex flex-col gap-3 group hover:border-brand-300 transition-colors">
                 <div className="flex items-center gap-2 text-brand-600 mb-1">
                    <FileText className="w-5 h-5" />
                    <span className="font-black text-xs uppercase tracking-[0.2em]">Full Specifications</span>
                 </div>
                 <h3 className="font-black text-slate-900 tracking-tight text-xl leading-none">
                    IFAN 731 Series Catalog
                 </h3>
                 <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                    Access complete technical specifications, sizing charts, material properties, and bulk order pricing guidelines for the 731 product series.
                 </p>
                 <a 
                    href="/files/ifan-731-catalog.pdf" 
                    target="_blank"
                    className="mt-auto block w-full text-center bg-slate-900 hover:bg-brand-600 text-white font-black text-xs uppercase tracking-widest py-4 px-4 shadow-[4px_4px_0px_#cbd5e1] hover:shadow-[2px_2px_0px_#cbd5e1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3"
                 >
                    <span>Download Catalog</span>
                    <Download className="w-4 h-4" />
                 </a>
             </div>
          </div>

          <div className="p-4 bg-slate-900 border-t-2 border-slate-900 text-xs font-bold text-slate-400 uppercase tracking-widest flex flex-shrink-0 items-center justify-between">
            <span>Overall Progress</span>
            <span className="text-white font-black px-2 py-1 bg-brand-600 border border-brand-500 shadow-[2px_2px_0px_#ffffff]">
              {activeStep} / {totalSteps}
            </span>
          </div>
          
        </div>
      </div>

      {/* --- RIGHT: Large Interactive Slider --- */}
      <div className="flex-grow w-full border-2 border-slate-900 bg-white flex flex-col relative rounded-none overflow-hidden min-h-[600px] xl:min-h-full">
        
        {/* Top Progress Indicator line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 z-10">
           <div 
             className="h-full bg-brand-600 transition-all duration-300 ease-out"
             style={{ width: `${(activeStep / totalSteps) * 100}%` }}
           />
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col relative h-full">
           
           {!isFinished ? (
             <div className="w-full h-full flex flex-col p-6 md:p-8 xl:p-12 animate-fade-in">
                
                {/* Information Header (Absolute Fixed Height to prevent any layout shift) */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 mb-6 border-b-2 border-slate-100 pb-6 h-[160px] lg:h-[130px] flex-shrink-0 relative">
                   <div className="flex flex-col gap-2 w-full lg:max-w-[70%] h-full justify-center">
                     <div className="flex items-center gap-3 mb-1">
                       <span className="inline-flex w-8 h-8 lg:w-10 lg:h-10 items-center justify-center bg-brand-600 text-white font-black text-lg lg:text-xl rounded-none shadow-[2px_2px_0px_#0f172a]">
                         {currentStep!.step}
                       </span>
                       <span className="text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase text-slate-400">
                          {labels.manual}
                       </span>
                     </div>
                     <h2 className={`font-black text-slate-900 tracking-tight leading-snug transition-all ${
                         (() => {
                           const targetLangKey = locale === 'en' ? 'textEn' : 'text' + locale.charAt(0).toUpperCase() + locale.slice(1);
                           // @ts-ignore
                           const textVal = currentStep![targetLangKey] || currentStep!.textEn || "";
                           const len = textVal.length;
                           if (len < 30) return "text-2xl lg:text-3xl xl:text-4xl";
                           if (len < 60) return "text-xl lg:text-2xl xl:text-3xl";
                           if (len < 90) return "text-lg lg:text-xl xl:text-2xl";
                           return "text-base lg:text-lg xl:text-xl";
                         })()
                     }`}>
                        {/* @ts-ignore */}
                        {currentStep![locale === 'en' ? 'textEn' : 'text' + locale.charAt(0).toUpperCase() + locale.slice(1)] || currentStep!.textEn}
                     </h2>
                   </div>

                   {/* Marketing / Supplemental Copy Box */}
                   {(currentStep!.marketingCopy || "Precision alignment is key to leak-free connections. Follow visual exactly.") && (
                     <div className="hidden lg:flex w-full lg:w-64 bg-brand-50 border-l-4 border-brand-600 p-3 flex-shrink-0 self-center max-h-[100px] overflow-hidden">
                       <p className="text-[10px] xl:text-xs text-brand-800 font-medium leading-relaxed italic line-clamp-4">
                         "{currentStep!.marketingCopy || "Precision alignment is key to leak-free connections. Follow visual exactly."}"
                       </p>
                     </div>
                   )}
                </div>

                {/* Massive Image Container (Fixed Dimensions) */}
                <div className="w-full h-[350px] md:h-[450px] xl:h-[420px] bg-slate-50 border-2 border-slate-200 relative overflow-hidden flex-shrink-0 flex items-center justify-center p-4">
                  <div className="absolute bottom-[-20px] right-[-20px] text-[150px] font-black text-slate-100 uppercase select-none pointer-events-none opacity-50">
                    S{currentStep!.step}
                  </div>
                  <img
                    src={currentStep!.image}
                    alt={currentStep!.textEn}
                    className="relative z-10 w-full h-full object-contain object-center hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

             </div>
           ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 transition-all bg-slate-50">
               <div className="w-24 h-24 bg-white border-4 border-brand-600 flex items-center justify-center rounded-none shadow-[8px_8px_0px_#16a34a] mb-8 relative">
                  <CheckCircle2 className="w-12 h-12 text-brand-600" />
               </div>
               <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
                 {labels.complete}
               </h2>
               <p className="text-slate-500 max-w-md mx-auto">
                 You have successfully reviewed all the necessary steps for proper operation. IFAN ensures reliable connections for global engineering.
               </p>
             </div>
           )}

        </div>

        {/* Bottom Hardcore Controls */}
        <div className="border-t-2 border-slate-900 bg-white p-4 flex-shrink-0 flex items-center justify-between z-10">
           <button
             onClick={handlePrev}
             disabled={activeStep === 0}
             className="px-6 py-3 font-bold uppercase tracking-widest text-xs border-2 border-transparent hover:border-slate-300 disabled:opacity-30 disabled:hover:border-transparent transition-colors flex items-center gap-2"
           >
             <ArrowLeft className="w-4 h-4" /> {labels.prev}
           </button>
           
           <button
             onClick={handleNext}
             disabled={isFinished}
             className={`px-8 py-4 font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all ${
               isFinished
               ? "bg-slate-200 text-slate-400 border-2 border-slate-200 cursor-not-allowed"
               : "bg-brand-600 text-white border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#0f172a] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]"
             }`}
           >
             {labels.next} <ArrowRight className="w-4 h-4" />
           </button>
        </div>

      </div>

    </div>
  );
}

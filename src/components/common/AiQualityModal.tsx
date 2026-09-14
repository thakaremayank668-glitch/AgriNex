import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  BarChart3, 
  Check, 
  RefreshCw,
  Info
} from 'lucide-react';

interface AiQualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGrade?: (grade: string, score: number) => void;
  onApplyInspection?: (grade: string, score: number) => void;
}

export const AiQualityModal: React.FC<AiQualityModalProps> = ({
  isOpen,
  onClose,
  onApplyGrade,
  onApplyInspection,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState(true);

  const demoSamples = [
    {
      name: 'Hybrid Desi Tomato (Sample A)',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop&q=80',
      score: 87,
      grade: 'A',
      freshness: 'Good',
      confidence: 82,
      firmness: 'Firm (4.2 kg/cm²)',
      colorIndex: '92% Deep Red (Mature)',
      blemishFree: '88%',
      sizeAvg: '62mm diameter (Export Standard)',
      premiumImpact: '+₹2.50/kg Premium Approved',
    },
    {
      name: 'Nashik Red Onion (Export Lot)',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=700&auto=format&fit=crop&q=80',
      score: 92,
      grade: 'A+',
      freshness: 'Excellent',
      confidence: 89,
      firmness: 'Compact dry layers',
      colorIndex: '96% Deep Ruby',
      blemishFree: '94%',
      sizeAvg: '55mm uniform diameter',
      premiumImpact: '+₹4.00/kg Premium Approved',
    },
    {
      name: 'Kufri Jyoti Potato (Table Grade)',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=80',
      score: 84,
      grade: 'A',
      freshness: 'Good',
      confidence: 85,
      firmness: 'Solid flesh, zero greening',
      colorIndex: 'Golden buff skin',
      blemishFree: '86%',
      sizeAvg: '45-60mm medium',
      premiumImpact: '+₹1.80/kg Premium Approved',
    },
  ];

  if (!isOpen) return null;

  const activeSample = demoSamples[selectedSample];

  const handleSimulateScan = (index: number) => {
    setSelectedSample(index);
    setAnalyzing(true);
    setHasScanned(false);
    setTimeout(() => {
      setAnalyzing(false);
      setHasScanned(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">AI Quality Check</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Computer Vision v2.6
                </span>
              </div>
              <p className="text-xs text-stone-400">Computer-vision produce assessment eliminating arbitrary mandi deductions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Sample Selector / Upload Action Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Choose Sample or Test Your Camera:
              </span>
              <span className="text-[11px] text-emerald-400">Fast Demonstration Presets</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoSamples.map((sample, idx) => (
                <button
                  key={sample.name}
                  onClick={() => handleSimulateScan(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedSample === idx
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="text-xs font-semibold truncate">{sample.name.split(' ')[0]}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Grade {sample.grade} ({sample.score}%)</div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Dropzone / Camera Capture UI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleSimulateScan(selectedSample)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-stone-700 hover:border-emerald-500 bg-stone-800/40 hover:bg-emerald-950/20 text-stone-300 hover:text-emerald-300 text-xs font-medium transition-all"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Take Live Crop Photo</span>
            </button>
            <button
              onClick={() => handleSimulateScan(selectedSample)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-stone-700 hover:border-emerald-500 bg-stone-800/40 hover:bg-emerald-950/20 text-stone-300 hover:text-emerald-300 text-xs font-medium transition-all"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Produce Photo</span>
            </button>
          </div>

          {/* Visual Scanner Area */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-700 bg-stone-950 aspect-video sm:aspect-21/9 max-h-56 flex items-center justify-center">
            <img
              src={activeSample.image}
              alt={activeSample.name}
              className="w-full h-full object-cover opacity-85"
            />

            {/* Neural scan overlay line */}
            {analyzing && (
              <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-2xs flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-3" />
                <span className="text-xs font-bold text-white tracking-wide uppercase font-mono animate-pulse">
                  Analyzing Produce Surface & Colorimetry...
                </span>
                <span className="text-[11px] text-emerald-300 mt-1">Checking against 50,000 APMC standards</span>
              </div>
            )}

            {/* AI Bounding Boxes & Confidence tags */}
            {!analyzing && hasScanned && (
              <>
                <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md border border-emerald-500/60 rounded-lg px-2.5 py-1 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg">
                  <Scan className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Region 01: Firmness 94%</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-stone-900/90 backdrop-blur-md border border-emerald-500/60 rounded-lg px-2.5 py-1 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Defect-Free: Pass</span>
                </div>
              </>
            )}
          </div>

          {/* Detailed Metric Cards */}
          {hasScanned && !analyzing && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Primary 4 Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">Quality Score</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{activeSample.score}<span className="text-sm font-normal text-stone-400">/100</span></div>
                  <div className="text-[10px] text-emerald-300 font-medium mt-0.5">Top 12% Harvest</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">Freshness</span>
                  <div className="text-xl font-black text-white mt-1">{activeSample.freshness}</div>
                  <div className="text-[10px] text-stone-400 font-medium mt-0.5">Harvested &lt;24h ago</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">Grade</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">{activeSample.grade}</div>
                  <div className="text-[10px] text-amber-300 font-medium mt-0.5">Institutional Export</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">Confidence</span>
                  <div className="text-2xl font-black text-white mt-1">{activeSample.confidence}%</div>
                  <div className="text-[10px] text-stone-400 font-medium mt-0.5">Neural Model v2.6</div>
                </div>
              </div>

              {/* Visual Quality Meter Bar */}
              <div className="p-4 rounded-2xl bg-stone-800/50 border border-stone-700/80">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-stone-300">Composite Grading Index:</span>
                  <span className="text-emerald-400 font-bold">{activeSample.score}% (Grade {activeSample.grade})</span>
                </div>
                <div className="w-full h-3 bg-stone-700 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700" 
                    style={{ width: `${activeSample.score}%` }} 
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 font-mono">
                  <span>Grade C (0-60)</span>
                  <span>Grade B (60-75)</span>
                  <span className="text-emerald-300 font-bold">Grade A (75-90)</span>
                  <span className="text-amber-300 font-bold">Grade A+ (90-100)</span>
                </div>
              </div>

              {/* Parameter Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">Color Uniformity:</span>
                  <span className="font-semibold text-stone-200">{activeSample.colorIndex}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">Pulp Firmness:</span>
                  <span className="font-semibold text-stone-200">{activeSample.firmness}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">Blemish Free Ratio:</span>
                  <span className="font-semibold text-stone-200">{activeSample.blemishFree}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">Size Caliber:</span>
                  <span className="font-semibold text-stone-200">{activeSample.sizeAvg}</span>
                </div>
              </div>

              {/* Economic Impact Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Transparent Price Boost</span>
                    <span className="text-[11px] text-emerald-300">{activeSample.premiumImpact}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-sm">
                  Verified Grade {activeSample.grade}
                </span>
              </div>

              {/* Mandatory SIH Disclaimer as requested in user prompt */}
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700 text-[11px] text-stone-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Notice:</strong> AI analysis is an estimate generated by computer vision heuristics trained on APMC mandi grading benchmarks. Official dispute resolution available via FPO quality assessor.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white text-xs font-medium"
          >
            Close
          </button>

          <button
            onClick={() => {
              const applyFn = onApplyGrade || onApplyInspection;
              if (applyFn) applyFn(activeSample.grade, activeSample.score);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Apply Grade to Listing</span>
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Cpu, Cloud, ArrowRight, CheckCircle2, ChevronRight, Mail, X } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

const projectTypes = [
  { id: 'web', icon: Code, label: 'Enterprise Platforms' },
  { id: 'mobile', icon: Smartphone, label: 'Distributed Client Networks' },
  { id: 'iot', icon: Cpu, label: 'Embedded Relay Systems' },
  { id: 'infrastructure', icon: Cloud, label: 'Sovereign Cloud Infrastructure' },
];

const timelines = [
  { id: 'urgent', label: 'Accelerated Mandate (< 1 Month)' },
  { id: 'standard', label: 'Standard Engagement (1—3 Months)' },
  { id: 'long', label: 'Long-Term Advisory Commission (3+ Months)' },
];

const budgets = [
  { id: 'flexible', label: 'Bespoke Terms — Direct Dialogue' },
  { id: 'mid', label: 'Growth Stage — $10,000 to $50,000' },
  { id: 'scale', label: 'Institutional Scale — $50,000 to $150,000' },
  { id: 'enterprise', label: 'Enterprise Mandate — Bespoke Capitalisation' },
];

export default function ProjectCalculator({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [selection, setSelection] = useState({
    type: '',
    timeline: '',
    budget: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const handleBack = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const getTypeLabel = (id: string) => projectTypes.find(t => t.id === id)?.label || id || 'Not Specified';
    const getTimelineLabel = (id: string) => timelines.find(t => t.id === id)?.label || id || 'Not Specified';
    const getBudgetLabel = (id: string) => budgets.find(b => b.id === id)?.label || id || 'Not Specified';

    try {
      const response = await fetch('/api/engage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selection.type,
          timeline: selection.timeline,
          budget: selection.budget,
          email: selection.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsSuccess(true);
          return;
        }
      }

      await triggerWeb3FormsFallback(getTypeLabel, getTimelineLabel, getBudgetLabel);
    } catch {
      await triggerWeb3FormsFallback(getTypeLabel, getTimelineLabel, getBudgetLabel);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerWeb3FormsFallback = async (
    getTypeLabel: (id: string) => string,
    getTimelineLabel: (id: string) => string,
    getBudgetLabel: (id: string) => string
  ) => {
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!web3Key) {
      setError('Transmission failed. Client-side mail configurations are missing.');
      return;
    }

    try {
      const typeLabel = getTypeLabel(selection.type);
      const timelineLabel = getTimelineLabel(selection.timeline);
      const budgetLabel = getBudgetLabel(selection.budget);
      const currentDate = new Date().toUTCString();

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `[CLIENT-SIDE AUTO-ENGAGE] New Scoping Vector: ${typeLabel}`,
          from_name: 'CALDEV Engineering Studio',
          email: selection.email,
          message: `
[LEAD INGESTED DIRECTLY VIA STATIC CLIENT HANDLER]
Operational Timestamp: ${currentDate} // UTC
Prospect Communication Email: ${selection.email}

Selected Parameters:
- Architecture Vector: ${typeLabel} (${selection.type})
- Target Deployment Window: ${timelineLabel} (${selection.timeline})
- Selected Capital Range: ${budgetLabel} (${selection.budget})

Notice: This lead was routed via static client-side fallback (GitHub Pages deployment). Ensure Zoho SMTP is monitored or Calendly is reviewed for scheduling.
          `
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setError('Transmission failed. Client-side fallback gateway rejected request.');
      }
    } catch {
      setError('Network communication error. Fallback mail server is unreachable.');
    }
  };


  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-20">
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          className="h-full bg-primary-orange"
          initial={{ width: '25%' }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {!isSuccess ? (
        <div className="min-h-[450px] flex flex-col pt-4">
          <div className="mb-8 text-center sm:text-left">
            <span className="text-primary-orange text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
              PHASE 0{step} — IV
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
              {step === 1 && "SELECT ADVISORY VECTOR"}
              {step === 2 && "ESTABLISH ENGAGEMENT TIMELINE"}
              {step === 3 && "CAPITAL ALLOCATION BALANCES"}
              {step === 4 && "CONFIDENTIAL COMMUNICATIONS"}
            </h3>
          </div>

          <div className="flex-grow relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = selection.type === pt.id;
                      return (
                        <button
                          key={pt.id}
                          onClick={() => {
                            setSelection({ ...selection, type: pt.id });
                            setTimeout(handleNext, 300);
                          }}
                          className={`flex flex-col items-center justify-center p-8 rounded-xl border transition-all duration-500 ${
                            isSelected
                              ? 'border-primary-orange bg-primary-orange/5'
                              : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                          }`}
                        >
                          <Icon className={`w-10 h-10 mb-4 transition-colors duration-500 ${isSelected ? 'text-primary-orange' : 'text-white/45'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-white/70'}`}>
                            {pt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-4">
                    {timelines.map((tl) => (
                      <button
                        key={tl.id}
                        onClick={() => {
                          setSelection({ ...selection, timeline: tl.id });
                          setTimeout(handleNext, 300);
                        }}
                        className={`flex items-center p-6 rounded-xl border transition-all duration-500 ${
                          selection.timeline === tl.id
                            ? 'border-primary-orange bg-primary-orange/5'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center transition-colors ${
                          selection.timeline === tl.id ? 'border-primary-orange' : 'border-white/20'
                        }`}>
                          {selection.timeline === tl.id && <div className="w-3 h-3 rounded-full bg-primary-orange" />}
                        </div>
                        <span className={`text-sm font-black uppercase tracking-widest ${selection.timeline === tl.id ? 'text-white' : 'text-white/70'}`}>
                          {tl.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    {budgets.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => {
                          setSelection({ ...selection, budget: bg.id });
                          setTimeout(handleNext, 300);
                        }}
                        className={`flex items-center p-6 rounded-xl border transition-all duration-500 ${
                          selection.budget === bg.id
                            ? 'border-primary-orange bg-primary-orange/5'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center transition-colors ${
                          selection.budget === bg.id ? 'border-primary-orange' : 'border-white/20'
                        }`}>
                          {selection.budget === bg.id && <div className="w-3 h-3 rounded-full bg-primary-orange" />}
                        </div>
                        <span className={`text-sm font-black uppercase tracking-widest ${selection.budget === bg.id ? 'text-white' : 'text-white/70'}`}>
                          {bg.label}
                        </span>
                      </button>
                    ))}
                    <div className="mt-6 p-4 rounded-xl border border-primary-orange/30 bg-primary-orange/[0.02] flex items-center gap-4 animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-primary-orange shrink-0" />
                      <p className="text-white/75 text-[10px] font-mono font-bold uppercase tracking-[0.12em] leading-relaxed text-left">
                        <span className="text-primary-orange font-black">DIRECT PROTOCOL:</span> ALL CAPITALISATION STRATEGIES ARE SUBMITTED TO PRIVATE STRATEGIC ADVISORY AND DIRECT DIALOGUE WITH THE PRINCIPALS.
                      </p>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center space-y-8 pt-8">
                    <div>
                      <label className="text-white/60 text-[10px] font-black mb-3 block uppercase tracking-[0.3em]">
                        AUTHORIZED DIRECT CORRESPONDENCE
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/35" />
                        <input
                          type="email"
                          required
                          value={selection.email}
                          onChange={(e) => setSelection({ ...selection, email: e.target.value })}
                          className="w-full bg-black border border-white/20 rounded-xl py-6 pl-16 pr-6 text-white focus:outline-none focus:border-primary-orange transition-all placeholder:text-white/40 font-bold"
                          placeholder="principal@organization.com"
                        />
                      </div>
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs font-bold text-center">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-orange hover:bg-white text-black font-black py-6 rounded-xl uppercase tracking-[0.2em] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-[0_20px_40px_rgba(255,95,31,0.2)]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                          TRANSMITTING ENCRYPTED BRIEFING...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          DISPATCH SECURE BRIEFING REQUEST <ArrowRight className="w-5 h-5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                    <p className="text-white/40 text-[9px] text-center font-mono uppercase tracking-[0.3em]">
                      SECURE DATA TRANSMISSION SAFEGUARDED. CONFIDENTIALITY IS GUARANTEED.
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {step < 4 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <button
                onClick={handleBack}
                className={`text-white/60 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                PREVIOUS
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !selection.type) ||
                  (step === 2 && !selection.timeline) ||
                  (step === 3 && !selection.budget)
                }
                className="text-primary-orange flex items-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                PROCEED <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-[450px] flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <CheckCircle2 className="w-24 h-24 text-primary-orange mb-8 mx-auto" strokeWidth={1} />
          </motion.div>
          <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">
            BRIEFING REQUEST <br /> DISPATCHED
          </h3>
          <p className="text-white/70 mb-12 max-w-md mx-auto leading-relaxed font-medium uppercase text-[10px] tracking-[0.15em]">
            Engagements logged. The Principal will review your selected parameters and initiate direct correspondence to align on the mandate scope within 24 operational hours via <span className="text-white font-bold">{selection.email}</span>.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setSelection({ type: '', timeline: '', budget: '', email: '' });
            }}
            className="text-primary-orange/60 hover:text-primary-orange text-[10px] font-black uppercase tracking-[0.4em] transition-colors"
          >
            INCEPT NEW ENGAGEMENT PATHWAY
          </button>
        </motion.div>
      )}
    </div>
  );
}


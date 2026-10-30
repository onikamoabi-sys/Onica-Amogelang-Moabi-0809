import React, { useState } from 'react';
import { Lock, ArrowRight, KeyRound, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SpirographMotif } from './SpirographMotif';

export const PrivateGateModal: React.FC = () => {
  const { unlockWithCode, data } = usePortfolio();
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setErrorMsg('Please enter an access passcode.');
      return;
    }
    const success = unlockWithCode(inputCode);
    if (!success) {
      setErrorMsg('Incorrect passcode. Try ONICA2025 or request access.');
    }
  };

  const handleInstantBypass = () => {
    unlockWithCode(data.settings.accessPasscode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b] px-4 overflow-hidden">
      {/* Background radial sunburst motifs */}
      <div className="absolute -top-32 -right-32 opacity-35 scale-125">
        <SpirographMotif size={650} color="gold" />
      </div>
      <div className="absolute -bottom-48 -left-32 opacity-25 scale-125">
        <SpirographMotif size={700} color="white" />
      </div>

      <div className="relative w-full max-w-lg z-10 border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl rounded-2xl text-center">
        {/* Monogram Badge */}
        <div className="mx-auto w-16 h-16 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 shadow-inner">
          <Lock className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs tracking-widest uppercase font-medium text-amber-400 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Private Portfolio Access
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-light text-zinc-100 tracking-tight mb-2">
          Onica A. Moabi
        </h1>
        <p className="text-sm font-sans tracking-widest text-zinc-400 uppercase mb-4">
          Communications Practitioner · Corporate Comms · Digital & PR
        </p>

        <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">
          This portfolio contains corporate communications case studies, proprietary social listening insights, and internal media work shared exclusively with selected recruiters and hiring managers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Enter Recruiter Passcode
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputCode}
                onChange={e => {
                  setInputCode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. ONICA2025"
                className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition font-mono uppercase"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Unlock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-2">{errorMsg}</p>}
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <button
            onClick={handleInstantBypass}
            className="flex items-center gap-1.5 text-amber-400/90 hover:text-amber-300 transition cursor-pointer font-medium"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Click to enter with Recruiter Pass</span>
          </button>

          <a
            href={`mailto:${data.settings.contactEmail}?subject=Requesting%20Portfolio%20Passcode`}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Request Passcode</span>
          </a>
        </div>
      </div>
    </div>
  );
};

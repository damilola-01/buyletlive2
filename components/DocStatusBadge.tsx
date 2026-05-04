import React from 'react';
import { CheckCircle2, Clock, XCircle, FileText } from 'lucide-react';
import type { PropertyDocs, DocStatus } from '../data/properties';

const DOC_LABELS: Record<keyof PropertyDocs, string> = {
  registeredSurvey:     'Registered Survey',
  deedOfAssignment:     'Deed of Assignment',
  governorsConsent:     "Governor's Consent",
  buildingPlanApproval: 'Building Plan Approval',
  cOfO:                 'C of O',
};

const STATUS_CONFIG: Record<DocStatus, { icon: React.ReactNode; label: string; className: string; dot: string }> = {
  available: {
    icon: <CheckCircle2 className="w-4 h-4 shrink-0" />,
    label: 'Available',
    className: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  pending: {
    icon: <Clock className="w-4 h-4 shrink-0" />,
    label: 'Pending',
    className: 'text-amber-700 bg-amber-50 border-amber-200',
    dot: 'bg-amber-400',
  },
  unavailable: {
    icon: <XCircle className="w-4 h-4 shrink-0" />,
    label: 'Unavailable',
    className: 'text-red-600 bg-red-50 border-red-200',
    dot: 'bg-red-400',
  },
};

interface DocStatusBadgeProps {
  docs: PropertyDocs;
  /** 'full' shows the complete table, 'compact' shows a summary strip for listing cards */
  variant?: 'full' | 'compact';
}

export default function DocStatusBadge({ docs, variant = 'full' }: DocStatusBadgeProps) {
  const entries = Object.entries(docs) as [keyof PropertyDocs, DocStatus][];
  const allAvailable = entries.every(([, v]) => v === 'available');
  const availableCount = entries.filter(([, v]) => v === 'available').length;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 w-full">
        <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Docs</span>
        <div className="flex gap-1 ml-auto">
          {entries.map(([key, status]) => (
            <div
              key={key}
              title={`${DOC_LABELS[key]}: ${STATUS_CONFIG[status].label}`}
              className={`w-2 h-2 rounded-full ${STATUS_CONFIG[status].dot}`}
            />
          ))}
        </div>
        <span className={`text-[10px] font-bold ml-1 ${allAvailable ? 'text-emerald-600' : 'text-amber-600'}`}>
          {availableCount}/5
        </span>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center">
          <FileText className="w-5 h-5 text-brand-purple" />
        </div>
        <div>
          <h2 className="text-xl font-serif text-brand-purple-dark">Documentation Status</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-0.5">
            BuyLetLive Verified · For-Sale Properties Only
          </p>
        </div>
        {allAvailable && (
          <span className="ml-auto px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Fully Documented
          </span>
        )}
      </div>

      <div className="divide-y divide-gray-50">
        {entries.map(([key, status]) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <div key={key} className="flex items-center justify-between py-3.5">
              <span className="text-sm font-semibold text-gray-700">{DOC_LABELS[key]}</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.className}`}>
                {cfg.icon}
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-gray-400 font-medium leading-relaxed">
        All documentation statuses are independently verified by BuyLetLive's legal team. 
        Statuses reflect the current state at time of listing and are updated in real-time.
      </p>
    </section>
  );
}

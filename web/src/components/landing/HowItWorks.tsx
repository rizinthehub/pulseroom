import { COPY } from '../../lib/copy';

const steps = [
  { num: '1', text: COPY['landing.how.step1'] },
  { num: '2', text: COPY['landing.how.step2'] },
  { num: '3', text: COPY['landing.how.step3'] },
];

export function HowItWorks() {
  return (
    <div className="mt-12 text-center">
      <p className="text-sm text-text-tertiary mb-4">{COPY['landing.how.title']}</p>
      <div className="flex gap-8 justify-center">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-surface-1 text-text-secondary text-xs flex items-center justify-center">
              {s.num}
            </span>
            <span className="text-sm text-text-secondary">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
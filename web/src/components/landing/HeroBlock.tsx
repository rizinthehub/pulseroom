import { COPY } from '../../lib/copy';

export function HeroBlock() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
        {COPY['landing.headline']}
      </h1>
      <p className="text-lg text-text-secondary">
        {COPY['landing.subheading']}
      </p>
    </div>
  );
}
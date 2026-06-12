import { HeroBlock } from '../components/landing/HeroBlock';
import { CreateRoomButton } from '../components/landing/CreateRoomButton';
import { JoinRoomForm } from '../components/landing/JoinRoomForm';
import { HowItWorks } from '../components/landing/HowItWorks';

export default function LandingRoute() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <HeroBlock />
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <CreateRoomButton />
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-border-default" />
          <span className="text-xs text-text-tertiary">or</span>
          <div className="flex-1 h-px bg-border-default" />
        </div>
        <JoinRoomForm />
      </div>
      <HowItWorks />
    </div>
  );
}
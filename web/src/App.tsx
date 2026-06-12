import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingState } from './components/feedback/LoadingState';
import { RoomStateProvider } from './lib/state/RoomStateContext';
import { ToastProvider } from './components/feedback/ToastProvider';

const LandingRoute = lazy(() => import('./routes/LandingRoute'));
const RoomRoute = lazy(() => import('./routes/RoomRoute'));
const SnapshotRoute = lazy(() => import('./routes/SnapshotRoute'));
const NotFoundRoute = lazy(() => import('./routes/NotFoundRoute'));

export default function App() {
  return (
    <BrowserRouter>
      <RoomStateProvider>
        <ToastProvider>
          <Suspense fallback={<LoadingState title="Loading…" />}>
            <Routes>
              <Route path="/" element={<LandingRoute />} />
              <Route path="/r/:roomCode" element={<RoomRoute />} />
              <Route path="/s/:snapshotId" element={<SnapshotRoute />} />
              <Route path="*" element={<NotFoundRoute />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </RoomStateProvider>
    </BrowserRouter>
  );
}
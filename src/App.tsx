import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WebsiteLayout } from './components/layout/WebsiteLayout';
import { AppLayout } from './components/layout/AppLayout';
import { Website } from './pages/Website';
import { Documentation } from './pages/Documentation';
import { AppDashboard } from './pages/AppDashboard';
import { AppInvestigator } from './pages/AppInvestigator';
import { AppExceptions } from './pages/AppExceptions';
import { AppReview } from './pages/AppReview';
import { AppAudit } from './pages/AppAudit';
import { AppSettings } from './pages/AppSettings';
import { SignIn } from './pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Website />} />
          <Route path="docs" element={<Documentation />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />

        {/* Product Application */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppDashboard />} />
          <Route path="exceptions" element={<AppExceptions />} />
          <Route path="exceptions/:id" element={<AppInvestigator />} />
          <Route path="review" element={<AppReview />} />
          <Route path="audit" element={<AppAudit />} />
          <Route path="settings" element={<AppSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


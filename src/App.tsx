/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  AppTab,
  ProviderRate,
  RateAlert,
  CommunityReport,
  CountryConfig,
  AuthUser,
} from './types';
import {
  getProviders,
  saveProviders,
  getAlerts,
  saveAlerts,
  getCommunityReports,
  saveCommunityReports,
  getAppSettings,
  saveAppSettings,
  getCountries,
  saveCountries,
  getAuthUser,
  saveAuthUser,
} from './services/storage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { OfflineBanner } from './components/OfflineBanner';
import { HomeTab } from './components/HomeTab';
import { CompareTab } from './components/CompareTab';
import { CalculatorTab } from './components/CalculatorTab';
import { AlertsTab } from './components/AlertsTab';
import { CommunityTab } from './components/CommunityTab';
import { OptionsMenuDrawer } from './components/OptionsMenuDrawer';
import { AboutModal } from './components/AboutModal';
import { FeedbackModal } from './components/FeedbackModal';
import { PrivacyModal } from './components/PrivacyModal';
import { SettingsModal } from './components/SettingsModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [initialSettings] = useState(() => getAppSettings());
  const [language, setLanguage] = useState<LanguageCode>(initialSettings.language || 'en');
  const [theme, setTheme] = useState<'dark' | 'light'>(initialSettings.theme || 'dark');
  const [currentTab, setCurrentTab] = useState<AppTab>('home');

  const [sendCurrency, setSendCurrency] = useState<SendCurrencyCode>(
    initialSettings.defaultSend || 'SAR'
  );
  const [receiveCurrency, setReceiveCurrency] = useState<ReceiveCurrencyCode>(
    initialSettings.defaultReceive || 'PKR'
  );
  const [sendAmount, setSendAmount] = useState<number>(1000);

  const [providers, setProviders] = useState<ProviderRate[]>(() => getProviders());
  const [alerts, setAlerts] = useState<RateAlert[]>(() => getAlerts());
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(() =>
    getCommunityReports()
  );
  const [countries, setCountries] = useState<CountryConfig[]>(() => getCountries());
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());

  // Modal States
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginReason, setLoginReason] = useState<string | null>(null);

  const [showSplash, setShowSplash] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    saveAuthUser(user);
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setAuthUser(null);
    saveAuthUser(null);
    showToast('Logged out successfully');
  };

  const handleRequestLogin = (reason: string) => {
    setLoginReason(reason);
    setLoginModalOpen(true);
  };

  // Sync RTL and language attribute
  useEffect(() => {
    const isRtl = language === 'ur' || language === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Sync Theme class and meta theme-color
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#022c22');
    } else {
      document.documentElement.classList.remove('dark');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#ffffff');
    }
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save settings when changed
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    saveAppSettings({
      ...getAppSettings(),
      language: lang,
    });
  };

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveAppSettings({
      ...getAppSettings(),
      theme: next,
    });
  };

  const handleDefaultSendChange = (c: SendCurrencyCode) => {
    setSendCurrency(c);
    saveAppSettings({
      ...getAppSettings(),
      defaultSend: c,
    });
  };

  const handleDefaultReceiveChange = (c: ReceiveCurrencyCode) => {
    setReceiveCurrency(c);
    saveAppSettings({
      ...getAppSettings(),
      defaultReceive: c,
    });
  };

  const handleSaveProviders = (updated: ProviderRate[]) => {
    setProviders(updated);
    saveProviders(updated);
  };

  const handleSaveAlerts = (updated: RateAlert[]) => {
    setAlerts(updated);
    saveAlerts(updated);
  };

  const handleSaveCommunityReports = (updated: CommunityReport[]) => {
    setCommunityReports(updated);
    saveCommunityReports(updated);
  };

  const handleSaveCountries = (updated: CountryConfig[]) => {
    setCountries(updated);
    saveCountries(updated);
  };

  const activeAlertsCount = alerts.filter((a) => a.active).length;

  return (
    <div
      className={`min-h-screen transition-colors overflow-x-hidden w-full max-w-full ${
        theme === 'dark'
          ? 'bg-[#011a14] text-stone-100 selection:bg-amber-400 selection:text-stone-950'
          : 'bg-[#f4fbf7] text-stone-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* 1-second native feel splash screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Offline Toast Banner */}
      <OfflineBanner language={language} />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-2xl border border-amber-200 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar with 3-Dot Menu Button */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        user={authUser}
        onOpenLogin={() => {
          setLoginReason(null);
          setLoginModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area (Clean 5 Tabs) */}
      <main className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 pt-4 min-h-[calc(100vh-120px)]">
        {currentTab === 'home' && (
          <HomeTab
            sendCurrency={sendCurrency}
            onSendCurrencyChange={setSendCurrency}
            receiveCurrency={receiveCurrency}
            onReceiveCurrencyChange={setReceiveCurrency}
            sendAmount={sendAmount}
            onSendAmountChange={setSendAmount}
            providers={providers}
            language={language}
            theme={theme}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'compare' && (
          <CompareTab
            sendCurrency={sendCurrency}
            onSendCurrencyChange={setSendCurrency}
            receiveCurrency={receiveCurrency}
            onReceiveCurrencyChange={setReceiveCurrency}
            sendAmount={sendAmount}
            onSendAmountChange={setSendAmount}
            providers={providers}
            language={language}
            theme={theme}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorTab
            sendCurrency={sendCurrency}
            onSendCurrencyChange={setSendCurrency}
            receiveCurrency={receiveCurrency}
            onReceiveCurrencyChange={setReceiveCurrency}
            sendAmount={sendAmount}
            onSendAmountChange={setSendAmount}
            providers={providers}
            language={language}
            theme={theme}
          />
        )}

        {currentTab === 'alerts' && (
          <AlertsTab
            alerts={alerts}
            onSaveAlerts={handleSaveAlerts}
            language={language}
            theme={theme}
            user={authUser}
            onRequestLogin={handleRequestLogin}
          />
        )}

        {currentTab === 'community' && (
          <CommunityTab
            reports={communityReports}
            onSaveReports={handleSaveCommunityReports}
            language={language}
            theme={theme}
            user={authUser}
            onRequestLogin={handleRequestLogin}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Now strictly 5 items: Home, Compare, Calculator, Alerts, Community) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        theme={theme}
        activeAlertsCount={activeAlertsCount}
      />

      {/* 3-Dot Options Menu Drawer */}
      <OptionsMenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        user={authUser}
        onOpenLogin={() => {
          setLoginReason(null);
          setLoginModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* About Us & Developer Info Modal (Waseem Asif) */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        theme={theme}
      />

      {/* Rate Us & Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        theme={theme}
        onShowToast={showToast}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        theme={theme}
      />

      {/* Settings & Profile Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        defaultSend={sendCurrency}
        onDefaultSendChange={handleDefaultSendChange}
        defaultReceive={receiveCurrency}
        onDefaultReceiveChange={handleDefaultReceiveChange}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Hidden Admin Rate Manager Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        providers={providers}
        onSaveProviders={handleSaveProviders}
        communityReports={communityReports}
        onSaveCommunityReports={handleSaveCommunityReports}
        countries={countries}
        onSaveCountries={handleSaveCountries}
        theme={theme}
      />

      {/* User Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
        reasonMessage={loginReason}
      />
    </div>
  );
}

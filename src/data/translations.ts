import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  tabs: {
    home: string;
    compare: string;
    calculator: string;
    alerts: string;
    community: string;
    settings: string;
  };
  home: {
    todaysBestRate: string;
    bestRateSubtitle: string;
    liveTicker: string;
    quickPairs: string;
    youSend: string;
    receiverGets: string;
    compareAll: string;
    trend24h: string;
    lastUpdated: string;
    topProviders: string;
    rateHistory: string;
    days7: string;
    days30: string;
    bestTimeToTransfer: string;
    aiAdvice: string;
    remittanceTips: string;
    taxFreeNotice: string;
  };
  compare: {
    title: string;
    subtitle: string;
    sortBy: string;
    filterBy: string;
    allMethods: string;
    bankTransfer: string;
    mobileWallet: string;
    cashPickup: string;
    bestRateSort: string;
    lowestFeeSort: string;
    fastestSort: string;
    highestPayoutSort: string;
    bestBadge: string;
    transferFee: string;
    free: string;
    receiverReceives: string;
    rate: string;
    speed: string;
    sendMoney: string;
    details: string;
    extraGain: string;
  };
  calc: {
    title: string;
    subtitle: string;
    amountToSend: string;
    compareUpTo4: string;
    hiddenFeesWarning: string;
    interbankBenchmark: string;
    differenceFromBest: string;
    breakdown: string;
  };
  alerts: {
    title: string;
    subtitle: string;
    setNewAlert: string;
    targetRate: string;
    currentRate: string;
    alertMeWhen: string;
    risesAbove: string;
    dropsBelow: string;
    createAlert: string;
    activeAlerts: string;
    noAlerts: string;
    testNotification: string;
    dailySummary: string;
  };
  community: {
    title: string;
    subtitle: string;
    reportRate: string;
    verifiedReporter: string;
    recentReports: string;
    helpful: string;
    submitReport: string;
    exchangeHouseName: string;
    rateReceived: string;
    feePaid: string;
    branchCity: string;
    optionalComment: string;
    thanksMessage: string;
  };
  settings: {
    title: string;
    preferences: string;
    defaultCurrencyPair: string;
    theme: string;
    darkMode: string;
    lightMode: string;
    language: string;
    offlineStatus: string;
    offlineNotice: string;
    shareWithFriends: string;
    shareWhatsApp: string;
    adminPanel: string;
    installApp: string;
    futureRoadmapTitle: string;
  };
  offline: {
    banner: string;
    offlineMessage: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'RateCompare',
    tagline: 'Best Remittance Rates for Overseas Workers',
    tabs: {
      home: 'Home',
      compare: 'Compare',
      calculator: 'Calculator',
      alerts: 'Alerts',
      community: 'Community',
      settings: 'Settings',
    },
    home: {
      todaysBestRate: "Today's Best Rate",
      bestRateSubtitle: 'Highest money sent home for',
      liveTicker: 'Live Rates',
      quickPairs: 'Quick Pairs',
      youSend: 'You Send',
      receiverGets: 'Receiver Gets',
      compareAll: 'Compare All Rates',
      trend24h: '24h Trend',
      lastUpdated: 'Updated just now',
      topProviders: 'Top Recommended Providers',
      rateHistory: 'Exchange Rate Trend',
      days7: '7 Days',
      days30: '30 Days',
      bestTimeToTransfer: 'Best Time to Send (Smart Trend)',
      aiAdvice: 'Rates are currently 0.8% above the 30-day average. Excellent time to send remittances.',
      remittanceTips: 'Expat Remittance Guide',
      taxFreeNotice: '100% Tax Free: Official banking remittances to Pakistan, India, Bangladesh are tax-exempt.',
    },
    compare: {
      title: 'Compare All Providers',
      subtitle: 'Sorted by maximum money received after all fees',
      sortBy: 'Sort by',
      filterBy: 'Delivery Method',
      allMethods: 'All Methods',
      bankTransfer: 'Bank Deposit',
      mobileWallet: 'Mobile Wallet',
      cashPickup: 'Cash Pickup',
      bestRateSort: 'Best Exchange Rate',
      lowestFeeSort: 'Lowest Fee',
      fastestSort: 'Fastest Speed',
      highestPayoutSort: 'Receiver Gets Most (Total)',
      bestBadge: 'BEST VALUE',
      transferFee: 'Transfer Fee',
      free: 'FREE',
      receiverReceives: 'Total Received',
      rate: 'Exchange Rate',
      speed: 'Delivery Speed',
      sendMoney: 'Send Now',
      details: 'Details',
      extraGain: 'More than lowest bank',
    },
    calc: {
      title: 'Remittance Calculator',
      subtitle: 'Compare exact receiving amounts and hidden exchange markups',
      amountToSend: 'Amount to Send',
      compareUpTo4: 'Side-by-Side Comparison',
      hiddenFeesWarning: 'Hidden Exchange Margin Alert',
      interbankBenchmark: 'Interbank Market Rate',
      differenceFromBest: 'Loss vs Best Option',
      breakdown: 'Transparent Cost Breakdown',
    },
    alerts: {
      title: 'Rate Alerts',
      subtitle: 'Never miss a rate surge. Get instant push alerts.',
      setNewAlert: 'Create Rate Alert',
      targetRate: 'Target Rate',
      currentRate: 'Current Best Rate',
      alertMeWhen: 'Notify me when rate is',
      risesAbove: 'Rises above or equals',
      dropsBelow: 'Drops below',
      createAlert: 'Save Rate Alert',
      activeAlerts: 'Your Active Alerts',
      noAlerts: 'No alerts created yet. Set your target rate above.',
      testNotification: 'Test Alert Notification',
      dailySummary: 'Morning Rate Summary (8:00 AM)',
    },
    community: {
      title: 'Community Rates',
      subtitle: 'Real rates received by overseas expats today at counters and apps',
      reportRate: 'Report Your Rate',
      verifiedReporter: 'Verified Expat',
      recentReports: 'Latest Community Submissions',
      helpful: 'Helpful',
      submitReport: 'Submit Your Rate',
      exchangeHouseName: 'Bank or Exchange House',
      rateReceived: 'Rate You Received',
      feePaid: 'Transfer Fee Paid',
      branchCity: 'City / Branch',
      optionalComment: 'Notes (e.g. queue time, receipt proof)',
      thanksMessage: 'Thank you! Your report helps thousands of expats save money.',
    },
    settings: {
      title: 'Profile & Settings',
      preferences: 'Preferences',
      defaultCurrencyPair: 'Default Currency Pair',
      theme: 'Display Mode',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      offlineStatus: 'Offline Cache',
      offlineNotice: 'All rates are saved offline for instant access without internet.',
      shareWithFriends: 'Share App with Expat Friends',
      shareWhatsApp: 'Share on WhatsApp',
      adminPanel: 'Admin Rate Manager',
      installApp: 'Install RateCompare PWA',
      futureRoadmapTitle: 'Next Upcoming Features',
    },
    offline: {
      banner: 'Offline Mode Active',
      offlineMessage: 'Internet disconnected. Showing latest cached rates.',
    },
  },
  ur: {
    appName: 'ریٹ کمپیئر',
    tagline: 'اوورسیز پاکستانیوں کے لیے لائیو ریٹس کا موازنہ',
    tabs: {
      home: 'ہوم',
      compare: 'موازنہ',
      calculator: 'کیلکولیٹر',
      alerts: 'الرٹس',
      community: 'کمیونٹی',
      settings: 'سیٹنگز',
    },
    home: {
      todaysBestRate: 'آج کا سب سے بہترین ریٹ',
      bestRateSubtitle: 'گھر پیسے بھیجنے پر سب سے زیادہ رقم',
      liveTicker: 'لائیو مارکیٹ ریٹس',
      quickPairs: 'فوری کرنسی سلیکشن',
      youSend: 'آپ بھیجیں',
      receiverGets: 'وصول کنندہ کو ملے گا',
      compareAll: 'تمام بینکوں کا موازنہ',
      trend24h: '24 گھنٹے کا رجحان',
      lastUpdated: 'ابھی اپ ڈیٹ ہوا',
      topProviders: 'نمبر 1 تجویز کردہ ادارے',
      rateHistory: 'ریٹ کی تاریخ (گراف)',
      days7: '7 دن',
      days30: '30 دن',
      bestTimeToTransfer: 'رقم بھیجنے کا بہترین وقت',
      aiAdvice: 'ریٹس 30 دن کی اوسط سے 0.8% زیادہ ہیں۔ پیسے بھیجنے کے لیے بہترین وقت ہے!',
      remittanceTips: 'اوورسیز گائیڈ اور بچت کے طریقے',
      taxFreeNotice: '100% قانونی ترسیلات زر پر پاکستان میں کوئی ٹیکس نہیں ہے۔',
    },
    compare: {
      title: 'تمام بینکوں اور ایکسچینج کا موازنہ',
      subtitle: 'تمام فیسوں کے بعد سب سے زیادہ ملنے والی رقم کے مطابق ترتیب',
      sortBy: 'ترتیب دیں',
      filterBy: 'طریقہ کار',
      allMethods: 'تمام طریقے',
      bankTransfer: 'بینک اکاؤنٹ',
      mobileWallet: 'جاز کیش / ایزی پیسہ',
      cashPickup: 'کاؤنٹر کیش وصولی',
      bestRateSort: 'سب سے زیادہ ریٹ',
      lowestFeeSort: 'کم ترین فیس',
      fastestSort: 'سب سے تیز',
      highestPayoutSort: 'سب سے زیادہ وصولی رقم',
      bestBadge: 'بہترین آپشن',
      transferFee: 'ٹرانسفر فیس',
      free: 'مفت (0 فیس)',
      receiverReceives: 'کل وصول رقم',
      rate: 'ایکسچینج ریٹ',
      speed: 'وقت',
      sendMoney: 'ابھی بھیجیں',
      details: 'تفصیلات',
      extraGain: 'دوسرے بینکوں سے زیادہ فائدہ',
    },
    calc: {
      title: 'ترسیلات زر کیلکولیٹر',
      subtitle: 'چھپی ہوئی کٹوتی اور وصولی رقم کا مکمل حساب',
      amountToSend: 'بھیجنے کی رقم',
      compareUpTo4: 'آمنے سامنے موازنہ',
      hiddenFeesWarning: 'بینکوں کا چھپا ہوا منافع',
      interbankBenchmark: 'انٹر بینک اصل ریٹ',
      differenceFromBest: 'کم ریٹ پر نقصان',
      breakdown: 'مکمل فیس بریک ڈاؤن',
    },
    alerts: {
      title: 'ریٹ الرٹ لگائیں',
      subtitle: 'ریٹ بڑھنے پر فوراً نوٹیفکیشن حاصل کریں',
      setNewAlert: 'نیا ریٹ الرٹ بنائیں',
      targetRate: 'آپ کا مطلوبہ ریٹ',
      currentRate: 'موجودہ بہترین ریٹ',
      alertMeWhen: 'مجھے اطلاع ملے جب ریٹ',
      risesAbove: 'اس ریٹ سے زیادہ یا برابر ہو',
      dropsBelow: 'اس سے نیچے آئے',
      createAlert: 'الرٹ محفوظ کریں',
      activeAlerts: 'فعال الرٹس',
      noAlerts: 'فی الحال کوئی الرٹ سیٹ نہیں ہے۔',
      testNotification: 'ٹیسٹ نوٹیفکیشن چلائیں',
      dailySummary: 'روزانہ صبح 8 بجے ریٹ سمری',
    },
    community: {
      title: 'کمیونٹی ریٹس (رپورٹ)',
      subtitle: 'اوورسیز بھائیوں کے کاؤنٹر سے تصدیق شدہ آج کے ریٹس',
      reportRate: 'اپنا ریٹ رپورٹ کریں',
      verifiedReporter: 'تصدیق شدہ یوزر',
      recentReports: 'تازہ ترین رپورٹ شدہ ریٹس',
      helpful: 'مفید ہے',
      submitReport: 'ریٹ رپورٹ جمع کرائیں',
      exchangeHouseName: 'بینک یا ایکسچینج کا نام',
      rateReceived: 'جو ریٹ آپ کو ملا',
      feePaid: 'دی گئی فیس',
      branchCity: 'شہر یا برانچ',
      optionalComment: 'نوٹس یا تجربہ',
      thanksMessage: 'شکریہ! آپ کی رپورٹ سے دوسرے پردیسی بھائیوں کا فائدہ ہوگا۔',
    },
    settings: {
      title: 'پروفائل اور سیٹنگز',
      preferences: 'ترجیحات',
      defaultCurrencyPair: 'ڈیفالٹ کرنسی',
      theme: 'تھیم (ڈارک / لائٹ)',
      darkMode: 'ڈارک موڈ (سبز و سنہری)',
      lightMode: 'لائٹ موڈ',
      language: 'زبان منتخب کریں',
      offlineStatus: 'آف لائن کیشے',
      offlineNotice: 'تمام ریٹس آف لائن محفوظ ہیں، بنا انٹرنیٹ کے بھی دیکھیں جا سکتے ہیں۔',
      shareWithFriends: 'دوستوں کے ساتھ شیئر کریں',
      shareWhatsApp: 'واٹس ایپ پر بھیجیں',
      adminPanel: 'ایڈمن ریٹ مینیجر',
      installApp: 'ایپ انسٹال کریں (PWA)',
      futureRoadmapTitle: 'اگلی ممکنہ تبدیلیاں اور اپ ڈیٹس',
    },
    offline: {
      banner: 'انٹرنیٹ نہیں ہے',
      offlineMessage: 'انٹرنیٹ نہیں ہے، پرانے محفوظ شدہ ریٹس دکھائے جا رہے ہیں۔',
    },
  },
  hi: {
    appName: 'RateCompare',
    tagline: 'प्रवासियों के लिए लाइव मनी ट्रांसफर रेट्स तुलना',
    tabs: {
      home: 'होम',
      compare: 'तुलना',
      calculator: 'कैलकुलेटर',
      alerts: 'अलर्ट',
      community: 'कम्युनिटी',
      settings: 'सेटिंग्स',
    },
    home: {
      todaysBestRate: 'आज का सबसे बेहतरीन रेट',
      bestRateSubtitle: 'घर पैसे भेजने पर सबसे ज्यादा मिलने वाली रकम',
      liveTicker: 'लाइव मार्केट रेट्स',
      quickPairs: 'त्वरित करेंसी',
      youSend: 'आप भेजें',
      receiverGets: 'प्राप्तकर्ता को मिलेगा',
      compareAll: 'सभी बैंक और ऐप्स की तुलना',
      trend24h: '24 घंटे का ट्रेंड',
      lastUpdated: 'अभी अपडेट हुआ',
      topProviders: 'शीर्ष अनुशंसित प्रदाता',
      rateHistory: 'एक्सचेंज रेट ग्राफ',
      days7: '7 दिन',
      days30: '30 दिन',
      bestTimeToTransfer: 'पैसे भेजने का सबसे अच्छा समय',
      aiAdvice: 'रेट्स 30 दिनों के औसत से 0.8% बेहतर हैं। रेमिटेंस भेजने का सही समय है।',
      remittanceTips: 'प्रवासी बचत गाइड',
      taxFreeNotice: 'आधिकारिक बैंकिंग माध्यम से भारत भेजे गए पैसे पर कोई टैक्स नहीं है।',
    },
    compare: {
      title: 'सभी प्रदाताओं की तुलना करें',
      subtitle: 'सभी फीस के बाद मिलने वाली अधिकतम राशि अनुसार',
      sortBy: 'क्रमबद्ध करें',
      filterBy: 'डिलीवरी का तरीका',
      allMethods: 'सभी तरीके',
      bankTransfer: 'बैंक डिपॉजिट',
      mobileWallet: 'UPI / वॉलेट',
      cashPickup: 'कैश पिकअप',
      bestRateSort: 'सर्वश्रेष्ठ रेट',
      lowestFeeSort: 'सबसे कम फीस',
      fastestSort: 'सबसे तेज़',
      highestPayoutSort: 'अधिकतम प्राप्ति (कुल राशि)',
      bestBadge: 'सर्वश्रेष्ठ विकल्प',
      transferFee: 'ट्रांसफर फीस',
      free: 'मुफ्त (0 फीस)',
      receiverReceives: 'कुल प्राप्त रकम',
      rate: 'एक्सचेंज रेट',
      speed: 'समय',
      sendMoney: 'अभी भेजें',
      details: 'विवरण',
      extraGain: 'अन्य बैंकों से अधिक बचत',
    },
    calc: {
      title: 'रेमिटेंस कैलकुलेटर',
      subtitle: 'सटीक प्राप्त राशि और छिपे हुए शुल्क का हिसाब',
      amountToSend: 'भेजने की राशि',
      compareUpTo4: 'आमने-सामने तुलना',
      hiddenFeesWarning: 'छिपे हुए बैंक मार्जिन की चेतावनी',
      interbankBenchmark: 'इंटरबैंक वास्तविक दर',
      differenceFromBest: 'कम दर पर होने वाला नुकसान',
      breakdown: 'पारदर्शी शुल्क विवरण',
    },
    alerts: {
      title: 'रेट अलर्ट सेट करें',
      subtitle: 'रेट बढ़ने पर तुरंत पुश नोटिफिकेशन पाएं',
      setNewAlert: 'नया रेट अलर्ट बनाएं',
      targetRate: 'लक्षित रेट',
      currentRate: 'वर्तमान श्रेष्ठ रेट',
      alertMeWhen: 'मुझे सूचित करें जब रेट',
      risesAbove: 'इससे ऊपर या बराबर हो',
      dropsBelow: 'इससे नीचे गिरे',
      createAlert: 'अलर्ट सहेजें',
      activeAlerts: 'सक्रिय अलर्ट',
      noAlerts: 'अभी तक कोई अलर्ट नहीं बनाया गया है।',
      testNotification: 'टेस्ट नोटिफिकेशन चलाएं',
      dailySummary: 'सुबह की दैनिक रेट रिपोर्ट (8:00 AM)',
    },
    community: {
      title: 'कम्युनिटी रेट्स',
      subtitle: 'प्रवासी भाइयों द्वारा काउंटरों और ऐप्स पर प्राप्त वास्तविक दरें',
      reportRate: 'अपना रेट बताएं',
      verifiedReporter: 'सत्यापित प्रवासी',
      recentReports: 'नवीनतम रिपोर्ट',
      helpful: 'मददगार',
      submitReport: 'रिपोर्ट सबमिट करें',
      exchangeHouseName: 'बैंक या एक्सचेंज का नाम',
      rateReceived: 'मिला हुआ रेट',
      feePaid: 'दी गई फीस',
      branchCity: 'शहर / शाखा',
      optionalComment: 'टिप्पणी',
      thanksMessage: 'धन्यवाद! आपकी रिपोर्ट से अन्य प्रवासियों को पैसे बचाने में मदद मिलती है।',
    },
    settings: {
      title: 'प्रोफ़ाइल और सेटिंग्स',
      preferences: 'प्राथमिकताएं',
      defaultCurrencyPair: 'डिफ़ॉल्ट करेंसी',
      theme: 'थीम',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      language: 'भाषा चुनें',
      offlineStatus: 'ऑफ़लाइन कैश',
      offlineNotice: 'बिना इंटरनेट के भी सभी रेट्स देखे जा सकते हैं।',
      shareWithFriends: 'दोस्तों के साथ साझा करें',
      shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
      adminPanel: 'एडमिन रेट मैनेजर',
      installApp: 'ऐप इंस्टॉल करें (PWA)',
      futureRoadmapTitle: 'आगामी अपडेट्स',
    },
    offline: {
      banner: 'ऑफ़लाइन मोड',
      offlineMessage: 'इंटरनेट नहीं है, पुराने सहेजे गए रेट्स दिखाए जा रहे हैं।',
    },
  },
  bn: {
    appName: 'RateCompare',
    tagline: 'প্রবাসী কর্মীদের জন্য লাইভ রেমিট্যান্স রেট তুলনা',
    tabs: {
      home: 'হোম',
      compare: 'তুলনা',
      calculator: 'হিসাব',
      alerts: 'অ্যালার্ট',
      community: 'কমিউনিটি',
      settings: 'সেটিংস',
    },
    home: {
      todaysBestRate: 'আজকের সেরা রেট',
      bestRateSubtitle: 'দেশে টাকা পাঠালে সবচেয়ে বেশি টাকা',
      liveTicker: 'লাইভ মার্কেট রেট',
      quickPairs: 'দ্রুত কারেন্সি বাছাই',
      youSend: 'আপনি পাঠাবেন',
      receiverGets: 'প্রাপক পাবে',
      compareAll: 'সবগুলো তুলনা করুন',
      trend24h: '২৪ ঘণ্টার ট্রেন্ড',
      lastUpdated: 'এইমাত্র আপডেট করা হয়েছে',
      topProviders: 'শীর্ষ প্রস্তাবিত প্রতিষ্ঠান',
      rateHistory: 'রেট পরিবর্তনের চার্ট',
      days7: '৭ দিন',
      days30: '৩০ দিন',
      bestTimeToTransfer: 'টাকা পাঠানোর উপযুক্ত সময়',
      aiAdvice: 'রেট ৩০ দিনের গড় থেকে ০.৮% বেশি। দেশে টাকা পাঠানোর জন্য দারুণ সময়!',
      remittanceTips: 'প্রবাসী রেমিট্যান্স গাইড',
      taxFreeNotice: 'বৈধ ব্যাংকিং চ্যানেলে রেমিট্যান্সে বাংলাদেশে সরকারি নগদ প্রণোদনা ও করমুক্ত সুবিধা রয়েছে।',
    },
    compare: {
      title: 'সকল ব্যাংক ও এক্সচেঞ্জ তুলনা',
      subtitle: 'সব ফি কেটে সর্বোচ্চ প্রাপ্ত টাকার ক্রমানুসারে সাজানো',
      sortBy: 'সাজান',
      filterBy: 'পাঠানোর পদ্ধতি',
      allMethods: 'সকল মাধ্যম',
      bankTransfer: 'ব্যাংক একাউন্ট',
      mobileWallet: 'বিকাশ / নগদ',
      cashPickup: 'ক্যাশ পিকআপ',
      bestRateSort: 'সর্বোচ্চ রেট',
      lowestFeeSort: 'সর্বনিম্ন ফি',
      fastestSort: 'সবচেয়ে দ্রুত',
      highestPayoutSort: 'সর্বোচ্চ মোট প্রাপ্তি',
      bestBadge: 'সেরা অফার',
      transferFee: 'ট্রান্সফার ফি',
      free: 'ফ্রি (০ ফি)',
      receiverReceives: 'মোট প্রাপ্ত টাকা',
      rate: 'এক্সচেঞ্জ রেট',
      speed: 'সময়',
      sendMoney: 'এখনই পাঠান',
      details: 'বিস্তারিত',
      extraGain: 'অন্যদের চেয়ে বেশি লাভ',
    },
    calc: {
      title: 'রেমিট্যান্স ক্যালকুলেটর',
      subtitle: 'প্রাপকের প্রাপ্ত টাকা ও লুকানো চার্জের হিসাব',
      amountToSend: 'পাঠানোর পরিমাণ',
      compareUpTo4: 'পাশাপাশি তুলনা',
      hiddenFeesWarning: 'লুকানো এক্সচেঞ্জ মার্জিন',
      interbankBenchmark: 'আসল ইন্টারব্যাংক রেট',
      differenceFromBest: 'অন্য অপশনে ক্ষতি',
      breakdown: 'স্বচ্ছ খরচের হিসাব',
    },
    alerts: {
      title: 'রেট অ্যালার্ট',
      subtitle: 'রেট বাড়লেই সাথে সাথে নোটিফিকেশন পান',
      setNewAlert: 'নতুন অ্যালার্ট সেট করুন',
      targetRate: 'কাঙ্ক্ষিত রেট',
      currentRate: 'বর্তমান সেরা রেট',
      alertMeWhen: 'আমাকে জানান যখন রেট',
      risesAbove: 'সমান বা বেশি হয়',
      dropsBelow: 'নিচে নেমে যায়',
      createAlert: 'অ্যালার্ট সংরক্ষণ করুন',
      activeAlerts: 'সক্রিয় অ্যালার্টসমূহ',
      noAlerts: 'এখনও কোনো অ্যালার্ট তৈরি করা হয়নি।',
      testNotification: 'নোটিফিকেশন পরীক্ষা করুন',
      dailySummary: 'প্রতিদিনের সকালের রেট সামারি (সকাল ৮টা)',
    },
    community: {
      title: 'কমিউনিটি রেট',
      subtitle: 'আজকে কাউন্টার ও অ্যাপে প্রবাসীদের প্রাপ্ত সরাসরি রেট',
      reportRate: 'আপনার রেট জানান',
      verifiedReporter: 'যাচাইকৃত প্রবাসী',
      recentReports: 'সাম্প্রতিক রিপোর্ট',
      helpful: 'উপকারী',
      submitReport: 'রিপোর্ট জমা দিন',
      exchangeHouseName: 'ব্যাংক বা এক্সচেঞ্জের নাম',
      rateReceived: 'প্রাপ্ত রেট',
      feePaid: 'প্রদত্ত ফি',
      branchCity: 'শহর বা শাখা',
      optionalComment: 'মন্তব্য',
      thanksMessage: 'ধন্যবাদ! আপনার রিপোর্ট অন্য প্রবাসীদের টাকা বাঁচাতে সাহায্য করে।',
    },
    settings: {
      title: 'প্রোফাইল ও সেটিংস',
      preferences: 'পছন্দসমূহ',
      defaultCurrencyPair: 'ডিফল্ট কারেন্সি পেয়ার',
      theme: 'থিম নির্বাচন',
      darkMode: 'ডার্ক মোড',
      lightMode: 'লাইট মোড',
      language: 'ভাষা পরিবর্তন',
      offlineStatus: 'অফলাইন ক্যাশ',
      offlineNotice: 'ইন্টারনেট ছাড়াই সমস্ত রেট অফলাইনে দেখা যাবে।',
      shareWithFriends: 'প্রবাসী বন্ধুদের সাথে শেয়ার করুন',
      shareWhatsApp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
      adminPanel: 'অ্যাডমিন রেট প্যানেল',
      installApp: 'অ্যাপ ইনস্টল করুন (PWA)',
      futureRoadmapTitle: 'পরবর্তী আপডেটসমূহ',
    },
    offline: {
      banner: 'ইন্টারনেট সংযোগ নেই',
      offlineMessage: 'ইন্টারনেট নেই, পুরনো সংরক্ষিত রেট দেখানো হচ্ছে।',
    },
  },
  ar: {
    appName: 'RateCompare',
    tagline: 'مقارنة أسعار صرف وتحويل الأموال للمقيمين',
    tabs: {
      home: 'الرئيسية',
      compare: 'المقارنة',
      calculator: 'الحاسبة',
      alerts: 'التنبيهات',
      community: 'المجتمع',
      settings: 'الإعدادات',
    },
    home: {
      todaysBestRate: 'أفضل سعر اليوم',
      bestRateSubtitle: 'أعلى مبلغ يستلمه المستلم عند التحويل إلى',
      liveTicker: 'أسعار الصرف المباشرة',
      quickPairs: 'العملات السريعة',
      youSend: 'المبلغ المرسل',
      receiverGets: 'المستلم يحصل على',
      compareAll: 'مقارنة كافة البنوك',
      trend24h: 'حركة 24 ساعة',
      lastUpdated: 'تم التحديث الآن',
      topProviders: 'أفضل شركات التحويل الموصى بها',
      rateHistory: 'رسم بياني لتاريخ السعر',
      days7: '7 أيام',
      days30: '30 يوماً',
      bestTimeToTransfer: 'الوقت الأنسب للتحويل',
      aiAdvice: 'الأسعار أعلى بنسبة 0.8% من متوسط الشهر. وقت ممتاز لإجراء الحوالة.',
      remittanceTips: 'دليل التوفير والحوالات للمغتربين',
      taxFreeNotice: 'التحويلات المصرفية الرسمية معفاة من الضرائب وآمنة 100%.',
    },
    compare: {
      title: 'مقارنة جميع البنوك وشركات الصرافة',
      subtitle: 'مرتبة حسب أعلى صافي مبلغ يصل للمستلم بعد جميع الرسوم',
      sortBy: 'ترتيب حسب',
      filterBy: 'طريقة الاستلام',
      allMethods: 'جميع الطرق',
      bankTransfer: 'حساب بنكي',
      mobileWallet: 'محفظة إلكترونية',
      cashPickup: 'استلام نقدي كاش',
      bestRateSort: 'أفضل سعر صرف',
      lowestFeeSort: 'أقل رسوم',
      fastestSort: 'الأسرع وصولاً',
      highestPayoutSort: 'أعلى مبلغ مستلم (الإجمالي)',
      bestBadge: 'الخيار الأفضل',
      transferFee: 'رسوم التحويل',
      free: 'مجاني (0 رسوم)',
      receiverReceives: 'إجمالي ما يصل',
      rate: 'سعر الصرف',
      speed: 'وقت الوصول',
      sendMoney: 'حول الآن',
      details: 'التفاصيل',
      extraGain: 'فارق إضافي عن أقل بنك',
    },
    calc: {
      title: 'حاسبة التحويلات الدقيقة',
      subtitle: 'حساب دقيق للمبلغ المستلم وفروقات الهوامش المخفية',
      amountToSend: 'المبلغ المراد تحويله',
      compareUpTo4: 'مقارنة جنبًا إلى جنب',
      hiddenFeesWarning: 'فروقات هوامش الصرف الخفية',
      interbankBenchmark: 'سعر السوق بين البنوك',
      differenceFromBest: 'الفرق عن أفضل خيار',
      breakdown: 'تفصيل التكاليف بشفافية',
    },
    alerts: {
      title: 'تنبيهات أسعار الصرف',
      subtitle: 'احصل على إشعار فوري عند ارتفاع السعر المستهدف',
      setNewAlert: 'إنشاء تنبيه سعر جديد',
      targetRate: 'السعر المستهدف',
      currentRate: 'أفضل سعر حالي',
      alertMeWhen: 'أرسل تنبيهاً عندما يكون السعر',
      risesAbove: 'أعلى من أو يساوي',
      dropsBelow: 'أقل من',
      createAlert: 'حفظ التنبيه',
      activeAlerts: 'تنبيهاتك النشطة',
      noAlerts: 'لا توجد تنبيهات نشطة حالياً.',
      testNotification: 'تجربة إشعار تجريبي',
      dailySummary: 'ملخص يومي في الساعة 8 صباحاً',
    },
    community: {
      title: 'أسعار المجتمع',
      subtitle: 'أسعار حقيقية شاركها المغتربون اليوم من الفروع والتطبيقات',
      reportRate: 'شارك السعر الذي حصلت عليه',
      verifiedReporter: 'مغترب معتمد',
      recentReports: 'أحدث المشاركات',
      helpful: 'مفيد',
      submitReport: 'إرسال السعر',
      exchangeHouseName: 'اسم الصرافة أو البنك',
      rateReceived: 'السعر المحصل',
      feePaid: 'الرسوم المدفوعة',
      branchCity: 'المدينة / الفرع',
      optionalComment: 'ملاحظات وتجربة التحويل',
      thanksMessage: 'شكراً لك! مساهمتك تساعد آلاف المغتربين في توفير أموالهم.',
    },
    settings: {
      title: 'الملف الشخصي والإعدادات',
      preferences: 'التفضيلات',
      defaultCurrencyPair: 'العملة الافتراضية',
      theme: 'المظهر',
      darkMode: 'الوضع الداكن (زمردي وذهبي)',
      lightMode: 'الوضع الفاتح',
      language: 'تغيير اللغة',
      offlineStatus: 'التخزين دون اتصال',
      offlineNotice: 'جميع الأسعار محفوظة على جهازك وتعمل تلقائياً دون إنترنت.',
      shareWithFriends: 'شارك التطبيق مع أصدقائك المغتربين',
      shareWhatsApp: 'مشاركة عبر واتساب',
      adminPanel: 'لوحة إدارة الأسعار',
      installApp: 'تثبيت التطبيق على الشاشة (PWA)',
      futureRoadmapTitle: 'الميزات القادمة في التحديث القادم',
    },
    offline: {
      banner: 'الوضع غير المتصل بالإنترنت',
      offlineMessage: 'لا يوجد اتصال بالإنترنت، يتم عرض أحدث الأسعار المحفوظة.',
    },
  },
};

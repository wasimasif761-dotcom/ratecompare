import React, { useState } from 'react';
import { TrendingUp, Award, Zap, Info } from 'lucide-react';
import { SendCurrencyCode, ReceiveCurrencyCode, LanguageCode } from '../types';
import { getRateHistory } from '../services/storage';
import { TRANSLATIONS } from '../data/translations';

interface RateHistoryChartProps {
  sendCurrency: SendCurrencyCode;
  receiveCurrency: ReceiveCurrencyCode;
  language: LanguageCode;
  theme: 'dark' | 'light';
}

export const RateHistoryChart: React.FC<RateHistoryChartProps> = ({
  sendCurrency,
  receiveCurrency,
  language,
  theme,
}) => {
  const [timeRange, setTimeRange] = useState<7 | 30>(7);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[language]?.home || TRANSLATIONS.en.home;

  const data = getRateHistory(sendCurrency, receiveCurrency, timeRange);

  if (!data || data.length === 0) return null;

  const rates = data.map((d) => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const avgRate = Number((rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(2));
  const latestRate = rates[rates.length - 1];
  const firstRate = rates[0];
  const changePct = Number((((latestRate - firstRate) / firstRate) * 100).toFixed(2));

  // Chart coordinate calculation
  const chartWidth = 320;
  const chartHeight = 110;
  const paddingX = 10;
  const paddingY = 15;

  const range = maxRate - minRate || 1;

  const points = data.map((pt, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (chartWidth - paddingX * 2);
    const normalizedY = (pt.rate - minRate) / range;
    const y = chartHeight - paddingY - normalizedY * (chartHeight - paddingY * 2);
    return { x, y, pt };
  });

  const svgPath = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
  }, '');

  const areaPath = `${svgPath} L ${points[points.length - 1].x},${chartHeight} L ${points[0].x},${chartHeight} Z`;

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div
      className={`rounded-2xl p-4 transition-all border ${
        theme === 'dark'
          ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
          : 'bg-white border-stone-200 text-stone-900 shadow-sm'
      }`}
    >
      {/* Header & Range Selector */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm tracking-tight">{t.rateHistory}</h3>
          </div>
          <p
            className={`text-[11px] ${
              theme === 'dark' ? 'text-emerald-300/70' : 'text-stone-500'
            }`}
          >
            1 {sendCurrency} = {latestRate.toFixed(2)} {receiveCurrency}{' '}
            <span
              className={`font-bold ml-1 ${
                changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {changePct >= 0 ? `▲ +${changePct}%` : `▼ ${changePct}%`}
            </span>
          </p>
        </div>

        {/* 7d vs 30d Toggle */}
        <div
          className={`flex rounded-xl p-0.5 border text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
              : 'bg-stone-100 border-stone-200 text-stone-600'
          }`}
        >
          <button
            onClick={() => setTimeRange(7)}
            className={`px-2.5 py-1 rounded-lg transition ${
              timeRange === 7
                ? theme === 'dark'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-emerald-700 text-white'
                : 'hover:text-white'
            }`}
          >
            {t.days7}
          </button>
          <button
            onClick={() => setTimeRange(30)}
            className={`px-2.5 py-1 rounded-lg transition ${
              timeRange === 30
                ? theme === 'dark'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-emerald-700 text-white'
                : 'hover:text-white'
            }`}
          >
            {t.days30}
          </button>
        </div>
      </div>

      {/* Stats Summary row */}
      <div
        className={`grid grid-cols-3 gap-2 py-2 px-3 rounded-xl mb-3 text-center text-xs ${
          theme === 'dark' ? 'bg-emerald-950/40 border border-emerald-900/30' : 'bg-stone-50 border border-stone-200'
        }`}
      >
        <div>
          <span className="text-[10px] text-stone-400 block">Low</span>
          <span className="font-mono font-bold text-stone-300">{minRate.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[10px] text-stone-400 block">Average</span>
          <span className="font-mono font-bold text-amber-300">{avgRate.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[10px] text-stone-400 block">High</span>
          <span className="font-mono font-bold text-emerald-400">{maxRate.toFixed(2)}</span>
        </div>
      </div>

      {/* SVG Sparkline Area Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-28 overflow-visible select-none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Stroke Line */}
          <path
            d={svgPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Highlight Marker */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingY}
                x2={activePoint.x}
                y2={chartHeight}
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4.5"
                fill="#fbbf24"
                stroke="#022c22"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Invisible tap targets */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - 12}
              y={0}
              width={24}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onTouchStart={() => setHoveredIndex(i)}
            />
          ))}
        </svg>

        {/* Hover Rate Tooltip */}
        {activePoint && (
          <div className="flex justify-between items-center text-[11px] mt-1 text-stone-400 font-mono">
            <span>{activePoint.pt.date}</span>
            <span className="text-amber-300 font-bold">
              1 {sendCurrency} = {activePoint.pt.rate.toFixed(2)} {receiveCurrency}
            </span>
          </div>
        )}
      </div>

      {/* Best Time to Send - AI/Trend Insight */}
      <div
        className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-emerald-950/80 to-[#03291f] border-amber-400/30'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-bold text-amber-300">{t.bestTimeToTransfer}</p>
          <p className={theme === 'dark' ? 'text-emerald-100/90' : 'text-emerald-900'}>
            {t.aiAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useId } from 'react';
import { useLanguage } from '../../i18n';
import { KnownRoute } from '../../utils/seo';

interface IllustrationProps {
  className?: string;
  compact?: boolean;
}

/**
 * 1. Homepage Hero: Abstract Time Illustration, Circular Rings, Floating Numbers & Timeline
 */
export const HeroTimeIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const { fmt } = useLanguage();

  return (
    <div
      aria-hidden="true"
      className={`relative select-none overflow-visible ${className}`}
    >
      <svg
        viewBox="0 0 360 250"
        className="h-auto w-full max-w-[360px] drop-shadow-xs"
        fill="none"
      >
        <defs>
          <linearGradient id={`hero-ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#142B45" />
            <stop offset="100%" stopColor="#E89B45" />
          </linearGradient>
          <radialGradient id={`hero-glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.20" />
            <stop offset="60%" stopColor="#E89B45" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Radial Ambient Aura */}
        <circle cx="182" cy="126" r="106" fill={`url(#hero-glow-${uid})`} />

        {/* Outer Rotating Dashed Orbital Ring */}
        <g className="animate-ageora-spin" style={{ transformOrigin: '182px 126px' }}>
          <circle
            cx="182"
            cy="126"
            r="96"
            stroke="currentColor"
            className="text-[#142B45]/18 dark:text-blue-300/20"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <circle cx="182" cy="30" r="4.5" fill="#E89B45" />
          <circle cx="278" cy="126" r="3.5" fill="#2563EB" />
          <circle cx="98" cy="174" r="3.5" fill="#142B45" className="dark:fill-blue-300" />
        </g>

        {/* Middle Counter-Rotating Timeline Arc */}
        <g className="animate-ageora-spin-reverse" style={{ transformOrigin: '182px 126px' }}>
          <circle
            cx="182"
            cy="126"
            r="74"
            stroke={`url(#hero-ring-${uid})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="190 70 80 125"
          />
        </g>

        {/* Inner Precision Dial */}
        <circle
          cx="182"
          cy="126"
          r="52"
          className="fill-white/90 stroke-[#142B45]/15 dark:fill-[#101C30]/90 dark:stroke-blue-300/20"
          strokeWidth="1.5"
        />

        {/* Dial Tick Marks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="182"
            y1="80"
            x2="182"
            y2={deg % 90 === 0 ? '87' : '84'}
            stroke="currentColor"
            className={
              deg % 90 === 0
                ? 'text-[#2563EB] dark:text-blue-400'
                : 'text-slate-400/70 dark:text-slate-500'
            }
            strokeWidth={deg % 90 === 0 ? '2' : '1.2'}
            strokeLinecap="round"
            transform={`rotate(${deg} 182 126)`}
          />
        ))}

        {/* Clock Hands */}
        <line
          x1="182"
          y1="126"
          x2="182"
          y2="96"
          stroke="currentColor"
          className="text-[#142B45] dark:text-white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="182"
          y1="126"
          x2="207"
          y2="138"
          stroke="#E89B45"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="182" cy="126" r="4.5" fill="#2563EB" />

        {/* Horizontal Bottom Dotted Timeline */}
        <path
          d="M 42 222 Q 182 204 322 222"
          stroke="currentColor"
          className="text-[#142B45]/20 dark:text-slate-600"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          fill="none"
        />
        <circle cx="76" cy="218" r="4" fill="#2563EB" />
        <circle cx="182" cy="213" r="5" fill="#E89B45" />
        <circle cx="288" cy="218" r="4" fill="#142B45" className="dark:fill-blue-300" />

        {/* Floating Number Cards */}
        <g className="animate-ageora-float">
          <rect
            x="24"
            y="42"
            width="76"
            height="36"
            rx="9"
            className="fill-white stroke-[#142B45]/12 dark:fill-[#132238] dark:stroke-blue-400/25"
            strokeWidth="1.2"
          />
          <text
            x="38"
            y="64"
            className="fill-[#142B45] font-mono-num text-[13px] font-bold dark:fill-white"
          >
            {fmt(365)}
          </text>
          <circle cx="86" cy="60" r="4" fill="#E89B45" />
        </g>

        <g className="animate-ageora-float-alt">
          <rect
            x="262"
            y="48"
            width="74"
            height="36"
            rx="9"
            className="fill-white stroke-[#142B45]/12 dark:fill-[#132238] dark:stroke-blue-400/25"
            strokeWidth="1.2"
          />
          <text
            x="276"
            y="70"
            className="fill-[#2563EB] font-mono-num text-[13px] font-bold dark:fill-blue-300"
          >
            {fmt(24)}:{fmt(60)}
          </text>
        </g>

        <g className="animate-ageora-float">
          <rect
            x="254"
            y="162"
            width="78"
            height="34"
            rx="9"
            className="fill-[#142B45] dark:fill-blue-600"
          />
          <text
            x="293"
            y="183"
            textAnchor="middle"
            className="fill-white font-mono-num text-[12px] font-bold"
          >
            {fmt(12)} · {fmt(52)}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Age Calculator: Abstract Clock, Hands, Circular Timeline & Floating Numbers
 */
export const AgeCalculatorIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const { fmt } = useLanguage();

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 180 120" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id={`age-arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#E89B45" />
          </linearGradient>
        </defs>

        <g className="animate-ageora-spin" style={{ transformOrigin: '90px 60px' }}>
          <circle
            cx="90"
            cy="60"
            r="46"
            stroke={`url(#age-arc-${uid})`}
            strokeWidth="2.5"
            strokeDasharray="110 38 75 40"
            strokeLinecap="round"
          />
          <circle cx="90" cy="14" r="3.5" fill="#E89B45" />
        </g>

        <circle
          cx="90"
          cy="60"
          r="34"
          className="fill-white/90 stroke-[#142B45]/15 dark:fill-[#132238] dark:stroke-blue-300/20"
          strokeWidth="1.5"
        />
        <line
          x1="90"
          y1="60"
          x2="90"
          y2="37"
          stroke="currentColor"
          className="text-[#142B45] dark:text-white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="60"
          x2="109"
          y2="68"
          stroke="#E89B45"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="90" cy="60" r="3.5" fill="#2563EB" />

        <g className="animate-ageora-float">
          <rect
            x="10"
            y="18"
            width="42"
            height="24"
            rx="7"
            className="fill-white stroke-[#142B45]/15 dark:fill-[#142B45] dark:stroke-blue-300/25"
            strokeWidth="1"
          />
          <text
            x="31"
            y="34"
            textAnchor="middle"
            className="fill-[#2563EB] font-mono-num text-[11px] font-bold dark:fill-blue-300"
          >
            {fmt(365)}
          </text>
        </g>

        <g className="animate-ageora-float-alt">
          <rect
            x="130"
            y="76"
            width="40"
            height="24"
            rx="7"
            className="fill-[#142B45] dark:fill-blue-600"
          />
          <text
            x="150"
            y="92"
            textAnchor="middle"
            className="fill-white font-mono-num text-[11px] font-bold"
          >
            {fmt(24)}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Birthday Countdown: CSS/SVG Birthday Calendar, Floating Stars & Countdown Number
 */
export const BirthdayCountdownIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => {
  const { fmt } = useLanguage();

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 180 120" className="h-auto w-full" fill="none">
        {/* Calendar Frame */}
        <rect
          x="46"
          y="22"
          width="88"
          height="78"
          rx="12"
          className="fill-white stroke-[#142B45]/15 dark:fill-[#132238] dark:stroke-blue-300/25"
          strokeWidth="1.5"
        />
        {/* Calendar Top Header */}
        <path
          d="M46 34C46 27.3726 51.3726 22 58 22H122C128.627 22 134 27.3726 134 34V44H46V34Z"
          fill="#E89B45"
        />
        {/* Binding Rings */}
        <rect x="68" y="15" width="6" height="14" rx="3" fill="#142B45" className="dark:fill-blue-300" />
        <rect x="106" y="15" width="6" height="14" rx="3" fill="#142B45" className="dark:fill-blue-300" />

        {/* Countdown Number inside Calendar */}
        <text
          x="90"
          y="75"
          textAnchor="middle"
          className="fill-[#142B45] font-mono-num text-[22px] font-extrabold dark:fill-white"
        >
          {fmt(365)}
        </text>
        <line
          x1="64"
          y1="86"
          x2="116"
          y2="86"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Floating Geometric Stars */}
        <g className="animate-ageora-float">
          <path
            d="M28 32L31 40L39 43L31 46L28 54L25 46L17 43L25 40Z"
            fill="#E89B45"
          />
          <circle cx="34" cy="84" r="4" fill="#2563EB" opacity="0.7" />
        </g>
        <g className="animate-ageora-float-alt">
          <path
            d="M154 24L156 30L162 32L156 34L154 40L152 34L146 32L152 30Z"
            fill="#2563EB"
          />
          <rect
            x="136"
            y="72"
            width="34"
            height="22"
            rx="6"
            className="fill-[#142B45] dark:fill-blue-600"
          />
          <text
            x="153"
            y="87"
            textAnchor="middle"
            className="fill-white font-mono-num text-[10px] font-bold"
          >
            {fmt(12)}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Life Statistics: Animated Circular Progress Ring, Dotted Timeline & Floating Number
 */
export const LifeStatisticsIllustration: React.FC<{
  progressPercent?: number;
  className?: string;
}> = ({ progressPercent = 34.5, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const { fmtDec } = useLanguage();
  const clamped = Math.min(100, Math.max(0, progressPercent));
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 120 110" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id={`life-ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#E89B45" />
          </linearGradient>
        </defs>

        {/* Dotted Orbit */}
        <circle
          cx="60"
          cy="52"
          r="46"
          stroke="currentColor"
          className="text-[#142B45]/15 dark:text-slate-700"
          strokeWidth="1.5"
          strokeDasharray="2 5"
        />

        {/* Track */}
        <circle
          cx="60"
          cy="52"
          r={radius}
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="7"
        />

        {/* Animated Progress Ring */}
        <circle
          cx="60"
          cy="52"
          r={radius}
          stroke={`url(#life-ring-${uid})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 52)"
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Center Metric */}
        <text
          x="60"
          y="56"
          textAnchor="middle"
          className="fill-[#142B45] font-mono-num text-[14px] font-extrabold dark:fill-white"
        >
          {fmtDec(clamped, 1)}%
        </text>

        {/* Bottom Dotted Timeline */}
        <line
          x1="14"
          y1="104"
          x2="106"
          y2="104"
          stroke="currentColor"
          className="text-[#142B45]/25 dark:text-slate-600"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <circle cx="24" cy="104" r="3" fill="#2563EB" />
        <circle cx="60" cy="104" r="3.5" fill="#E89B45" />
        <circle cx="96" cy="104" r="3" fill="#142B45" className="dark:fill-blue-300" />
      </svg>
    </div>
  );
};

/**
 * 5. Age Difference: Two Minimal Abstract Avatars & Connecting Timeline
 */
export const AgeDifferenceIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  const { fmt } = useLanguage();

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 180 120" className="h-auto w-full" fill="none">
        {/* Connecting Arc & Dotted Timeline */}
        <path
          d="M 46 54 Q 90 22 134 54"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <line
          x1="46"
          y1="82"
          x2="134"
          y2="82"
          stroke="currentColor"
          className="text-[#142B45]/20 dark:text-slate-600"
          strokeWidth="1.5"
        />

        {/* Avatar 1 (Navy/Blue) */}
        <g className="animate-ageora-float">
          <circle
            cx="42"
            cy="58"
            r="22"
            className="fill-[#EAF2FA] stroke-[#2563EB]/30 dark:fill-[#142B45] dark:stroke-blue-400/40"
            strokeWidth="1.5"
          />
          <circle cx="42" cy="51" r="6.5" fill="#2563EB" />
          <path
            d="M30 69C30 62.5 35.4 59 42 59C48.6 59 54 62.5 54 69"
            fill="#142B45"
            className="dark:fill-blue-300"
          />
        </g>

        {/* Avatar 2 (Warm Orange) */}
        <g className="animate-ageora-float-alt">
          <circle
            cx="138"
            cy="58"
            r="22"
            className="fill-[#F5F1E9] stroke-[#E89B45]/45 dark:fill-[#1B2A42] dark:stroke-amber-400/40"
            strokeWidth="1.5"
          />
          <circle cx="138" cy="51" r="6.5" fill="#E89B45" />
          <path
            d="M126 69C126 62.5 131.4 59 138 59C144.6 59 150 62.5 150 69"
            fill="#142B45"
            className="dark:fill-amber-300"
          />
        </g>

        {/* Center Difference Badge */}
        <rect
          x="68"
          y="70"
          width="44"
          height="22"
          rx="11"
          className="fill-[#142B45] dark:fill-blue-600"
        />
        <text
          x="90"
          y="85"
          textAnchor="middle"
          className="fill-white font-mono-num text-[10px] font-bold"
        >
          Δ {fmt(3)}:{fmt(5)}
        </text>
      </svg>
    </div>
  );
};

/**
 * 6. Life Report: Premium Report Card Illustration, Circular Chart & Floating Data Elements
 */
export const LifeReportIllustration: React.FC<IllustrationProps> = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const { fmt } = useLanguage();

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 200 130" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id={`rep-card-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#142B45" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* Card Base */}
        <rect
          x="32"
          y="16"
          width="136"
          height="98"
          rx="12"
          className="fill-white stroke-[#142B45]/15 dark:fill-[#111C2F] dark:stroke-blue-300/25"
          strokeWidth="1.5"
        />
        {/* Header Bar */}
        <rect x="44" y="28" width="46" height="8" rx="4" fill={`url(#rep-card-${uid})`} />
        <rect
          x="44"
          y="42"
          width="68"
          height="5"
          rx="2.5"
          className="fill-slate-200 dark:fill-slate-700"
        />

        {/* Circular Donut Chart */}
        <circle
          cx="134"
          cy="56"
          r="19"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-700"
          strokeWidth="6"
        />
        <circle
          cx="134"
          cy="56"
          r="19"
          stroke="#2563EB"
          strokeWidth="6"
          strokeDasharray="76 44"
          strokeLinecap="round"
          transform="rotate(-90 134 56)"
        />
        <circle
          cx="134"
          cy="56"
          r="19"
          stroke="#E89B45"
          strokeWidth="6"
          strokeDasharray="28 92"
          strokeLinecap="round"
          transform="rotate(140 134 56)"
        />

        {/* Horizontal Data Bars */}
        <rect x="44" y="64" width="54" height="6" rx="3" fill="#2563EB" opacity="0.85" />
        <rect x="44" y="76" width="40" height="6" rx="3" fill="#E89B45" />
        <rect
          x="44"
          y="88"
          width="62"
          height="6"
          rx="3"
          className="fill-slate-200 dark:fill-slate-700"
        />

        {/* Floating Data Elements */}
        <g className="animate-ageora-float">
          <rect
            x="10"
            y="44"
            width="36"
            height="22"
            rx="6"
            className="fill-[#142B45] dark:fill-blue-600"
          />
          <text
            x="28"
            y="58"
            textAnchor="middle"
            className="fill-white font-mono-num text-[10px] font-bold"
          >
            {fmt(80)}
          </text>
        </g>

        <g className="animate-ageora-float-alt">
          <rect
            x="150"
            y="84"
            width="38"
            height="22"
            rx="6"
            fill="#E89B45"
          />
          <text
            x="169"
            y="98"
            textAnchor="middle"
            className="fill-[#142B45] font-mono-num text-[10px] font-bold"
          >
            {fmt(100)}%
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 7. Abstract Timeline / Milestone Illustration for Zodiac, Day Born, Future Age, Retirement, Million Seconds & Relationship Tools
 */
export const TimelineMilestoneIllustration: React.FC<{
  variant?: 'zodiac' | 'timeline' | 'milestone';
  className?: string;
}> = ({ variant = 'timeline', className = '' }) => {
  const { fmt } = useLanguage();

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <svg viewBox="0 0 180 120" className="h-auto w-full" fill="none">
        {variant === 'zodiac' ? (
          <>
            <g className="animate-ageora-spin" style={{ transformOrigin: '90px 60px' }}>
              <circle
                cx="90"
                cy="60"
                r="44"
                stroke="#E89B45"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <circle cx="90" cy="16" r="3.5" fill="#E89B45" />
              <circle cx="134" cy="60" r="3" fill="#2563EB" />
            </g>
            <circle
              cx="90"
              cy="60"
              r="30"
              className="fill-white/90 stroke-[#2563EB]/30 dark:fill-[#132238] dark:stroke-blue-400/30"
              strokeWidth="1.5"
            />
            <path
              d="M90 36L95 54L113 59L95 64L90 82L85 64L67 59L85 54Z"
              fill="#2563EB"
            />
            <circle cx="90" cy="59" r="5" fill="#E89B45" />
          </>
        ) : (
          <>
            <path
              d="M 20 84 C 55 84, 65 36, 100 36 C 130 36, 138 66, 162 42"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 20 96 L 162 96"
              stroke="currentColor"
              className="text-[#142B45]/20 dark:text-slate-700"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
            <circle cx="38" cy="78" r="5" fill="#2563EB" />
            <circle cx="100" cy="36" r="6" fill="#E89B45" />
            <circle cx="154" cy="48" r="5" fill="#142B45" className="dark:fill-blue-300" />
            <g className="animate-ageora-float">
              <rect
                x="78"
                y="8"
                width="44"
                height="20"
                rx="6"
                className="fill-[#142B45] dark:fill-blue-600"
              />
              <text
                x="100"
                y="21"
                textAnchor="middle"
                className="fill-white font-mono-num text-[10px] font-bold"
              >
                {fmt(2050)}
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

/**
 * Selects the matching code-generated abstract illustration for a calculator route
 */
export const CalculatorHeaderIllustration: React.FC<{
  route: KnownRoute;
  className?: string;
}> = ({ route, className = '' }) => {
  switch (route) {
    case '/age-calculator':
      return <AgeCalculatorIllustration className={className} />;
    case '/birthday-countdown':
    case '/next-birthday':
      return <BirthdayCountdownIllustration className={className} />;
    case '/age-difference-calculator':
    case '/who-is-older':
      return <AgeDifferenceIllustration className={className} />;
    case '/life-report':
      return <LifeReportIllustration className={className} />;
    case '/zodiac-calculator':
      return <TimelineMilestoneIllustration variant="zodiac" className={className} />;
    default:
      return <TimelineMilestoneIllustration variant="timeline" className={className} />;
  }
};

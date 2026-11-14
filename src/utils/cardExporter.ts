import { Language } from '../i18n/types';

export interface LifeReportCardPayload {
  userName?: string;
  ageLabel: string;
  dateOfBirth: string;
  dayOfBirth: string;
  daysLived: string;
  weeksLived: string;
  hoursLived: string;
  minutesLived: string;
  nextBirthday: string;
  zodiacSign: string;
  lifeProgressPercent: number;
  lifeProgressPercentText?: string;
  darkTheme?: boolean;
  lang?: Language;
}

export interface CalculatorCardPayload {
  title: string;
  subtitle: string;
  primaryValue: string;
  highlights: { label: string; value: string }[];
  darkTheme?: boolean;
  lang?: Language;
  filenameSlug?: string;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function triggerCanvasDownload(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve();
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        resolve();
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

async function ensureFontsReady(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed cleanly if font loading throws
    }
  }
}

export async function downloadLifeReportPng(payload: LifeReportCardPayload): Promise<void> {
  await ensureFontsReady();

  const width = 1200;
  const height = 1480;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const isBn = payload.lang === 'bn';
  const displayFont = isBn
    ? '"Noto Sans Bengali", "Plus Jakarta Sans", system-ui, sans-serif'
    : '"Plus Jakarta Sans", "Noto Sans Bengali", system-ui, sans-serif';
  const bodyFont = isBn
    ? '"Noto Sans Bengali", "DM Sans", system-ui, sans-serif'
    : '"DM Sans", "Noto Sans Bengali", system-ui, sans-serif';
  const numFont = isBn
    ? '"Noto Sans Bengali", "JetBrains Mono", system-ui, sans-serif'
    : '"JetBrains Mono", "Plus Jakarta Sans", monospace';

  const isDark = Boolean(payload.darkTheme);
  const bg = isDark ? '#0B1120' : '#FFFFFF';
  const surface = isDark ? '#131C31' : '#F8FAFC';
  const border = isDark ? '#1E293B' : '#E2E8F0';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#475569';
  const accent = '#2563EB';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawRoundedRect(ctx, 48, 48, width - 96, height - 96, 36);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = border;
  ctx.stroke();

  drawRoundedRect(ctx, 96, 96, 48, 48, 12);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(120, 120, 12, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(120, 113);
  ctx.lineTo(120, 120);
  ctx.lineTo(125, 123);
  ctx.stroke();

  ctx.fillStyle = textPrimary;
  ctx.font = `700 30px ${displayFont}`;
  ctx.fillText('Ageora', 162, 130);

  ctx.textAlign = 'right';
  ctx.fillStyle = textSecondary;
  ctx.font = `500 22px ${bodyFont}`;
  ctx.fillText(isBn ? 'ব্যক্তিগত জীবন প্রতিবেদন' : 'Personal Life Report', width - 96, 129);
  ctx.textAlign = 'left';

  ctx.beginPath();
  ctx.moveTo(96, 176);
  ctx.lineTo(width - 96, 176);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.font = `600 22px ${bodyFont}`;
  const overviewText = payload.userName?.trim()
    ? isBn
      ? `${payload.userName.trim()} · জীবন পরিক্রমা`
      : `${payload.userName.trim()} · Life Overview`
    : isBn
    ? 'জীবন পরিক্রমা'
    : 'Life Overview';
  ctx.fillText(overviewText, 96, 240);

  ctx.fillStyle = textPrimary;
  ctx.font = `800 54px ${displayFont}`;
  ctx.fillText(payload.ageLabel, 96, 314, width - 192);

  ctx.fillStyle = textSecondary;
  ctx.font = `400 24px ${bodyFont}`;
  const bornLine = isBn
    ? `জন্ম: ${payload.dayOfBirth}, ${payload.dateOfBirth}  ·  ${payload.zodiacSign}`
    : `Born on ${payload.dayOfBirth}, ${payload.dateOfBirth}  ·  ${payload.zodiacSign}`;
  ctx.fillText(bornLine, 96, 364, width - 192);

  const metrics = isBn
    ? [
        { label: 'মোট অতিক্রান্ত দিন', value: payload.daysLived },
        { label: 'মোট অতিক্রান্ত সপ্তাহ', value: payload.weeksLived },
        { label: 'মোট অতিক্রান্ত ঘণ্টা', value: payload.hoursLived },
        { label: 'মোট অতিক্রান্ত মিনিট', value: payload.minutesLived },
        { label: 'পরবর্তী জন্মদিন', value: payload.nextBirthday },
        { label: 'রাশি', value: payload.zodiacSign },
      ]
    : [
        { label: 'Days Lived', value: payload.daysLived },
        { label: 'Weeks Lived', value: payload.weeksLived },
        { label: 'Hours Lived', value: payload.hoursLived },
        { label: 'Minutes Lived', value: payload.minutesLived },
        { label: 'Next Birthday', value: payload.nextBirthday },
        { label: 'Zodiac Sign', value: payload.zodiacSign },
      ];

  const cardW = (width - 96 * 2 - 28) / 2;
  const cardH = 176;
  const startY = 420;

  metrics.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 96 + col * (cardW + 28);
    const y = startY + row * (cardH + 24);

    drawRoundedRect(ctx, x, y, cardW, cardH, 24);
    ctx.fillStyle = surface;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = border;
    ctx.stroke();

    ctx.fillStyle = textSecondary;
    ctx.font = `500 22px ${bodyFont}`;
    ctx.fillText(item.label, x + 32, y + 58, cardW - 64);

    ctx.fillStyle = textPrimary;
    ctx.font = `700 38px ${numFont}`;
    ctx.fillText(item.value, x + 32, y + 122, cardW - 64);
  });

  const progY = 1044;
  drawRoundedRect(ctx, 96, progY, width - 192, 196, 24);
  ctx.fillStyle = surface;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = border;
  ctx.stroke();

  ctx.fillStyle = textPrimary;
  ctx.font = `600 24px ${displayFont}`;
  ctx.fillText(
    isBn ? '৮০ বছরের জীবন অগ্রগতি সূচক' : 'Illustrative 80-Year Life Progress',
    132,
    progY + 56
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = accent;
  ctx.font = `700 32px ${numFont}`;
  ctx.fillText(
    `${payload.lifeProgressPercentText ?? payload.lifeProgressPercent.toFixed(1)}%`,
    width - 132,
    progY + 58
  );
  ctx.textAlign = 'left';

  const barX = 132;
  const barY = progY + 88;
  const barW = width - 264;
  const barH = 26;
  drawRoundedRect(ctx, barX, barY, barW, barH, 13);
  ctx.fillStyle = isDark ? '#1E293B' : '#E2E8F0';
  ctx.fill();

  const fillW = Math.max(
    26,
    (barW * Math.min(100, Math.max(0, payload.lifeProgressPercent))) / 100
  );
  drawRoundedRect(ctx, barX, barY, fillW, barH, 13);
  ctx.fillStyle = accent;
  ctx.fill();

  ctx.fillStyle = textSecondary;
  ctx.font = `400 20px ${bodyFont}`;
  ctx.fillText(
    isBn
      ? '৮০ বছরের একটি আদর্শ রেফারেন্স স্কেল — কোনো আয়ুষ্কালের পূর্বাভাস নয়।'
      : 'Reference milestone based on an illustrative 80-year scale — not a lifespan prediction.',
    132,
    progY + 158,
    width - 264
  );

  ctx.beginPath();
  ctx.moveTo(96, 1312);
  ctx.lineTo(width - 96, 1312);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = textPrimary;
  ctx.font = `600 24px ${displayFont}`;
  ctx.fillText(
    isBn ? 'আপনার জীবন, সংখ্যারও ঊর্ধ্বে।' : 'Your Life, Beyond Numbers.',
    96,
    1370
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = textSecondary;
  ctx.font = `500 22px ${bodyFont}`;
  ctx.fillText('ageora.app', width - 96, 1370);
  ctx.textAlign = 'left';

  await triggerCanvasDownload(canvas, `ageora-life-report.png`);
}

export async function downloadCalculatorCardPng(payload: CalculatorCardPayload): Promise<void> {
  await ensureFontsReady();

  const width = 1200;
  const height = 820;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const isBn = payload.lang === 'bn';
  const displayFont = isBn
    ? '"Noto Sans Bengali", "Plus Jakarta Sans", system-ui, sans-serif'
    : '"Plus Jakarta Sans", "Noto Sans Bengali", system-ui, sans-serif';
  const bodyFont = isBn
    ? '"Noto Sans Bengali", "DM Sans", system-ui, sans-serif'
    : '"DM Sans", "Noto Sans Bengali", system-ui, sans-serif';
  const numFont = isBn
    ? '"Noto Sans Bengali", "JetBrains Mono", system-ui, sans-serif'
    : '"JetBrains Mono", "Plus Jakarta Sans", monospace';

  const isDark = Boolean(payload.darkTheme);
  const bg = isDark ? '#0B1120' : '#FFFFFF';
  const surface = isDark ? '#131C31' : '#F8FAFC';
  const border = isDark ? '#1E293B' : '#E2E8F0';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#475569';
  const accent = '#2563EB';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 32);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = border;
  ctx.stroke();

  drawRoundedRect(ctx, 88, 84, 42, 42, 10);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(109, 105, 10, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = textPrimary;
  ctx.font = `700 28px ${displayFont}`;
  ctx.fillText('Ageora', 146, 114);

  ctx.textAlign = 'right';
  ctx.fillStyle = textSecondary;
  ctx.font = `500 20px ${bodyFont}`;
  ctx.fillText(payload.title, width - 88, 113, 620);
  ctx.textAlign = 'left';

  ctx.fillStyle = accent;
  ctx.font = `600 22px ${bodyFont}`;
  ctx.fillText(payload.subtitle, 88, 198, width - 176);

  ctx.fillStyle = textPrimary;
  ctx.font = `800 50px ${displayFont}`;
  ctx.fillText(payload.primaryValue, 88, 272, width - 176);

  const items = payload.highlights.slice(0, 4);
  const cols = 2;
  const cardW = (width - 88 * 2 - 24) / cols;
  const cardH = 152;
  items.forEach((item, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = 88 + col * (cardW + 24);
    const y = 336 + row * (cardH + 22);

    drawRoundedRect(ctx, x, y, cardW, cardH, 20);
    ctx.fillStyle = surface;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = border;
    ctx.stroke();

    ctx.fillStyle = textSecondary;
    ctx.font = `500 20px ${bodyFont}`;
    ctx.fillText(item.label, x + 28, y + 52, cardW - 56);

    ctx.fillStyle = textPrimary;
    ctx.font = `700 32px ${numFont}`;
    ctx.fillText(item.value, x + 28, y + 108, cardW - 56);
  });

  ctx.fillStyle = textSecondary;
  ctx.font = `500 20px ${bodyFont}`;
  ctx.fillText(
    isBn ? 'আপনার জীবন, সংখ্যারও ঊর্ধ্বে।' : 'Your Life, Beyond Numbers.',
    88,
    height - 80
  );
  ctx.textAlign = 'right';
  ctx.fillText('ageora.app', width - 88, height - 80);
  ctx.textAlign = 'left';

  const slug =
    payload.filenameSlug ??
    (payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
      'result');
  await triggerCanvasDownload(canvas, `ageora-${slug}.png`);
}

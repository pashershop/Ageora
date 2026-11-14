import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import { MONTH_SHORT_BY_LANG } from '../i18n/helpers';

export interface DateFieldsValue {
  day: string;
  month: string;
  year: string;
}

interface DateInputGroupProps {
  idPrefix: string;
  label?: string;
  value: DateFieldsValue;
  onChange: (next: DateFieldsValue) => void;
  error?: string | null;
  large?: boolean;
  onSubmit?: () => void;
}

export const DateInputGroup: React.FC<DateInputGroupProps> = ({
  idPrefix,
  label,
  value,
  onChange,
  error,
  onSubmit,
}) => {
  const { lang, dict } = useLanguage();
  const monthsShort = MONTH_SHORT_BY_LANG[lang];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const hasValue = Boolean(value.day || value.month || value.year);
  const inputBase = 'h-[38px] text-[13px] px-2.5';

  return (
    <div className="w-full min-w-0">
      {(label || hasValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label ? (
            <span className="text-[12px] font-medium text-[#111827] dark:text-slate-200">
              {label}
            </span>
          ) : (
            <span />
          )}
          {hasValue && (
            <button
              type="button"
              onClick={() => onChange({ day: '', month: '', year: '' })}
              className="inline-flex items-center gap-1 rounded-[6px] px-1.5 py-0.5 text-[11px] font-medium text-[#6B7280] transition-colors hover:bg-slate-100 hover:text-[#111827] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-3 w-3" />
              <span>{dict.common.clear}</span>
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <div className="min-w-0">
          <label
            htmlFor={`${idPrefix}-day`}
            className="mb-1 block text-[12px] font-medium text-[#6B7280] dark:text-slate-400"
          >
            {dict.common.day}
          </label>
          <input
            id={`${idPrefix}-day`}
            type="text"
            inputMode="numeric"
            maxLength={2}
            placeholder={dict.common.dayPlaceholder}
            value={value.day}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              onChange({
                ...value,
                day: e.target.value.replace(/[^\d০-৯]/g, '').slice(0, 2),
              })
            }
            aria-invalid={Boolean(error)}
            className={`w-full min-w-0 rounded-[8px] border bg-white font-mono-num text-[#111827] placeholder:text-slate-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
              error
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#E5E7EB] dark:border-slate-700'
            } ${inputBase}`}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor={`${idPrefix}-month`}
            className="mb-1 block text-[12px] font-medium text-[#6B7280] dark:text-slate-400"
          >
            {dict.common.month}
          </label>
          <select
            id={`${idPrefix}-month`}
            value={value.month}
            onChange={(e) => onChange({ ...value, month: e.target.value })}
            aria-invalid={Boolean(error)}
            className={`w-full min-w-0 rounded-[8px] border bg-white text-[#111827] transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:bg-slate-900 dark:text-white ${
              error
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#E5E7EB] dark:border-slate-700'
            } ${inputBase}`}
          >
            <option value="">{dict.common.monthSelectPlaceholder}</option>
            {monthsShort.map((shortName, idx) => (
              <option key={idx} value={String(idx + 1)}>
                {shortName}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor={`${idPrefix}-year`}
            className="mb-1 block text-[12px] font-medium text-[#6B7280] dark:text-slate-400"
          >
            {dict.common.year}
          </label>
          <input
            id={`${idPrefix}-year`}
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder={dict.common.yearPlaceholder}
            value={value.year}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              onChange({
                ...value,
                year: e.target.value.replace(/[^\d০-৯]/g, '').slice(0, 4),
              })
            }
            aria-invalid={Boolean(error)}
            className={`w-full min-w-0 rounded-[8px] border bg-white font-mono-num text-[#111827] placeholder:text-slate-400 transition-colors focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
              error
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#E5E7EB] dark:border-slate-700'
            } ${inputBase}`}
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-2 flex items-start gap-1.5 rounded-[8px] border border-red-200 bg-red-50 px-2.5 py-2 text-[11px] font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface StaticPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();
  const s = dict.staticPages.about;

  return (
    <article>
      <div className="bg-ageora-subpage-header border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {s.breadcrumb}
            </span>
          </nav>

          <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {s.eyebrow}
          </p>
          <h1 className="mt-1 text-balance text-[24px] font-extrabold tracking-tight text-[#142B45] sm:text-[26px] dark:text-white">
            {s.title}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
            {s.lead}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
        <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
          <div className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#EAF2FA]/65 to-white p-3.5 dark:border-slate-800 dark:from-[#101726] dark:to-[#132036]">
            <h2 className="text-[15px] font-bold text-[#142B45] dark:text-white">
              {s.card1Title}
            </h2>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
              {s.card1Body}
            </p>
          </div>

          <div className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#F5F1E9]/70 to-white p-3.5 dark:border-slate-800 dark:from-[#101726] dark:to-[#142238]">
            <h2 className="text-[15px] font-bold text-[#142B45] dark:text-white">
              {s.card2Title}
            </h2>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
              {s.card2Body}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/explore')}
            className="h-[38px] rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {s.exploreBtn}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="h-[38px] rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {s.blogBtn}
          </button>
        </div>
      </div>
    </article>
  );
};

export const PrivacyPolicyPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();
  const s = dict.staticPages.privacy;

  return (
    <article>
      <div className="bg-ageora-subpage-header border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {s.breadcrumb}
            </span>
          </nav>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#142B45] sm:text-[26px] dark:text-white">
            {s.title}
          </h1>
          <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
            {s.effectiveDate}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <div className="space-y-4 text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300">
        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s1Title}
          </h2>
          <p className="mt-1">{s.s1Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s2Title}
          </h2>
          <p className="mt-1">{s.s2Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s3Title}
          </h2>
          <p className="mt-1">{s.s3Body1}</p>
          <p className="mt-1.5">
            {s.s3Body2Prefix}{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400"
            >
              {s.s3GoogleAds}
            </a>{' '}
            {s.s3Or}{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400"
            >
              {s.s3AboutAds}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s4Title}
          </h2>
          <p className="mt-1">{s.s4Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s5Title}
          </h2>
          <p className="mt-1">
            {s.s5BodyPrefix}{' '}
            <a
              href={buildLocalizedPath('/contact', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400"
            >
              {s.s5ContactLink}
            </a>
            .
          </p>
        </section>
      </div>
      </div>
    </article>
  );
};

export const TermsOfUsePage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();
  const s = dict.staticPages.terms;

  return (
    <article>
      <div className="bg-ageora-subpage-header border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {s.breadcrumb}
            </span>
          </nav>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#142B45] sm:text-[26px] dark:text-white">
            {s.title}
          </h1>
          <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
            {s.updated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <div className="space-y-4 text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300">
        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s1Title}
          </h2>
          <p className="mt-1">{s.s1Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s2Title}
          </h2>
          <p className="mt-1">
            {s.s2BodyPrefix}{' '}
            <a
              href={buildLocalizedPath('/disclaimer', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/disclaimer');
              }}
              className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400"
            >
              {s.s2Link}
            </a>{' '}
            {s.s2BodySuffix}
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s3Title}
          </h2>
          <p className="mt-1">{s.s3Body}</p>
        </section>
      </div>
      </div>
    </article>
  );
};

export const DisclaimerPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();
  const s = dict.staticPages.disclaimer;

  return (
    <article>
      <div className="bg-ageora-subpage-header border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {s.breadcrumb}
            </span>
          </nav>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#142B45] sm:text-[26px] dark:text-white">
            {s.title}
          </h1>
          <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
            {s.updated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <div className="space-y-4 text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300">
        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s1Title}
          </h2>
          <p className="mt-1">{s.s1Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s2Title}
          </h2>
          <p className="mt-1">{s.s2Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s3Title}
          </h2>
          <p className="mt-1">{s.s3Body}</p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {s.s4Title}
          </h2>
          <p className="mt-1">{s.s4Body}</p>
        </section>
      </div>
      </div>
    </article>
  );
};

export const ContactPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const { lang, dict, tr } = useLanguage();
  const s = dict.staticPages.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(s.nameError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(s.emailError);
      return;
    }
    if (message.trim().length < 10) {
      setError(s.messageError);
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section>
      <div className="bg-ageora-subpage-header border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {s.breadcrumb}
            </span>
          </nav>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#142B45] sm:text-[26px] dark:text-white">
            {s.title}
          </h1>
          <p className="mt-1 text-[12px] text-slate-600 sm:text-[13px] dark:text-slate-300">
            {s.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <div className="rounded-[10px] border border-slate-200 bg-white p-3 shadow-2xs sm:p-4 dark:border-slate-800 dark:bg-[#101726]">
        {submitted ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <h2 className="mt-2 text-[17px] font-bold text-slate-900 dark:text-white">
              {s.submittedTitle}
            </h2>
            <p className="mt-1 max-w-md mx-auto text-[12px] text-slate-600 dark:text-slate-400">
              {tr(s.submittedDesc, { name })}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <a
                href={`mailto:contact@ageora.app?subject=${encodeURIComponent(
                  tr(s.emailSubject, { name })
                )}&body=${encodeURIComponent(`${message}\n\n${s.emailLabel}: ${email}`)}`}
                className="inline-flex h-[38px] items-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                {s.openEmailBtn}
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="inline-flex h-[34px] items-center rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {s.writeAnotherBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
              >
                {s.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={s.namePlaceholder}
                className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
              >
                {s.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.emailPlaceholder}
                className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
              >
                {s.messageLabel}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={s.messagePlaceholder}
                className="w-full rounded-[8px] border border-slate-200 bg-white p-2.5 text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-[11px] font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              {s.sendBtn}
            </button>
          </form>
        )}
      </div>
      </div>
    </section>
  );
};

import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { config } from '@/config';
import { ExternalLink, Mail, Copy, Check } from 'lucide-react';
import { GithubIcon, DiscordIcon, InstagramIcon, TelegramIcon } from '@/components/Footer';

const iconMap: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  Discord: DiscordIcon,
  Telegram: TelegramIcon,
  Instagram: InstagramIcon,
};

const links = config.socials.map(s => ({
  ...s,
  icon: iconMap[s.name],
}));

export default function ConnectPage() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopyState('copied');
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('failed');
    }
  }

  const copyLabel =
    copyState === 'copied' ? 'Copied to clipboard.' : copyState === 'failed' ? 'Copy failed — select the address above.' : 'Replies usually within a day.';

  return (
    <div className="page-content">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: "'Geist Mono', monospace" }}>Connect</h1>
          <p className="text-secondary">Find me across the internet</p>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link, i) => (
            <m.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass glass-hover p-4 sm:p-6 flex items-center gap-3 sm:gap-4 no-underline group"
            >
            <div className="text-secondary group-hover:text-foreground transition-colors">
              {link.icon && <link.icon size={20} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Geist Mono', monospace" }}>
                  {link.name}
                </h3>
                <ExternalLink size={12} className="text-muted" />
              </div>
              <p className="text-sm text-secondary">{link.description}</p>
              <p className="text-xs text-muted mt-1 font-mono" style={{ fontFamily: "'Geist Mono', monospace" }}>
                {link.handle}
              </p>
            </div>
            </m.a>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#23a55a] animate-pulse" />
            <span className="text-sm text-secondary">Currently available for collaboration</span>
          </div>
          <p className="text-xs text-muted">
            Open to networking, open source contributions, and interesting projects.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass p-6 sm:p-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mail size={20} className="text-secondary" />
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Geist Mono', monospace" }}>
              Email
            </h2>
          </div>
          <p className="text-sm text-secondary text-center mb-6">
            No contact form — mail me directly and it lands in my inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`mailto:${config.email}`}
              className="glass glass-hover flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono text-foreground no-underline"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              <Mail size={14} className="shrink-0 text-secondary" />
              <span className="truncate">{config.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="glass glass-hover inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono text-secondary hover:text-foreground cursor-pointer shrink-0 sm:min-w-[8.5rem]"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              {copyState === 'copied' ? <Check size={14} className="text-[#23a55a]" /> : <Copy size={14} />}
              {copyState === 'copied' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <p className="text-xs text-muted text-center mt-4 min-h-[1rem]" aria-live="polite">
            {copyLabel}
          </p>
        </m.div>
      </div>
    </div>
  );
}

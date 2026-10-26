import { useState, useRef, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react';
import { m, AnimatePresence } from 'framer-motion';

type Page = 'profile' | 'education' | 'work' | 'connect';

const tabs: { id: Page; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'work', label: 'Work' },
  { id: 'connect', label: 'Connect' },
];

export default function Topbar({ activePage, onNavigate }: { activePage: Page; onNavigate: (p: Page) => void }) {
  const tabRefs = useRef<Map<Page, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);

  const updateIndicator = useCallback(() => {
    const el = tabRefs.current.get(activePage);
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activePage]);

  useEffect(() => {
    const el = tabRefs.current.get(activePage);
    const observer = new ResizeObserver(updateIndicator);
    if (el) observer.observe(el);
    updateIndicator();
    // Web fonts land after first paint and change tab widths.
    document.fonts.ready.then(updateIndicator).catch(() => {});
    window.addEventListener('resize', updateIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator, activePage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    const current = tabs.findIndex((t) => t.id === activePage);
    let next = current;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    const page = tabs[next].id;
    onNavigate(page);
    tabRefs.current.get(page)?.focus();
  }

  return (
    <nav className={`topbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Sections" onKeyDown={handleKeyDown}>
      <div className="topbar-border" />
      <m.div
        className="topbar-indicator"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
          className={`topbar-tab ${activePage === tab.id ? 'active' : ''}`}
          onClick={() => onNavigate(tab.id)}
          type="button"
          aria-current={activePage === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export function PageTransition({ children, pageKey }: { children: ReactNode; pageKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pageKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}

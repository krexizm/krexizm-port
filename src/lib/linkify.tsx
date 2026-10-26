import { Fragment, type ReactNode } from 'react';

export type LinkToken =
  | { type: 'text'; value: string }
  | { type: 'url'; value: string; href: string }
  | { type: 'email'; value: string; href: string };

const TOKEN = /(https?:\/\/[^\s<>]+|www\.[^\s<>]+|[\w.+-]+@[\w-]+\.[a-z]{2,})/gi;
const SIMPLE_TRAIL = '.,;:!?\'"';
const PAIRS: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

/** Splits trailing punctuation off a match so "see https://x.cc." links only the URL. */
function splitTrailing(raw: string): [string, string] {
  let end = raw.length;
  for (;;) {
    const ch = raw[end - 1];
    if (!ch) break;
    if (SIMPLE_TRAIL.includes(ch)) {
      end--;
      continue;
    }
    const open = PAIRS[ch];
    if (open) {
      const head = raw.slice(0, end);
      if (head.split(open).length < head.split(ch).length) {
        end--;
        continue;
      }
    }
    break;
  }
  return [raw.slice(0, end), raw.slice(end)];
}

function toToken(raw: string): LinkToken | null {
  const [value] = splitTrailing(raw);
  if (!value) return null;
  if (value.includes('@') && !/^(https?:\/\/|www\.)/i.test(value)) {
    return { type: 'email', value, href: `mailto:${value}` };
  }
  if (!/^(https?:\/\/|www\.)/i.test(value)) return null;
  return {
    type: 'url',
    value,
    href: /^https?:\/\//i.test(value) ? value : `https://${value}`,
  };
}

/** Tokenizes text into plain text, URLs and email addresses in one pass. */
export function parseLinks(input: string): LinkToken[] {
  const tokens: LinkToken[] = [];
  let last = 0;

  for (const match of input.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) tokens.push({ type: 'text', value: input.slice(last, start) });

    const full = match[0];
    const token = toToken(full);
    if (token) {
      tokens.push(token);
      const trailing = full.slice(token.value.length);
      if (trailing) tokens.push({ type: 'text', value: trailing });
    } else {
      tokens.push({ type: 'text', value: full });
    }
    last = start + full.length;
  }

  if (last < input.length) tokens.push({ type: 'text', value: input.slice(last) });
  return tokens;
}

export function LinkifiedText({ text, className }: { text: string; className?: string }): ReactNode {
  return (
    <Fragment>
      {parseLinks(text).map((token, i) =>
        token.type === 'text' ? (
          <Fragment key={i}>{token.value}</Fragment>
        ) : (
          <a
            key={i}
            href={token.href}
            {...(token.type === 'url' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`${className ?? ''} text-foreground underline decoration-white/30 underline-offset-2 hover:decoration-white/70 transition-colors break-words`}
          >
            {token.value}
          </a>
        ),
      )}
    </Fragment>
  );
}

import assert from 'node:assert/strict';
import { parseLinks } from '../src/lib/linkify';

const sample = '🚀 hey — mail test@example.com\nsite https://krexizm.cc/ (status www.krexizm.cc). bye!';
const tokens = parseLinks(sample);

assert.deepEqual(
  tokens.filter((t) => t.type === 'email').map((t) => t.href),
  ['mailto:test@example.com'],
);
assert.deepEqual(
  tokens.filter((t) => t.type === 'url').map((t) => t.href),
  ['https://krexizm.cc/', 'https://www.krexizm.cc'],
);
// Emoji, newlines and punctuation survive untouched.
assert.equal(tokens.map((t) => t.value).join(''), sample);
assert.equal(parseLinks('plain text, no links').length, 1);
assert.equal(parseLinks('javascript:alert(1)')[0].type, 'text');

console.log('linkify ok');

# krexizm

Personal portfolio site for [myself](https://krexizm.cc) — built with React, TypeScript, and Vite.

## Features

- Real-time Discord status via [Lanyard](https://lanyard.eggsy.xyz/) WebSocket
- Live Vienna clock + live age counter
- GitHub repos, contribution graph, language stats, and star counts
- Discord widgets (current/played games)
- Contact by direct email link with a copy-to-clipboard button
- Animated page transitions with Framer Motion
- Dark glassmorphism design with responsive layout
- Code-split pages via React.lazy
- Auto-generated sitemap.xml
- Discord component link embed (custom preview when the site is shared)

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion 12
- Lucide React (icons)
- React Icons (tech logos)
- React Country Flag

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. Sitemap is auto-generated at `dist/sitemap.xml`.

## Project Structure

```
src/
├── components/       # Topbar, Footer, ErrorBoundary, SplitText, BlurText, CountUp
│   └── ui/           # shadcn Badge component
├── hooks/            # useLanyard (Discord WebSocket)
├── lib/              # Utilities (flags, tech icons, Discord helpers, linkify, fetch hook)
├── pages/            # Profile, Education, Work, Connect
├── config.ts         # Site configuration
├── App.tsx           # Root with lazy-loaded pages
├── main.tsx          # Entry point with ErrorBoundary
└── index.css         # Global styles + glass utilities
```

## Configuration

Edit `src/config.ts` to update:

- Display name, subtitle, location, country
- Discord user ID
- GitHub username
- Social links (GitHub, Discord, Telegram, Instagram)
- Skills and tech stack

## Contact

The Connect page opens a `mailto:` link and can copy the address to the clipboard; no third-party form service is involved. The address lives in `src/config.ts` as `email`.

## Discord link embed

`index.html` contains a `<script id="discord:component-embed" type="application/json">` block that Discord reads when the site is shared, replacing the default preview with a container, buttons and the Open Graph image. It must stay in the server-rendered markup (max 3000 bytes) and the Open Graph tags remain as fallback. Validate changes with the [Embed Debugger](https://discord.com/developers/embeds).

## License

[Apache-2.0 License](LICENSE)

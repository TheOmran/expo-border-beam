# expo-border-beam

React-Native/Expo port of [Jakubantalik/border-beam](https://github.com/Jakubantalik/border-beam) — an animated border-beam glow effect for mobile UI.

## Why a port?

The original web component relies on browser-only CSS features (`@property`, `conic-gradient`, CSS `mask`, dynamic `<style>` injection, `MutationObserver`). React Native doesn't run those. This port keeps the same **public API** (`size`, `colorVariant`, `theme`, `duration`, `active`, `strength`, `brightness`, `onActivate`, `onDeactivate`, …) but renders the beam with:

- **`react-native-svg`** — rounded-rect stroke with `strokeDasharray` to produce a traveling bright segment; layered strokes at increasing width + decreasing opacity create the bloom; `<LinearGradient>` defs supply the colors.
- **`react-native-reanimated`** — animates `strokeDashoffset` on the UI thread for butter-smooth rotation and handles the active-state fade.

## Quick start

```bash
npm install
npx expo start --tunnel
```

`--tunnel` uses ngrok under the hood and prints a QR code + a `exp://…ngrok.io/…` URL that Expo Go on your phone can open from anywhere on the internet (no LAN needed).

> **Note on Cloudflare:** Expo's CLI only ships a tunnel integration for ngrok. A Cloudflare Quick Tunnel wraps HTTP, but Expo Go needs the Metro bundler's WebSocket + exp:// scheme, which ngrok handles correctly out of the box. If you need Cloudflare specifically, run `cloudflared tunnel --url http://localhost:8081` alongside `expo start`, then open Expo Go manually with `exp://<cloudflare-url>` — YMMV.

## Usage

```tsx
import { BorderBeam } from '@/src/BorderBeam';

<BorderBeam size="md" colorVariant="colorful">
  <View style={{ padding: 20, borderRadius: 16, backgroundColor: '#14141c' }}>
    <Text style={{ color: '#fff' }}>Hello beam</Text>
  </View>
</BorderBeam>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'line'` | `'md'` | `line` renders a bottom-only traveling glow. |
| `colorVariant` | `'colorful' \| 'mono' \| 'ocean' \| 'sunset'` | `'colorful'` | |
| `theme` | `'dark' \| 'light' \| 'auto'` | `'dark'` | `auto` uses RN's `useColorScheme`. |
| `duration` | `number` (seconds) | `1.96` (or `2.4` for `line`) | Travel time for one lap. |
| `active` | `boolean` | `true` | Fades in/out when toggled. |
| `borderRadius` | `number` | size-preset | |
| `brightness` | `number` | `1.3` | Multiplier on stop opacity. |
| `saturation` | `number` | theme-default | |
| `strength` | `number` (0–1) | `1` | Overall beam + bloom opacity. |
| `onActivate` / `onDeactivate` | `() => void` | — | Fires when the fade completes. |

## Project layout

```
app/
  _layout.tsx        Expo Router root
  index.tsx          Demo screen with variant switcher
src/
  BorderBeam/
    BorderBeam.tsx   The component
    presets.ts       Size + theme + palette presets
    types.ts
    index.ts
```

## Known deviations from the web original

- **No `MutationObserver` auto-radius detection.** Pass `borderRadius` explicitly (or rely on the size preset).
- **No CSS hue-shift animation.** The color cycle comes from the multi-stop linear gradient itself rather than a CSS `@property` tween. `hueRange` is accepted for API compat but not used.
- **Bloom is faked with layered strokes** rather than a CSS `filter: blur()` — visually close, cheaper on-device.

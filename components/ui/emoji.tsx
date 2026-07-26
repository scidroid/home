/* eslint-disable @next/next/no-img-element */

// Renders emoji as self-hosted Apple-style images (from emoji-datasource)
// so they look the same on every OS instead of falling back to the
// platform's native set.

const EMOJI_FILES: Record<string, string> = {
  "🌍": "1f30d",
  "🌎": "1f30e",
  "🌏": "1f30f",
  "✨": "2728",
  "🦟": "1f99f",
  "🚀": "1f680",
  "🔬": "1f52c",
  "💻": "1f4bb",
  "🎓": "1f393",
  "🪪": "1faaa",
  "🥉": "1f949",
  "📜": "1f4dc",
  "🥇": "1f947",
  "📄": "1f4c4",
  "📞": "1f4de",
  "✉️": "2709-fe0f",
  "🇨🇴": "1f1e8-1f1f4",
  "🇨🇭": "1f1e8-1f1ed",
  "🇧🇮": "1f1e7-1f1ee",
  "🇯🇵": "1f1ef-1f1f5",
  "🇺🇸": "1f1fa-1f1f8",
  "👶": "1f476",
  "🧒": "1f9d2",
  "👦": "1f466",
  "👨‍👩‍👧‍👦": "1f468-200d-1f469-200d-1f467-200d-1f466",
  "👴": "1f474",
  "🏥": "1f3e5",
  "🌾": "1f33e",
  "🎨": "1f3a8"
};

export function Emoji({
  symbol,
  className = "w-4 h-4"
}: {
  symbol: keyof typeof EMOJI_FILES;
  className?: string;
}) {
  const file = EMOJI_FILES[symbol];

  // Fall back to the native glyph for anything not in the map.
  if (!file) return <span aria-hidden="true">{symbol}</span>;

  return (
    <img
      src={`/emoji/${file}.png`}
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      draggable={false}
      className={`inline-block select-none ${className}`}
    />
  );
}

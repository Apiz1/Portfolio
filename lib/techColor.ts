const COLORS = [
  "border-blue-400/30 hover:bg-blue-400/10",
  "border-green-400/30 hover:bg-green-400/10",
  "border-purple-400/30 hover:bg-purple-400/10",
  "border-pink-400/30 hover:bg-pink-400/10",
  "border-yellow-400/30 hover:bg-yellow-400/10",
  "border-red-400/30 hover:bg-red-400/10",
  "border-indigo-400/30 hover:bg-indigo-400/10",
  "border-teal-400/30 hover:bg-teal-400/10",
];

export function techColor(tech: string): string {
  let hash = 0;
  for (let i = 0; i < tech.length; i++) {
    hash = tech.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

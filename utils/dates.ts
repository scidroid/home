const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export function timeAgo(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;

  if (diff < 5 * MINUTE) return "just now";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)}d ago`;
  if (diff < MONTH) return `${Math.floor(diff / WEEK)}w ago`;
  if (diff < YEAR) return `${Math.floor(diff / MONTH)}mo ago`;

  return `${Math.floor(diff / YEAR)}y ago`;
}

export function formatDate(date: string) {
  const fullDate = new Date(date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  return `${fullDate} (${timeAgo(date)})`;
}

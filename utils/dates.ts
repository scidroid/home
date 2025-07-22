export function formatDate(date: string) {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffDays / 365.25);

  function formatTimeAgo() {
    if (diffMin < 5) return "just now";
    if (diffMin < 60)
      return `${diffMin}m${diffSec % 60 > 0 ? ` ${diffSec % 60}s` : ""} ago`;
    if (diffHrs < 24)
      return `${diffHrs}h${diffMin % 60 > 0 ? ` ${diffMin % 60}m` : ""} ago`;
    if (diffDays < 7)
      return `${diffDays}d${diffHrs % 24 > 0 ? ` ${diffHrs % 24}h` : ""} ago`;
    if (diffWeeks < 4)
      return `${diffWeeks}w${diffDays % 7 > 0 ? ` ${diffDays % 7}d` : ""} ago`;
    if (diffMonths < 12)
      return `${diffMonths}mo${diffWeeks % 4 > 0 ? ` ${diffWeeks % 4}w` : ""} ago`;
    return `${diffYears}y${diffMonths % 12 > 0 ? ` ${diffMonths % 12}mo` : ""} ago`;
  }

  const fullDate = target.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return `${fullDate} (${formatTimeAgo()})`;
}

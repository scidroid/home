export function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const diffMs = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  let formattedDate = "";

  if (diffYears > 0) {
    formattedDate = `${diffYears}y ago`;
  } else if (diffMonths > 0) {
    formattedDate = `${diffMonths}mo ago`;
  } else if (diffDays > 0) {
    formattedDate = `${diffDays}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return `${fullDate} (${formattedDate})`;
}

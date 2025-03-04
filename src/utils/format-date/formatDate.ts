export function formatDate(date: number | Date) {
  const d = new Date(date);

  const pad = (n: number): string => n.toString().padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

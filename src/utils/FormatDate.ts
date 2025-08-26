export function formatUSDate(isoDate: string): string {
  if (!isoDate) return '';

  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export async function fetchAnalyticsSummary() {
  const response = await fetch('/api/analytics/summary');
  if (!response.ok) {
    throw new Error(`Ошибка загрузки аналитики: ${response.status}`);
  }
  return response.json();
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return '— / — / —'

  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return '— / — / —'

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(parsedDate)
}

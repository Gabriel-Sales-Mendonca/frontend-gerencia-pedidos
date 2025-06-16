export function formatDate(date: string | Date | null | undefined) {
  if (!date) return '— / — / —'

  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return '— / — / —'

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(parsedDate)
}

export function toUTCDateFromLocalDateInput(dateStr: string): Date {
  // Interpreta como se fosse meia-noite no fuso local
  const [year, month, day] = dateStr.split('-').map(Number)

  // Cria a data como se fosse 00:00 no fuso local
  const localDate = new Date(Date.UTC(year, month - 1, day, 3, 0, 0)) // UTC+3

  return localDate
}


export function convertToUTC(date: string) {
  const [ day, month, year ] = date.split('/')

  return `${year}-${month}-${day}`
}
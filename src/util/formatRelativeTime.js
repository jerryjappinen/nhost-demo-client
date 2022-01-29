import formatRelative from 'date-fns/formatRelative'

export default (date) => {
  return formatRelative(date, new Date())
}

import format from 'date-fns/format'

export default (date) => {
  return format(date, 'd MMMM yyyy')
}

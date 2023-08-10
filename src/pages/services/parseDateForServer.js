import { format, parse } from "date-fns";

export default function parseDateForServer(date) {
  const dateParse = parse(date, 'yyyy-MM-dd', new Date())
  const response = format(dateParse, 'dd/MM/yyyy')
  return response
}
import { format, parse } from "date-fns";

export default function parseDateForServer(date) {
  const dataParse = parse(date, 'yyyy-MM-dd', new Date())
  const response = format(dataParse, 'dd/MM/yyyy')
  return response
}
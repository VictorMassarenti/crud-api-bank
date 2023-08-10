import { format, parse } from "date-fns";

export default function parseDateForClient(date) {
    const dateParse = parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
    const response = format(dateParse, "dd/MM/yyyy 'às' HH:mm:ss")
    return response
}
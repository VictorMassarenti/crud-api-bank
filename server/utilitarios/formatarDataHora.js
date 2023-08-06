const { format } = require("date-fns")

const formatarDataHora = (data) => {
    return format(data, 'yyyy-MM-dd HH:mm:ss')
}

module.exports = {
    formatarDataHora
}
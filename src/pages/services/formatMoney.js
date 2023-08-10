export default function formatMoney(value) {
    const result = String((value / 100).toFixed(2)).replace('.', ',')
    return result
}
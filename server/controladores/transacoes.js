let bancodedados = require('../bancodedados')
const { buscarConta } = require('../utilitarios/buscarConta')
const { formatarDataHora } = require('../utilitarios/formatarDataHora')

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body
    const { contas, depositos } = bancodedados

    const conta = buscarConta(numero_conta)
    const index = contas.indexOf(conta)
    const saldoFinal = conta.saldo + Number(valor)
    bancodedados.contas[index].saldo = saldoFinal

    const data = formatarDataHora(new Date())

    depositos.push({
        data,
        numero_conta,
        valor: Number(valor)
    })

    return res.status(200).json({ mensagem: 'Depósito realizado com sucesso' })
}

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body
    const { contas, saques } = bancodedados

    const conta = buscarConta(numero_conta)
    const saldoFinal = conta.saldo - Number(valor)

    const index = contas.indexOf(conta)
    bancodedados.contas[index].saldo = saldoFinal

    const data = formatarDataHora(new Date())

    saques.push({
        data,
        numero_conta,
        valor: Number(valor)
    })

    return res.status(200).json({ mensagem: 'Saque realizado com sucesso' })
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body
    const { contas, transferencias } = bancodedados
    const contaOrigem =  buscarConta(numero_conta_origem)
    const contaDestino = buscarConta(numero_conta_destino)
    const indexOrigem = contas.indexOf(contaOrigem)
    const indexDestino = contas.indexOf(contaDestino)
    const saldoFinalOrigem = contaOrigem.saldo - Number(valor)
    const saldoFinalDestino = contaDestino.saldo + Number(valor)

    bancodedados.contas[indexOrigem].saldo = saldoFinalOrigem
    bancodedados.contas[indexDestino].saldo = saldoFinalDestino

    const data = formatarDataHora(new Date())
    
    transferencias.push({
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor: Number(valor)
    })

    return res.status(200).json({ mensagem: 'Transferência realizado com sucesso'})
}
module.exports = {
    depositar,
    sacar,
    transferir
}
const { buscarConta } = require('../utilitarios/buscarConta')

const validarDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body
    const conta = buscarConta(numero_conta)

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: 'Valor de depósito não pode ser menor ou igual a zero.' })
    }

    next()
}

const validarSaque = (req, res, next) => {
    const { numero_conta, senha, valor } = req.body
    const conta = buscarConta(numero_conta)
    
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: 'Valor de saque não pode ser menor ou igual a zero.' })
    }

    if (senha !== conta.usuario.senha) {
        return res.status(403).json({ mensagem: 'Senha incorreta.' })
    }

    if (Number(valor) > conta.saldo) {
        return res.status(400).json({ mensagem: `Saldo insuficiente.` })
    }

    next()
}

const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
    const contaOrigem = buscarConta(numero_conta_origem)
    const contaDestino = buscarConta(numero_conta_destino)

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem não encontrada' })
    }

    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino não encontrada' })
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida' })
    }

    if (Number(valor) > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente' })
    }

    next()
}

module.exports = {
    validarSaque,
    validarTransferencia,
    validarDeposito
}
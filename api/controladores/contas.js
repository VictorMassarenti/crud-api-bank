const { parse, format } = require('date-fns')
let bancodedados = require('../bancodedados')
const { buscarConta } = require('../utilitarios/buscarConta')
let numConta = 1

const listarContas = (req, res) => {
    const { contas } = bancodedados

    return res.status(200).json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const { contas } = bancodedados

    const dataParse = parse(data_nascimento, 'dd/MM/yyyy', new Date())
    const dataFormat = format(dataParse, 'yyyy-MM-dd')

    const novaConta = {
        numero: String(numConta++),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento: dataFormat,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta)

    res.status(201).json(novaConta)
}

const editarConta = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    let { contas } = bancodedados
    let dataFormat = null

    if (data_nascimento) {
        const dataParse = parse(data_nascimento, 'dd/MM/yyyy', new Date())
        dataFormat = format(dataParse, 'yyyy-MM-dd')
    }

    const contaEmEdicao = buscarConta(numeroConta)
    const index = contas.indexOf(contaEmEdicao)

    const novoUsuario = {
        numero: contaEmEdicao.numero,
        saldo: contaEmEdicao.saldo,
        usuario: {
            nome: nome ?? contaEmEdicao.usuario.nome,
            cpf: cpf ?? contaEmEdicao.usuario.cpf,
            data_nascimento: dataFormat ?? contaEmEdicao.usuario.data_nascimento,
            telefone: telefone ?? contaEmEdicao.usuario.telefone,
            email: email ?? contaEmEdicao.usuario.email,
            senha: senha ?? contaEmEdicao.usuario.senha
        }
    }
    contas.splice(index, 1, novoUsuario)

    res.status(201).json({ mensagem: 'Conta atualizada com sucesso.' })
}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params
    let { contas } = bancodedados

    const conta = buscarConta(numeroConta)
    const index = contas.indexOf(conta)
    contas.splice(index, 1)

    res.status(200).json({ mensagem: 'Conta excluída com sucesso.' })
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query
    const conta = buscarConta(numero_conta)

    return res.status(200).json({ saldo: conta.saldo })
}

const consultarExtrato = (req, res) => {
    const { numero_conta } = req.query
    const { depositos, saques, transferencias } = bancodedados

    const depositosConta = depositos.filter(el => el.numero_conta === numero_conta)
    const saquesConta = saques.filter(el => el.numero_conta === numero_conta)
    const enviadasConta = transferencias.filter(el => el.numero_conta_origem === numero_conta)
    const recebidasConta = transferencias.filter(el => el.numero_conta_destino === numero_conta)

    const extrato = {
        depositos: [...depositosConta],
        saques: [...saquesConta],
        transferenciasEnviadas: [...enviadasConta],
        transferenciasRecebidas: [...recebidasConta]
    }

    return res.status(200).json(extrato)
}

module.exports = {
    listarContas,
    criarConta,
    editarConta,
    deletarConta,
    consultarSaldo,
    consultarExtrato
}
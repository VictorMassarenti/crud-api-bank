const bancodedados = require('../bancodedados.cjs')
const { buscarConta } = require('../utilitarios/buscarConta.cjs')

const validarCriarConta = (req, res, next) => {
    const respostaErro400 = (texto) => {
        return res.status(400).json({ mensagem: `${texto}` })
    }

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { contas } = bancodedados

    if (!nome.trim()) {
        return respostaErro400('Nome é um campo obrigatório.')
    }

    if (!cpf.trim()) {
        return respostaErro400('CPF é um campo obrigatório.')
    }

    if (!data_nascimento) {
        return respostaErro400('Data de nascimento é um campo obrigatório.')
    }

    if (!telefone) {
        return respostaErro400('Telefone é um campo obrigatório.')
    }

    if (!email) {
        return respostaErro400('Email é um campo obrigatório')
    }

    if (!senha) {
        return respostaErro400('Senha é um campo obrigatório')
    }

    if (contas.some(el => el.usuario.cpf === cpf)) {
        return respostaErro400('Esse CPF já está cadastrado em nosso sistema')
    }

    if (contas.some(el => el.usuario.email === email)) {
        return respostaErro400('Esse email já está cadastrado em nosso sistema.')
    }

    next()
}

const validarEditarConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numeroConta } = req.params
    const { contas } = bancodedados
    const conta = buscarConta(numeroConta)

    const respostaErro400 = (texto) => {
        return res.status(400).json({ mensagem: `${texto}` })
    }

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return respostaErro400('É necessário informar pelo menos um campo de edição.')
    }

    if (cpf) {
        if (contas.some(el => el.usuario.cpf === cpf)) {
            return respostaErro400('Esse CPF já está cadastrado em nosso sistema')
        }
    }

    if (email) {
        if (contas.some(el => el.usuario.email === email)) {
            return respostaErro400('Esse email já está cadastrado em nosso sistema.')
        }
    }

    next()
}

const validarDeletarConta = (req, res, next) => {
    const { numeroConta } = req.params
    const conta = buscarConta(numeroConta)

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (conta.saldo) {
        return res.status(400).json({ mensagem: 'Erro, conta não possui saldo zero.' })
    }

    next()
}

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query
    const { senha } = bancodedados.banco

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Senha não informada.' })
    }

    if (senha_banco !== senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta.' })
    }

    next()
}

module.exports = {
    validarCriarConta,
    validarEditarConta,
    validarDeletarConta,
    validarSenha
}
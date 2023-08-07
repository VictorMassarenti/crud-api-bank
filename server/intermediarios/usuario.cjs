const { buscarConta } = require("../utilitarios/buscarConta.cjs")

const validar = (req, res, next) => {
    const { numero_conta, senha } = req.query
    const conta = buscarConta(numero_conta)

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Número da conta não informado'})
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha não informada'})
    }
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada'})
    }
    if (conta.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'Senha inválida'})
    }

    next()
}

module.exports = {
    validar
}
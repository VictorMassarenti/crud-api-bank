const express = require('express')
const rotas = express()
// Controladores
const { criarConta, editarConta, consultarSaldo, consultarExtrato, listarContas, deletarConta } = require('./controladores/contas.cjs')
const { depositar, sacar, transferir } = require('./controladores/transacoes.cjs')
// Intermediários
const intermediarioBanco = require('./intermediarios/banco.cjs')
const intermediarioTransacoes = require('./intermediarios/transacoes.cjs')
const intermediarioUsuario = require('./intermediarios/usuario.cjs')

rotas.get('/contas', intermediarioBanco.validarSenha, listarContas)
rotas.post('/contas', intermediarioBanco.validarCriarConta, criarConta)
rotas.put('/contas/:numeroConta/usuario',intermediarioBanco.validarEditarConta, editarConta)
rotas.delete('/contas/:numeroConta', intermediarioBanco.validarDeletarConta, deletarConta)
rotas.post('/transacoes/depositar', intermediarioTransacoes.validarDeposito, depositar)
rotas.post('/transacoes/sacar', intermediarioTransacoes.validarSaque, sacar)
rotas.post('/transacoes/transferir', intermediarioTransacoes.validarTransferencia, transferir)
rotas.get('/contas/saldo', intermediarioUsuario.validar, consultarSaldo)
rotas.get('/contas/extrato', intermediarioUsuario.validar, consultarExtrato)

module.exports = rotas

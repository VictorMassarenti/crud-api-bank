const bancodedados = require('../bancodedados.cjs')

const buscarConta = (numero) => {
    const { contas } = bancodedados
    return contas.find(el => el.numero === numero)
}

module.exports = {
    buscarConta
}
const bancodedados = require('../bancodedados')

const buscarConta = (numero) => {
    const { contas } = bancodedados
    return contas.find(el => el.numero === numero)
}

module.exports = {
    buscarConta
}
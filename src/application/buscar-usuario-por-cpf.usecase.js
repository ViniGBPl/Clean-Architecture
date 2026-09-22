const { Either } = require("../shared/errors");

module.exports = function buscarUsuarioPorCPFUseCase({ usuariosRepository}){
    return async function ({CPF}) {
     const usuario = await usuariosRepository.buscarPorCPF(CPF);
     // Como estamos usando o Either, usamos ele para fazer o retorno ao inves de só usuario
     return Either.Right(usuario);
    };
}
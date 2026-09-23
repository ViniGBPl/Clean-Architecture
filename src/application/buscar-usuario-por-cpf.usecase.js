const { Either, AppError } = require("../shared/errors");

module.exports = function buscarUsuarioPorCPFUseCase({ usuariosRepository}){
    if(!usuariosRepository) throw new AppError(AppError.dependencias);
    return async function ({CPF}) {
    if(!CPF) throw new AppError(AppError.parametrosObrigatoriosAusentes);
     const usuario = await usuariosRepository.buscarPorCPF(CPF);
     // Como estamos usando o Either, usamos ele para fazer o retorno ao inves de só usuario
     return Either.Right(usuario);
    };
}
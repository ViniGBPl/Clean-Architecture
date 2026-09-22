const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');



module.exports = function cadastrarUsuarioUseCase({ usuariosRepository }) {
    if(!usuariosRepository)throw new AppError(AppError.dependencias);
    return async function({nome_completo,CPF,telefone,endereco,email}){
        const checaCampos = nome_completo && CPF && telefone && endereco && email
        if(!checaCampos)throw new AppError(AppError.parametrosObrigatoriosAusentes)
        const checaSeJaExisteUmUsuarioCadastradoComOCPF = await usuariosRepository.existePorCPF(CPF);
        if(checaSeJaExisteUmUsuarioCadastradoComOCPF) return Either.Left(Either.CPFjaCadastrado('CPF'));
        // Cria uma variavel que serve para validar se valor exite
        // Foi usando o wait, porque a ideia é justamente esperar o banco retornar isso, que seria uma operação lenta.
        const checaSeJaExisteUmUsuarioCadastradoComOEmail = await usuariosRepository.existePorEmail(email);
        // Estou usando o Either para retornar as mensagens de erro sem precisar levantar um exceção.
        if(checaSeJaExisteUmUsuarioCadastradoComOEmail) return Either.Left(Either.EmailJaCadastrado('Email'))

       await usuariosRepository.cadastrar({
            nome_completo,
            CPF,
            telefone,
            endereco,
            email
        });
        return Either.Right(null);

    };
}
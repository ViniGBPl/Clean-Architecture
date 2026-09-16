

module.exports = function cadastrarUsuarioUseCase() {
    return async function({nome_completo,CPF,telefone,endereco,email}){
       await usuariosRepository.cadastrarUsuario({
            nome_completo,
            CPF,
            telefone,
            endereco,
            email
        });
    };
}
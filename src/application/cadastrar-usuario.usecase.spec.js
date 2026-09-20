const cadastrarUsuarioUseCase = require('./cadastrar-usuario.usecase')


describe('Cadastrar Usuario UseCase', function () {

    const usuariosRepository = {
        cadastrar: jest.fn()
    }

    test('Deve poder cadastrar um usuário',async function () {
        const usuarioDTO ={
            nome_completo: 'nome_valido',
            CPF: 'CPF_valido',
            telefone: 'telefone_valido',
            endereco: 'endereco_valido',
            email: 'email_valido'
        }


        const sut = cadastrarUsuarioUseCase({ usuariosRepository : usuariosRepository });
        const output = await sut(usuarioDTO);

        expect(output).toBeUndefined();
        expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
        expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });


});
const cadastrarUsuarioUseCase = require('./cadastrar-usuario.usecase')
const AppError = require('../shared/errors/AppError');
const { CPFjaCadastrado } = require('../shared/errors/Either');
const Either = require('../shared/errors/Either');

describe('Cadastrar Usuario UseCase', function () {

    const usuariosRepository = {
        cadastrar: jest.fn(),
        existePorCPF : jest.fn()
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

        expect(output.right).toBeNull();
        expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
        expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });


   test('Deve retornar um throw se o usuarioRepository não for fornecido', function () {
        expect(() => cadastrarUsuarioUseCase({}))
            .toThrow( new AppError(AppError.dependencias));
   });

   test('Deve retornar um throw AppError se os campos obrigatórios não forem informados ', async function(){

        const sut = cadastrarUsuarioUseCase({usuariosRepository});

        await expect(()=>sut({})).rejects.toThrow
        (new AppError(AppError.parametrosObrigatoriosAusentes))

   });

   test('Deve retornar um throw AppError se o CPF já estiver cadastrado',async function(){
        usuariosRepository.existePorCPF.mockResolvedValue(true);
        const usuarioDTO = {
            nome_completo: 'nome_valido',
            CPF: 'CPF_ja_cadastrado',
            telefone: 'telefone_valido',
            endereco: 'endereco_valido',
            email: 'email_valido'
        };

        const sut = cadastrarUsuarioUseCase({usuariosRepository});
        const output = await sut (usuarioDTO);

         expect(output.right).toBeNull
         expect(output.left).toEqual(Either.CPFjaCadastrado('CPF'));
         expect(usuariosRepository.existePorCPF).toHaveBeenCalledWith(usuarioDTO.CPF);
         expect(usuariosRepository.existePorCPF).toHaveBeenCalledTimes(1);
   });

   

});
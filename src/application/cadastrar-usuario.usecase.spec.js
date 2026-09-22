const cadastrarUsuarioUseCase = require('./cadastrar-usuario.usecase')
const AppError = require('../shared/errors/AppError');
const { CPFjaCadastrado } = require('../shared/errors/Either');
const Either = require('../shared/errors/Either');

describe('Cadastrar Usuario UseCase', function () {
    // Serve pra mockar os metodos de um reposiório
    // Só retorna se é true ou false, logo não usa dados.
    const usuariosRepository = {
        cadastrar: jest.fn(),
        existePorCPF : jest.fn(),
        existePorEmail: jest.fn()
    }

    
// um dos testes usa estrutura AAA- queria preparação dos dados, ação e validação do esperado.
    test('Deve poder cadastrar um usuário',async function () {
       // estrutura e preparação dos dados
        const usuarioDTO ={
            nome_completo: 'nome_valido',
            CPF: 'CPF_valido',
            telefone: 'telefone_valido',
            endereco: 'endereco_valido',
            email: 'email_valido'
        }

        // ação que é feita
        // sut é metodo que vai ser testado
        const sut = cadastrarUsuarioUseCase({ usuariosRepository : usuariosRepository });
        // output retorna  a execução do teste
        const output = await sut(usuarioDTO);
        // seria o assert , onde fazemos a validação 
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

   test('Deve retornar um Either.Left se o CPF já estiver cadastrado',async function(){
        // Serve para mockar o valor do cpf como true, assim faz parecer que já exite um cpf cadastrado.
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

         expect(output.right).toBeNull;
         expect(output.left).toEqual(Either.CPFjaCadastrado('CPF'));
         expect(usuariosRepository.existePorCPF).toHaveBeenCalledWith(usuarioDTO.CPF);
         expect(usuariosRepository.existePorCPF).toHaveBeenCalledTimes(1);
   });

   test('Deve retornar um Either.Left se o Email já estiver cadastrado', async function(){
        // Foi realizado o mock do cpf para fazer com que o teste avançasse para o do email.
        // Nesse caso, foi seguido a lógica do coódigo.
        usuariosRepository.existePorCPF.mockResolvedValue(false);
        usuariosRepository.existePorEmail.mockResolvedValue(true);

        const usuarioDTO = {
                nome_completo: 'nome_valido',
                CPF: 'CPF_valido',
                telefone: 'telefone_valido',
                endereco: 'endereco_valido',
                email: 'email_ja_cadastrado'
            };

        const sut = cadastrarUsuarioUseCase({usuariosRepository});
        const output = await sut(usuarioDTO);

        expect(output.right).toBeNull
        expect(output.left).toEqual(Either.EmailJaCadastrado('Email'));
        expect(usuariosRepository.existePorEmail).toHaveBeenCalledWith(usuarioDTO.email);
        expect(usuariosRepository.existePorEmail).toHaveBeenCalledTimes(1);



   });



});
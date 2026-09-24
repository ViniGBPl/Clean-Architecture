const { Either } = require("../shared/errors");

module.exports = function buscarLivrosPorNomeOuISBNUseCase({livrosRepository}){
    return  async function({valor}){
        const livros = await livrosRepository.buscarPorNomeOuISBN(valor);
        return Either.Right(livros);
    }
}
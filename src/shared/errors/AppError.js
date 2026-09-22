module.exports = class AppError extends Error {
   constructor(message){
    super(message);
    this.message = message;
   }
   static dependencias = 'Algumas dependências não foram fornecidas';
   static parametrosObrigatoriosAusentes = 'Algum parâmetro obrigatório não foi fornecido';
   static CPFjaCadastrado = 'CPF já está cadastrado' ;
}
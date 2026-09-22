module.exports = class AppError extends Error {
   constructor(message){
    super(message);
    this.message = message;
   }
   static dependencias = 'Algumas dependências não foram fornecidas';
}
/**
 * @description:ATENÇÃO, esta classe não deve ser instânciada diretamente, use um dos métodos Left ou Right. 
 */


module.exports = class Either{
    constructor(left, right){
        this.left = left;
        this.right = right;
    };

    static Left(left){
        return new Either(left,null)
    };
    static Right(right){
        return new Either(null,right)
    };

    static CPFjaCadastrado(valor){
        return {message: `${valor} já cadastrado.`}
    };

    static EmailJaCadastrado(valor){
        return{message:`${valor} já cadastrado.`}
    };

    static ISBNJaCadastrado(valor){
        return{message:`${valor} já cadastrado.`}
    }
    
}
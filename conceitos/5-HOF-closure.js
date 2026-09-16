function somar({x,y}) {
    return x+y
}


function subtrair({x,y}) {
    return x-y
}

function aplicarOperacao({numero1, numero2, operacao}) {
    return operacao({x:numero1, y:numero2})
}

console.log(aplicarOperacao({numero1: 10, numero2: 5, operacao: somar}))
console.log(aplicarOperacao({numero1: 10, numero2: 5, operacao: subtrair}))



// criterio 2 

function  criarMultiplicador(fator) {
    return function(numero) {
        return numero * fator;
    };
}

const multiplicador2 = criarMultiplicador(2);
const multiplicador5 = criarMultiplicador(5);

console.log(multiplicador2(10)); // Saída: 20
console.log(multiplicador5(10)); // Saída: 50
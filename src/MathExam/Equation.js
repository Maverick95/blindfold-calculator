const operators = {
    '+': (x, y) => x + y,
    'x': (x, y) => x * y
};

const generateEquation = function(length, generator) {

    const result_start = generator.generateNumber(); 

    const equation = {description: result_start.toString(), result: result_start};

    for (let i = 1; i < length; i++) {

        const symbol_new = generator.generateSymbol();
        const value_new = generator.generateNumber();

        equation.description += ` ${symbol_new} ${value_new.toString()}`;
        equation.result = operators[symbol_new](equation.result, value_new);

    }

    return equation;

};

export default generateEquation;
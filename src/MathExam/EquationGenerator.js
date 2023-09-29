const maxValue = 10;

const generateElementsDefault = {

    maxValue: maxValue,
    generateSymbol: () => Math.random() < 0.5 ? '+' : 'x',
    generateNumber: () => 1 + Math.floor(Math.random() * maxValue)

};

export default generateElementsDefault;

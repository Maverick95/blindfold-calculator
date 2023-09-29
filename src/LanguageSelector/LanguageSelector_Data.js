const languages = ['Actionscript', 'C', 'C++', 'C#', 'Java', 'Javascript', 'SQL', 'Tru Basic', 'Typescript'];
languages.sort();

export const TestTableSelector = 'table-selector';

export const TestButtonText = 'Choose a random language';

export const TestLanguageLabel = (language) => 'checkbox_' +
language.split('')
.map(m => m === ' ' ? '_' : m)
.map(m => m === '#' ? 'sharp' : m)
.map(m => m === '+' ? 'plus' : m)
.join('');

export const TestLanguages = languages;

export const TestDelay = { current: 50, max: 1500, factor: 1.1 };

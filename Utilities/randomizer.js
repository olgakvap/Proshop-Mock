const alpha = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const lowerChars = [...'abcdefghijklmnopqrstuvwxyz'];
const upperChars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const numbers = [...'0123456789'];
const specialChars = '!@#$%^&*';


export const getRandomStringOfLength = (
    length,
    hasNumbers = true,
    hasSymbols = true,
    chars = specialChars
) => {
    let base = [...alpha];
    if (hasNumbers) {
        base = [...base, ...numbers];
    }
    if (hasSymbols) {
        base = [...base, ...chars];
    }
    return [...Array(length)]
        .map(i => base[(Math.random() * base.length) | 0])
        .join('');
};

export const getRandomUsername = (
    length = 10,
    hasNumbers = true,
    hasSymbols = true
) => {
    return getRandomStringOfLength(length, hasNumbers, hasSymbols, '_.-');
};
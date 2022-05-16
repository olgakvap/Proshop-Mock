import {MIN_USERNAME, MAX_USERNAME} from '../data/auth.data.js';

const alpha = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const lowerChars = [...'abcdefghijklmnopqrstuvwxyz'];
const upperChars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const numbers = [...'0123456789'];
const specialChars = '!@#$%^&*';
const randomLength = Math.trunc(Math.random() * (MAX_USERNAME - MIN_USERNAME + 1) + MIN_USERNAME);

export const getRandomString = (
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
    length = randomLength,
    hasNumbers = true,
    hasSymbols = true
) => {
    return getRandomString(length, hasNumbers, hasSymbols, '_.-');
};
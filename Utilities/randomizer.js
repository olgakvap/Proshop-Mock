import {MIN_USERNAME, MAX_USERNAME, MAX_PASSWORD, MIN_PASSWORD} from '../data/auth.data.js';

const alpha = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const lowerChars = [...'abcdefghijklmnopqrstuvwxyz'];
const upperChars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const numbers = [...'0123456789'];
const specialChars = '!@#$%^&*';


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
    length = getRandomLength(MAX_USERNAME,MIN_USERNAME),
    hasNumbers = true,
    hasSymbols = true
) => {
    return getRandomString(length, hasNumbers, hasSymbols, '_.-');
};

export const getRandomLength= (
    max,
    min
) => {
    return Math.trunc(Math.random() * (max - min + 1) + min);
};

export const getRandomPassword = (
    length = getRandomLength(MAX_PASSWORD, MIN_PASSWORD),
    hasNumbers = true,
    hasSymbols = true
) => {
    let str = '';
    let str1 = generateString(Math.trunc(length / 4), upperChars);
    str = str + str1;
    console.log("str1 = " + str1);
    let str2 = generateString(Math.trunc(length / 4), numbers);
    console.log("str2 = " + str2);
    if (hasNumbers) {
        str = str + str2;
    }
    let str3 = generateString(Math.trunc(length / 4), specialChars);
    console.log("str3 = " + str3);
    if (hasSymbols) {
        str = str + str3;
    }
    let str4 = generateString(Math.trunc(length / 4), lowerChars);
    console.log("str4 = " + str4);
    str = str + str4;

    return str;
};

export const generateString = (length, base) => {
    return [...Array(length)]
        .map(i => base[(Math.random() * base.length) | 0])
        .join('');
};
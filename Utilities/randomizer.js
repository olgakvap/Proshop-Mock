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

) => {
    let str = '';

    let str1 = generateString(Math.trunc(length / 4), upperChars);
    let str2 = generateString(Math.trunc(length / 4), numbers);
    let str3 = generateString(Math.trunc(length / 4), specialChars);
    let str4 = generateString(length - 3 * Math.trunc(length / 4), lowerChars);
    //console.log("str4 = ", str4)
    for(let i = 0; i < str1.length; i++){
        str += str1[i] + str2[i] + str3[i] + str4[i];
    }
    if (str4.length > str1.length){
        for(let i = str1.length; i < str4.length; i++){
            str += str4[i];
        }
    }
    return str;
};

export const generateString = (length, base) => {
    return [...Array(length)]
        .map(i => base[(Math.random() * base.length) | 0])
        .join('');
};
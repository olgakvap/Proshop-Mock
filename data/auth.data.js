export const invalidUsernames = [
    '<br/>',// with enter(line brake)
    ' username',// with space before
    'username ',// with space at the end
    'user name',// with space in the middle
    'username$',// with unsupported special char
    'ab', //with min-1
    'zftghujkmnbgrewsxlmnb',// with max +1
];

export const validUsername = [
    'abc',// with min 3 username length
    'abcd',// with min 4 username length
    'zftghujkmnbgrewsxlmn',// with max 20 username length
    'zftghujkmnbgrewsxlm',// with max 19 username length
    'zftghujkmn',// with max 10(middle) username length
    'username_',// with underscore
    'username.',// with dot
    'username12',// with digits
    'Username', //with 1 uppercase letter
    'Username1_._5.a-b',// with combinations chars
    'USERNAME',// with all capital letters
];

export const invalidEmails = [
    'username.email.com',// without @
    '@usernameemail.com',// with @ at front
    'username.email.com@',// with @ at the end
    '.username@email.com',// with dot at the front
    'username@.email.com',// with dot after @
    'username@email.abc',// with unexpected domain
];

export const validEmails = [
    'username@email.com',// with valid email(lower case and no space)
    'username12@email.com',// with digits
    '5895478512@email.com',// with only digits
    'username@145.287.412.748',// the domain is a valid IP address
    'Username@email.com',// with upper case
    'user.name@email.com',// with dot
    'username@subdomain.email.com',// with dot in subdomain
    'user+name+lastname@email.com',// plus sign is considered a valid chars
    'username@email-one.com',// with dash in domain name is valid
    'username@email.name',// .name is a valid Top level Domain name
    'user-name@email.com',// with dash in the address field is valid
    'username@email.co.jp',// Dot in Top level Domain name also considered valid(use co.jp as an example here)
];

export const invalidPasswords = [
    ' Password12!',// with space at the front
    'Password12! ',// with space at the end
    'Password 12!',// with space in the middle
    'Password12!@',// with not allow chars @ at the end
    '$Password12!',// with not allow chars $ at the front
    'Pas2!',// with min -1
    'Password2!Password12!',// with max +1
    'password2!',// with all lowercase
    'PASSWORD2!',// with all capital letters
    'Password!',// with no digits
    'Password2',// with no special chars
];

export const validPassword= [
    'Passd2!',// with min+1(7)
    'Password2!Password2',// with max -1 (19)
    'Password2!',// with middle length(10)
];

export const validFirstName =[
    'F', //with min 1 length
    'ab',// with min +1 length (2)
    'FirstnameandLastname', //with max 20 length
    'FirstnameandLastnam', //with max-1 (19) length
    'Firstnamea',// with middle (10)
    'FIRTSNAME',// with all capital letter
    'Firstname123',// with digit
    'Firstname$',// with special chars
];

export const validLastName =[
    'F', //with min 1 length
    'ab',// with min +1 length (2)
    'FirstnameandLastname', //with max 20 length
    'FirstnameandLastnam', //with max-1 (19) length
    'Firstnamea',// with middle (10)
    'FIRTSNAME',// with all capital letter
    'Firstname123',// with digit
    'Firstname$',// with special chars
];

export const validUser = {
    "username": "Olya80",
    "email": "Olya80@gmail.com",
    "password": "Pa33word!",
    "password2": "Pa33word!",
    "firstname": "Olya",
    "lastname": "McKim",
    "phone": "888-413-0060"
};

export const adminData = {
    "adminEmail": "KaterinaV13@gmail.com",
    "adminPassword": "Pa33word!"
};



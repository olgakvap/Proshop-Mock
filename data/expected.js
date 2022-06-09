import {validUser} from "../data/auth.data.js";

export const expected = {
    auth: {
        msgSuccessfulSignIn: 'Login successful!',
        msgSuccessfulSignUp: 'Register successful!',
        msgFailedSignIn:'Oops! Your email or password was incorrect. Please try again.',
        msgFailedSignUp:'Please fill in mandatory fields.',
        msgFailedDuplicatedUsername:`An account with the username ${validUser.username} already exists.`

    }
}
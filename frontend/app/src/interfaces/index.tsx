export interface SignUpParams {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

export interface SignInParams {
    email: string,
    password: string,
}
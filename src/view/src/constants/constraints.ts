export const user = {
    login: {
        minLength: 3,
        maxLength: 20
    },
    password: {
        minLength: 3,
        maxLength: 20
    }
}

export const proposal = {
    title: {
        minLength: 3,
        maxLength: 20
    },
    description: {
        minLength: 0,
        maxLength: 255
    },
}
export const validate = {
    email(email) {
        const regExMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExMail.test(email)
    },
    password(password) {
        const regExPass = /(?=.{6,})/
        return regExPass.test(password)
    }
}





const regExMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateValue (type = "", value = "") {
    switch (type) {
        case "email":
            return regExMail.test(value);
            break
        case "password":
            return value.length >= 6;
        default:
            break
    }
}
import {useEffect, useState} from "react";
import {ModalContainer} from "../../ui/Modals/components/ModalContainer/ModalContainer";
import {ModalInput} from "../../ui/Modals/components/ModalInput/ModalInput";
import {ModalButton} from "../../ui/Modals/components/ModalButton/ModalBtn";
import {useInput} from "../../services/useInput";
import {useLocalStorage} from "../../services/useLocalStorage";
import {validateEmail, validatePassword} from "../../services/validationForm";
import {errorMessages} from "../../services/errorMessages";

import styles from "./AuthModal.module.scss"

export const SingUpModal = ({isVisible, toggleIsVisible, replaceAuthModal}) => {
    const [email, onChangeMail] = useInput("")
    const [password, onChangePassword] = useInput("")
    const [passwordConfirm, onChangePasswordConfirm] = useInput("")
    const [isEmailError, setIsEmailError] =  useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [emailMessageError, setEmailMessageError] = useState(null)
    const [passwordMessageError, setPasswordMessageError] = useState(null)
    const [usersData, addUsersData] = useLocalStorage([], "usersData")

    useEffect(() => {
        if ((!isEmailError && !isPasswordError) && email ) {
            const newUser = {"email": email, "password": password}
            addUsersData([...usersData, newUser])
        }
    }, [isPasswordError, isEmailError])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validateEmail(email)) {
            setIsEmailError(false)
            setEmailMessageError(null)
        } else {
            setIsEmailError(true)
            setEmailMessageError(errorMessages.emailIncorrect)
        }
        if (usersData.some(user => user.email === email && validateEmail(email))) {
            setIsEmailError(true)
            setEmailMessageError(errorMessages.emailAlreadyRegistered)
        }
        if (!validatePassword(password)) {
            setIsPasswordError(true)
            setPasswordMessageError(errorMessages.passwordIncorrect)
        } else if (validatePassword(password) && password !== passwordConfirm) {
            setIsPasswordError(true)
            setPasswordMessageError(errorMessages.passwordMismatch)
        } else if (validatePassword(password) && password === passwordConfirm){
            setIsPasswordError(false)
            setPasswordMessageError(null)
        }
    }

    return (
        <ModalContainer isVisible={isVisible} toggleIsVisible={toggleIsVisible} title={"Sing Up"} onSubmit={handleSubmit}>
            <div className={styles.modalInputs}>
                <ModalInput label={"Email"} value={email} onChange={onChangeMail} placeholder={"Enter email"} isError={isEmailError}
                            messageError={emailMessageError} type={"email"}/>
                <ModalInput label={"Password"} value={password} onChange={onChangePassword} placeholder={"Enter password"}
                            isError={isPasswordError} messageError={passwordMessageError} type={"password"}/>
                <ModalInput label={"Password confirm"} value={passwordConfirm} onChange={onChangePasswordConfirm} placeholder={"Password confirm"}
                            isError={isPasswordError} messageError={passwordMessageError} type={"password"}/>
            </div>

            <ModalButton disabled text={"Log in"} type={"submit"}/>

            <div className={styles.question}>
                Already have an account? <span onClick={replaceAuthModal}>Log in</span>
            </div>
        </ModalContainer>
    )
}
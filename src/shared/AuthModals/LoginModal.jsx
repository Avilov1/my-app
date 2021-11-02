import {useEffect, useState} from "react";
import {ModalContainer} from "../../ui/Modals/components/ModalContainer/ModalContainer";
import {ModalInput} from "../../ui/Modals/components/ModalInput/ModalInput";
import {ModalButton} from "../../ui/Modals/components/ModalButton/ModalBtn";
import {useInput} from "../../services/useInput";
import {useLocalStorage} from "../../services/useLocalStorage";
import {validateEmail, validatePassword} from "../../services/validationForm";
import {errorMessages} from "../../services/errorMessages";

import styles from "./AuthModal.module.scss"

export const LoginModal = ({isVisible, toggleIsVisible, replaceAuthModal}) => {
    const [email, onChangeMail] = useInput("")
    const [password, onChangePassword] = useInput("")
    const [isEmailError, setIsEmailError] =  useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [emailMessageError, setEmailMessageError] = useState(null)
    const [passwordMessageError, setPasswordMessageError] = useState(null)
    const [usersData, _ ] = useLocalStorage([], "usersData")

    useEffect(() => {
        if ((!isEmailError && !isPasswordError && (email && password))) {
            usersData.some(user => {
                if (user.email === email && user.password === password) {
                    alert("Welcome!")
                } else {
                    setIsPasswordError(true)
                    setIsEmailError(true)
                    setPasswordMessageError(errorMessages.emailOrPasswordError)
                    setEmailMessageError(errorMessages.emailOrPasswordError)
                }
            })
        }
    }, [isPasswordError, isEmailError])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (validateEmail(email) && validatePassword(password)) {
            setIsEmailError(false)
            setEmailMessageError(null)
            setIsPasswordError(false)
            setPasswordMessageError(null)
        } else  {
            setIsEmailError(true)
            setIsPasswordError(true)
            setEmailMessageError(errorMessages.emailOrPasswordError)
            setPasswordMessageError(errorMessages.emailOrPasswordError)
        }
    }

    return (
        <ModalContainer isVisible={isVisible} toggleIsVisible={toggleIsVisible} title={"Sing Up"} onSubmit={handleSubmit}>
            <div className={styles.modalInputs}>
                <ModalInput label={"Email"} value={email} onChange={onChangeMail} placeholder={"Enter email"} isError={isEmailError}
                            messageError={emailMessageError} type={"email"}/>
                <ModalInput label={"Password"} value={password} onChange={onChangePassword} placeholder={"Enter password"}
                            isError={isPasswordError} messageError={passwordMessageError} type={"password"}/>
            </div>

            <ModalButton disabled text={"Log in"} type={"submit"}/>

            <div className={styles.question}>
                Already have an account? <span onClick={replaceAuthModal}>Log in</span>
            </div>
        </ModalContainer>
    )
}
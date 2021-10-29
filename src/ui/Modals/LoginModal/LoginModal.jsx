import {ModalContainer} from "../components/ModalContainer/ModalContainer";
import {ModalInput} from "../components/ModalInput/ModalInput";
import {ModalButton} from "../components/ModalButton/ModalBtn";
import {useInput} from "../../../services/useInput";

import styles from "./LoginModal.module.scss"
import {validateValue} from "../../../services/validationForm";

export const LoginModal = (props) => {
    const {isVisible, setIsVisible} = props

    const [email, changeMail] = useInput()
    const [password, changePassword] = useInput()
    const [passwordConfirm, changePasswordConfirm] = useInput()

    const onSubmit = () => {
        if (!validateValue("email", email)) return
        if (!validateValue("password", password)) return
        if (password !== passwordConfirm) return

        console.log("Confirm")
    }

    return (
        <ModalContainer isVisible={isVisible} setIsVisible={setIsVisible} title={"Sing Up"}>
            <div className={styles.modalInputs}>
                <ModalInput label={"Email"} placeholder={"Enter email"}
                            type={"email"} value={email} setValue={changeMail}/>
                <ModalInput label={"Password"} placeholder={"Enter password"}
                            type={"password"} value={password} setValue={changePassword}/>
                <ModalInput label={"Password confirm"} placeholder={"Enter password confirm"}
                            type={"password"} value={passwordConfirm} setValue={changePasswordConfirm}/>
            </div>

            <ModalButton text={"Log in"} onClick={onSubmit}/>

            <div className={styles.question}>
                Already have an account? <span>Log in</span>
            </div>
        </ModalContainer>
    )
}
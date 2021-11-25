import {useState} from "react";
import {useAuthContext} from "../context/authContext";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import {useLocalStorage, useInput, validate, errorMessages} from "../services";
import {singIn} from "../services/http/userApi";
import styles from "../UI/styles/AuthModal.module.scss"

export const LoginModal = ({isVisible, toggleIsVisible, replaceAuthModal}) => {
	const [email, onChangeMail] = useInput("")
	const [password, onChangePassword] = useInput("")
	const [isEmailError, setIsEmailError] = useState(false)
	const [isPasswordError, setIsPasswordError] = useState(false)
	const [emailMessageError, setEmailMessageError] = useState(null)
	const [passwordMessageError, setPasswordMessageError] = useState(null)
	const {setIsAuth} = useAuthContext()

	const formError = () => {
		setIsPasswordError(true)
		setIsEmailError(true)
		setPasswordMessageError(errorMessages.emailOrPasswordError)
		setEmailMessageError(errorMessages.emailOrPasswordError)
	}

	const login = async () => {
		try {
			await singIn(email, password)
			setIsAuth(true)
		} catch (e) {
			formError()
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (validate.email(email) && validate.password(password)) {
			login()
			/*
			usersData.some(user => {
					if (user.email === email && user.password === password) {
							//setIsAuth(true)

					} else {
							formError()
					}
			})

			 */

		} else {
			formError()
		}
	}

	return (
		<ModalContainer isVisible={isVisible} toggleIsVisible={toggleIsVisible} title={"Sing In"} onSubmit={handleSubmit}>
			<div className={styles.modalInputs}>
				<ModalInput label={"Email"} value={email} onChange={onChangeMail} placeholder={"Enter email"}
				            isError={isEmailError}
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
import {useEffect, useState} from "react";
import {ModalContainer, ModalInput, ModalButton} from "../UI";
import {useInput, useLocalStorage, validate, errorMessages} from "../services";
import styles from "./styles/AuthModal.module.scss"
import {useAuthContext} from "../context";

export const SingUpModal = ({isVisible, toggleIsVisible, replaceAuthModal}) => {
	const [email, onChangeMail] = useInput("")
	const [password, onChangePassword] = useInput("")
	const [passwordConfirm, onChangePasswordConfirm] = useInput("")
	const [isEmailError, setIsEmailError] = useState(null)
	const [isPasswordError, setIsPasswordError] = useState(null)
	const [emailMessageError, setEmailMessageError] = useState(null)
	const [passwordMessageError, setPasswordMessageError] = useState(null)
	const [isRegistered, setIsRegistered] = useState(false)
	const [users, setUsers] = useLocalStorage([], "usersData")
	const {setIsAuth} = useAuthContext()

	useEffect(() => {
		if ((!isEmailError && !isPasswordError) && email) {
			const newUser = {"email": email, "password": password}
			setUsers([...users, newUser])
			setIsRegistered(true)
		}
		isRegistered && setIsAuth(true)
	}, [isPasswordError, isEmailError, isRegistered])

	const handleSubmit = (event) => {
		event.preventDefault()
		if (validate.email(email)) {
			setIsEmailError(false)
			setEmailMessageError(null)
		} else {
			setEmailMessageError(errorMessages.emailIncorrect)
			setIsEmailError(true)
		}
		if (users.some(user => user.email === email && validate.email(email))) {
			console.log("validate mail")
			setIsEmailError(true)
			setEmailMessageError(errorMessages.emailAlreadyRegistered)
		}
		if (!validate.password(password)) {
			setIsPasswordError(true)
			setPasswordMessageError(errorMessages.passwordIncorrect)
		} else if (validate.password(password) && password !== passwordConfirm) {
			setIsPasswordError(true)
			setPasswordMessageError(errorMessages.passwordMismatch)
		} else if (validate.password(password) && password === passwordConfirm) {
			setIsPasswordError(false)
			setPasswordMessageError(null)
		}

		/*
		if (validate.email(email)) {
				setIsEmailError(false)
				setEmailMessageError(null)

		} else {
				setEmailMessageError(errorMessages.emailIncorrect)
				setIsEmailError(true)
		}
		if (users.some(user => user.email === email && validate.email(email))) {
				console.log("validate mail")
				setIsEmailError(true)
				setEmailMessageError(errorMessages.emailAlreadyRegistered)
		}
		if (!validate.password(password)) {
				setIsPasswordError(true)
				setPasswordMessageError(errorMessages.passwordIncorrect)
		} else if (validate.password(password) && password !== passwordConfirm) {
				setIsPasswordError(true)
				setPasswordMessageError(errorMessages.passwordMismatch)
		} else if (validate.password(password) && password === passwordConfirm){
				setIsPasswordError(false)
				setPasswordMessageError(null)
		} */
	}

	return (
		<ModalContainer isVisible={isVisible} toggleIsVisible={toggleIsVisible} title={"Sing Up"} onSubmit={handleSubmit}>
			<div className={styles.modalInputs}>
				<ModalInput label={"Email"} value={email} onChange={onChangeMail} placeholder={"Enter email"}
				            isError={isEmailError}
				            messageError={emailMessageError} type={"email"}/>
				<ModalInput label={"Password"} value={password} onChange={onChangePassword} placeholder={"Enter password"}
				            isError={isPasswordError} messageError={passwordMessageError} type={"password"}/>
				<ModalInput label={"Password confirm"} value={passwordConfirm} onChange={onChangePasswordConfirm}
				            placeholder={"Password confirm"}
				            isError={isPasswordError} messageError={passwordMessageError} type={"password"}/>
			</div>

			<ModalButton disabled text={"Log in"} type={"submit"}/>

			<div className={styles.question}>
				Already have an account? <span onClick={replaceAuthModal}>Log in</span>
			</div>
		</ModalContainer>
	)
}
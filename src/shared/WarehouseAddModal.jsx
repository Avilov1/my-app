import {useEffect, useState} from "react";
import axios from "axios";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import {useInput, errorMessages, useLocalStorage} from "../services";
import styles from "./styles/AuthModal.module.scss"
import {useWarehousesContext} from "../context/warehousesContext";

export const WarehouseAddModal = ({isVisible, toggleIsVisible}) => {
	const [title, onChangeTitle] = useInput("")
	const [length, onChangeLength] = useInput("")
	const [width, onChangeWidth] = useInput("")
	const [height, onChangeHeight] = useInput("")
	const [isTitleError, setIsTitleError] = useState(null)
	const [isLengthError, setIsLengthError] = useState(null)
	const [isWidthError, setIsWidthError] = useState(null)
	const [isHeightError, setIsHeightError] = useState(null)
	const [messageError, setMessageError] = useState(null)
	const {warehouses, setWarehouses} = useWarehousesContext()

	const addWarehouse = () => {
		const id = Date.now()
		const products = []
		const newWarehouse = {id, title, length, width, height, products}
		const newState = [...warehouses, newWarehouse]
		setWarehouses(newState)
		toggleIsVisible()
	}

	const checkForm = (value, error, message) => {
		if (value.length <= 0) {
			error(true)
			message(errorMessages.valueIsEmpty)
		} else {
			error(false)
			message(null)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		checkForm(title, setIsTitleError, setMessageError)
		checkForm(length, setIsLengthError, setMessageError)
		checkForm(width, setIsWidthError, setMessageError)
		checkForm(height, setIsHeightError, setMessageError)

		if ((title && width && length && height)) {
			addWarehouse()
		}
	}

	console.log("wqdgdd")

	return (
		<ModalContainer isVisible={isVisible}
		                toggleIsVisible={toggleIsVisible}
		                title={"Adding a warehouse"}
		                onSubmit={handleSubmit}>

			<div className={styles.modalInputs}>
				<ModalInput label={"Name of the warehouse"}
				            value={title}
				            onChange={onChangeTitle}
				            placeholder={"Enter a name"}
				            isError={isTitleError}
				            messageError={messageError}
				            type={"text"}/>

				<ModalInput label={"Length, m"}
				            value={length}
				            onChange={onChangeLength}
				            placeholder={"Enter the length"}
				            isError={isLengthError}
				            messageError={messageError}
				            type={"text"}/>

				<ModalInput label={"Width, m"}
				            value={width}
				            onChange={onChangeWidth}
				            placeholder={"Enter a width"}
				            isError={isWidthError}
				            messageError={messageError}
				            type={"text"}/>

				<ModalInput label={"Height, m"}
				            value={height}
				            onChange={onChangeHeight}
				            placeholder={"Enter a height"}
				            isError={isHeightError}
				            messageError={messageError}
				            type={"text"}/>
			</div>
			<ModalButton text={"Add a warehouse"} type={"submit"}/>
		</ModalContainer>
	)
}
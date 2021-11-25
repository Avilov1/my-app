import {useState} from "react";
import {useWarehousesContext} from "../context/warehousesContext";
import {useInput, errorMessages} from "../services";
import {warehouseApi} from "../services/http/warehouseApi";
import {ModalContainer, ModalButton, ModalInput} from "./index";
import styles from "./styles/AuthModal.module.scss"

export const WarehouseEditModal = () => {

	const {
		warehouses,
		setWarehouses,
		isEditWarehouse,
		setIsEditWarehouse,
		checkWarehouses,
		setCheckWarehouses
	} = useWarehousesContext()

	const [title, onChangeTitle] = useInput(checkWarehouses[0].title)
	const [length, onChangeLength] = useInput(checkWarehouses[0].length)
	const [width, onChangeWidth] = useInput(checkWarehouses[0].width)
	const [height, onChangeHeight] = useInput(checkWarehouses[0].height)
	const [isTitleError, setIsTitleError] = useState(null)
	const [isLengthError, setIsLengthError] = useState(null)
	const [isWidthError, setIsWidthError] = useState(null)
	const [isHeightError, setIsHeightError] = useState(null)
	const [messageError, setMessageError] = useState(null)

	const editWarehouse = async () => {
		try {
			const {data} = await warehouseApi.update({...checkWarehouses[0], title, length, width, height})

			const newState = warehouses.map(warehouse => {
				if (warehouse._id === checkWarehouses[0]._id) {
					return {
						...data
					}
				} else {
					return warehouse
				}
			})

			setIsEditWarehouse(false)
			setCheckWarehouses([])
			setWarehouses(newState)

		} catch (e) {
			alert(e)
		}
	}

	const checkForm = (value, error, message) => {
		if (value.length <= 0 || "") {
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
			editWarehouse()
		}
	}

	return (
		<ModalContainer isVisible={isEditWarehouse}
		                toggleIsVisible={() => setIsEditWarehouse(false)}
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
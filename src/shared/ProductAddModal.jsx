import {useEffect, useState} from "react";
import axios from "axios";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import {useInput, errorMessages,} from "../services";
import styles from "./styles/AuthModal.module.scss"
import {useWarehousesContext} from "../context/warehousesContext";

export const ProductAddModal = ({isVisible, toggleIsVisible}) => {
	// steps
	const [step, setStep] = useState(true)

	const [isStep2, setStep2] = useState(false)
	const [isStep3, setStep3] = useState(false)
	const [isStep4, setStep4] = useState(false)

	// step 1
	const [productName, onChangeProductName] = useInput("")
	const [manufacturer, onChangeManufacturer] = useInput("")
	const [itemNumber, onChangeItemNumber] = useInput("")
	const [isProductError, setIsProductError] = useState(null)
	const [isManufacturerError, setIsManufacturerError] = useState(null)
	const [isItemNumberError, setIsItemNumberError] = useState(null)
	const [messageError, setMessageError] = useState(null)
	const [purchaseTechnology, setPurchaseTechnology] = useState("A")

	//step 2
	const {warehouses, setWarehouses} = useWarehousesContext()

	const addWarehouse = () => {
		const id = Date.now()
		const products = []
		//const newWarehouse = {id, title, length, width, height, products}
		//const newState = [...warehouses, newWarehouse]
		//setWarehouses(newState)
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

	const handleSubmitStep1 = (event) => {
		event.preventDefault()
		checkForm(productName, setIsProductError, setMessageError)
		checkForm(manufacturer, setIsManufacturerError, setMessageError)
		checkForm(itemNumber, setIsItemNumberError, setMessageError)


		if ((productName && manufacturer && itemNumber)) {
			setStep2(true)
			setStep(false)
			console.log("step1 done")
		}
	}

	const handleSubmitStep2 = (event) => {
		event.preventDefault()

		setStep3(true)
		setStep2(false)

	}

	const handleSubmitStep3 = (event) => {
		event.preventDefault()

		setStep4(true)
		setStep3(false)

	}

	const handleSubmitStep4 = (event) => {
		event.preventDefault()

		toggleIsVisible()

	}

	return (
		<>
			<>
				{step &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Adding a product"}
				                onSubmit={handleSubmitStep1}>

					<div className={styles.modalInputs}>
						<ModalInput label={"Product name"}
						            value={productName}
						            onChange={onChangeProductName}
						            placeholder={"Enter a name"}
						            isError={isProductError}
						            messageError={messageError}
						            type={"text"}/>

						<ModalInput label={"Manufacturer"}
						            value={manufacturer}
						            onChange={onChangeManufacturer}
						            placeholder={"Enter the length"}
						            isError={isManufacturerError}
						            messageError={messageError}
						            type={"text"}/>

						<ModalInput label={"Item number"}
						            value={itemNumber}
						            onChange={onChangeItemNumber}
						            placeholder={"Enter a width"}
						            isError={isItemNumberError}
						            messageError={messageError}
						            type={"text"}/>

						<span>Purchasing technology</span>
						<div className={styles.radioBtn}>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchaseTechnology("A");
								}}
							>
								A
								<input
									type="radio"
									value={purchaseTechnology}
									name="purchaseTechnology"
									checked={purchaseTechnology == "A"}
								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchaseTechnology("B");
								}}
							>
								B
								<input
									type="radio"
									value={purchaseTechnology}
									name="purchaseTechnology"
									checked={purchaseTechnology == "B"}
								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchaseTechnology("C");
								}}
							>
								C
								<input
									type="radio"
									value={purchaseTechnology}
									name="purchaseTechnology"
									checked={purchaseTechnology == "C"}
								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchaseTechnology("D");
								}}
							>
								D
								<input
									type="radio"
									value={purchaseTechnology}
									name="purchaseTechnology"
									checked={purchaseTechnology == "D"}
								/>
							</div>
						</div>
					</div>
					<ModalButton text={"Next step"} type={"submit"}/>
				</ModalContainer>
				}
			</>
			<>
				{isStep2 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Shipping method"}
				                onSubmit={handleSubmitStep2}
				>
					<div>Step 2</div>
					<ModalButton text={"Next step"} type={"submit"}/>
				</ModalContainer>
				}
			</>
			<>
				{isStep3 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Payment method"}
				                onSubmit={handleSubmitStep3}
				>
					<div>Step 3</div>
					<ModalButton text={"Next step"} type={"submit"}/>
				</ModalContainer>
				}
			</>
			<>
				{isStep4 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"The cargo was successfully created"}
				                onSubmit={handleSubmitStep4}
				>
					<div>Step 4</div>
					<ModalButton text={"Next step"} type={"submit"}/>
				</ModalContainer>
				}
			</>
		</>


	)
}
{ /*
					<ModalButton text={"Add a warehouse"} type={"submit"}/>
					*/
}
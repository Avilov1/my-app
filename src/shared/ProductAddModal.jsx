import {useWarehousesContext} from "../context/warehousesContext";
import {useState} from "react";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import {ModalCheckRow} from "../UI/modalCheckRow";
import {warehouseApi} from "../services/http/warehouseApi";
import {useInput, errorMessages,} from "../services";
import styles from "./styles/AuthModal.module.scss"

import {
	AirMethodSvg,
	CargoSuccessSvg,
	CashSvg,
	PaypalSvg,
	SeaMethodSvg,
	TruckMethodSvg,
	VisaSvg
} from "../UI/assets/svg";
import {ModalRadio} from "../UI/modalRadio";

export const ProductAddModal = ({isVisible, toggleIsVisible}) => {
	const [step, setStep] = useState(1)
	const [productName, onChangeProductName] = useInput("")
	const [manufacturer, onChangeManufacturer] = useInput("")
	const [itemNumber, onChangeItemNumber] = useInput("")
	const [isProductError, setIsProductError] = useState(null)
	const [isManufacturerError, setIsManufacturerError] = useState(null)
	const [isItemNumberError, setIsItemNumberError] = useState(null)
	const [messageError, setMessageError] = useState(null)
	const [purchasingTechnology, setPurchasingTechnology] = useState("A")
	const [shipmentMethod, setShipmentMethod] = useState("AIR")
	const [paymentMethod, setPaymentMethod] = useState("visa")
	const {setWarehouses, currentWarehouse, setCurrentWarehouse} = useWarehousesContext()

	const addProduct = async () => {
		const id = Date.now()
		const newProduct = {id, productName, manufacturer, itemNumber, purchasingTechnology, shipmentMethod}

		try {
			const updatedWarehouse = await warehouseApi.update(
				{...currentWarehouse, products: [...currentWarehouse.products, newProduct]}
			)
			const newState = await warehouseApi.getAll()
			setCurrentWarehouse(updatedWarehouse.data)
			setWarehouses(newState.data)
			toggleIsVisible()

		} catch (e) {
			alert(e)
		}
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

		if ((productName && manufacturer && itemNumber)) setStep(2)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		addProduct()
	}

	return (
		<>
			<>
				{step === 1 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Adding a product"}
				                submit={handleSubmit}
				>
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

						<span className={styles.purchaseTitle}>Purchasing technology</span>

						<div className={styles.radioBtn}>
							<div
								onClick={() => {
									setPurchasingTechnology("A");
								}}>
								<ModalRadio label={"A"} checked={purchasingTechnology === "A"}/>
							</div>
							<div onClick={() => {
								setPurchasingTechnology("S");
							}}>
								<ModalRadio label={"S"} checked={purchasingTechnology === "S"}/>
							</div>

							<div onClick={() => {
								setPurchasingTechnology("D")
							}}>
								<ModalRadio label={"D"} checked={purchasingTechnology === "D"}/>
							</div>

							<div onClick={() => {
								setPurchasingTechnology("F")
							}}>
								<ModalRadio label={"F"} checked={purchasingTechnology === "F"}/>
							</div>
						</div>
					</div>
					<ModalButton text={"Next step"} type={"button"} onClick={handleSubmitStep1}/>
				</ModalContainer>
				}
			</>
			<>
				{step === 2 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Shipping method"}
				>
					<div className={styles.modalInputs}>
						<div onClick={() => (setShipmentMethod("AIR"))}>
							<ModalCheckRow isActive={shipmentMethod === "AIR"}>
								<AirMethodSvg width={24} height={24}/>
								By air transport
							</ModalCheckRow>
						</div>
						<div onClick={() => (setShipmentMethod("SEA"))}>
							<ModalCheckRow isActive={shipmentMethod === "SEA"}>
								<SeaMethodSvg width={24} height={24}/>
								By sea
							</ModalCheckRow>
						</div>
						<div onClick={() => (setShipmentMethod("TRUCK"))}>
							<ModalCheckRow isActive={shipmentMethod === "TRUCK"}>
								<TruckMethodSvg width={24} height={24}/>
								By car
							</ModalCheckRow>
						</div>
					</div>
					<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(3)}/>
				</ModalContainer>
				}
			</>
			<>
				{step === 3 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Payment method"}
				>
					<div className={styles.modalInputs}>
						<div onClick={() => (setPaymentMethod("visa"))}>
							<ModalCheckRow isActive={paymentMethod === "visa"}>
								<VisaSvg width={24} height={24}/>
								Visa, Mastercard
							</ModalCheckRow>
						</div>
						<div onClick={() => (setPaymentMethod("paypal"))}>
							<ModalCheckRow isActive={paymentMethod === "paypal"}>
								<PaypalSvg width={24} height={24}/>
								Paypal
							</ModalCheckRow>
						</div>
						<div onClick={() => (setPaymentMethod("cash"))}>
							<ModalCheckRow isActive={paymentMethod === "cash"}>
								<CashSvg width={24} height={24}/>
								Cash
							</ModalCheckRow>
						</div>
					</div>
					<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(4)}/>
				</ModalContainer>
				}
			</>
			<>
				{step === 4 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"The cargo was successfully created"}
				                doneImg={"add"}
				                onSubmit={handleSubmit}>

					<ModalButton text={"Continue"} type={"submit"}/>
				</ModalContainer>
				}</>
		</>
	)
}

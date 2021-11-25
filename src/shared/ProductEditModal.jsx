import {useState} from "react";
import {ModalCheckRow} from "../UI/modalCheckRow";
import {useInput, errorMessages,} from "../services";
import {useWarehousesContext} from "../context/warehousesContext";
import {warehouseApi} from "../services/http/warehouseApi";
import {StepIndicator} from "../UI/StepIndicator";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import styles from "./styles/AuthModal.module.scss"
import {
	AirMethodSvg,
	CashSvg,
	PaypalSvg,
	SeaMethodSvg,
	TruckMethodSvg,
	VisaSvg
} from "../UI/assets/svg";
import {ModalRadio} from "../UI/modalRadio";


export const ProductEditModal = ({isVisible, toggleIsVisible}) => {
	const {
		setWarehouses,
		currentWarehouse,
		setCurrentWarehouse,
		checkProducts,
		setCheckProducts
	} = useWarehousesContext()

	const [step, setStep] = useState(1)
	const [productName, onChangeProductName] = useInput(checkProducts[0].productName)
	const [manufacturer, onChangeManufacturer] = useInput(checkProducts[0].manufacturer)
	const [itemNumber, onChangeItemNumber] = useInput(checkProducts[0].itemNumber)
	const [isProductError, setIsProductError] = useState(null)
	const [isManufacturerError, setIsManufacturerError] = useState(null)
	const [isItemNumberError, setIsItemNumberError] = useState(null)
	const [messageError, setMessageError] = useState(null)
	const [purchasingTechnology, setPurchasingTechnology] = useState(checkProducts[0].purchasingTechnology)
	const [shipmentMethod, setShipmentMethod] = useState(checkProducts[0].shipmentMethod)
	const [paymentMethod, setPaymentMethod] = useState("visa")

	const editProduct = async () => {
		const updatedProducts = currentWarehouse.products.map(product => {
			if (product.id === checkProducts[0].id) {
				return {
					...product,
					itemNumber,
					manufacturer,
					productName,
					purchasingTechnology,
					shipmentMethod
				}
			} else {
				return product
			}
		})

		try {
			const updatedWarehouse = await warehouseApi.update({
				...currentWarehouse,
				products: [...updatedProducts]
			})
			const newState = await warehouseApi.getAll()
			setWarehouses(newState.data)
			setCurrentWarehouse(updatedWarehouse.data)
			toggleIsVisible()
			setCheckProducts([])

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
		editProduct()
	}

	return (
		<>
			<>
				{step === 1 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Edit a product"}
				                submit={handleSubmit}>

					<StepIndicator step={step}/>

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
				                title={"Shipping method"}>

					<StepIndicator step={step}/>

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
				                title={"Payment method"}>

					<StepIndicator step={step}/>

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
				                title={"The cargo was successfully edit"}
				                doneImg={"edit"}
				                onSubmit={handleSubmit}>

					<ModalButton text={"Continue"} type={"submit"}/>
				</ModalContainer>
				}</>
		</>
	)
}

import {useState} from "react";
import {useInput, errorMessages,} from "../services";
import {useWarehousesContext} from "../context/warehousesContext";
import {ModalCheckRow} from "../UI/modalCheckRow";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
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

export const ProductEditModal = ({isVisible, toggleIsVisible}) => {
	const {warehouses, setWarehouses, currentWarehouse, setCurrentWarehouse, checkProducts, setCheckProducts} = useWarehousesContext()
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

	const editProduct = () => {
		const newProducts = currentWarehouse.products.map(product => {
			if (product.id === checkProducts[0].id) {
				const newProduct = {...product, itemNumber, manufacturer, productName, purchasingTechnology, shipmentMethod}
				return newProduct
			} else {
				return product
			}
		})

		const newState = warehouses.map(warehouse => {
			if (warehouse.id === currentWarehouse.id) {
				const addedProductWarehouse = {...warehouse, products: [...newProducts]}
				return addedProductWarehouse
			} else {
				return warehouse
			}
		})

		setWarehouses(newState)
		setCheckProducts([])
		setCurrentWarehouse({...currentWarehouse, products: [...newProducts]})

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

						<span>Purchasing technology</span>
						<div className={styles.radioBtn}>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchasingTechnology("A");
								}}
							>
								A
								<input
									type="radio"
									value={purchasingTechnology}
									name="purchaseTechnology"
									checked={purchasingTechnology === "A"}

								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchasingTechnology("S");
								}}
							>
								S
								<input
									type="radio"
									value={purchasingTechnology}
									name="purchaseTechnology"
									checked={purchasingTechnology === "S"}
								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchasingTechnology("C");
								}}
							>
								C
								<input
									type="radio"
									value={purchasingTechnology}
									name="purchaseTechnology"
									checked={purchasingTechnology === "C"}
								/>
							</div>
							<div
								className="radio-btn"
								onClick={() => {
									setPurchasingTechnology("D");
								}}
							>
								D
								<input
									type="radio"
									value={purchasingTechnology}
									name="purchaseTechnology"
									checked={purchasingTechnology === "D"}
								/>
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
						<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(3)}/>
					</div>
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
						<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(4)}/>
					</div>
				</ModalContainer>
				}
			</>
			<>
				{step === 4 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"The cargo was successfully created"}
				                onSubmit={handleSubmit}>

					<div className={styles.modalInputs}>
						<CargoSuccessSvg width={224} height={224}/>
						<ModalButton text={"Continue"} type={"submit"}/>
					</div>
				</ModalContainer>
				}</>
		</>
	)
}

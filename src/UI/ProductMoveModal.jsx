import {useState} from "react";
import {useWarehousesContext} from "../context/warehousesContext";
import {ModalContainer, ModalButton, ModalInput} from "./index";
import {ModalCheckRow} from "./modalCheckRow";
import {ModalSelectCustom} from "./ModalSelectCustom";
import {warehouseApi} from "../services/http/warehouseApi";
import styles from "./styles/AuthModal.module.scss"
import {
	AirMethodSvg,
	CashSvg, MoveArrowSvg,
	MoveSuccessSvg,
	PaypalSvg,
	SeaMethodSvg,
	TruckMethodSvg,
	VisaSvg
} from "./assets/svg";
import {StepIndicator} from "./StepIndicator";

export const ProductMoveModal = ({isVisible, toggleIsVisible}) => {
	const {
		setWarehouses,
		currentWarehouse,
		checkProducts,
		setCurrentWarehouse,
		setCheckProducts
	} = useWarehousesContext()

	const [step, setStep] = useState(1)
	const [warehouseFrom] = useState(currentWarehouse)
	const [warehouseIn, setWarehouseIn] = useState("")
	const [shipmentMethod, setShipmentMethod] = useState("air")
	const [paymentMethod, setPaymentMethod] = useState("visa")

	const moveProduct = async () => {
		const updateFromProducts = warehouseFrom.products.filter(prod => !checkProducts.includes(prod))

		const updateInProducts = [...warehouseIn.products,
			...warehouseFrom.products.filter(prod => checkProducts.includes(prod))]

		try {
			const updateFromWarehouse = await warehouseApi.update({
				...warehouseFrom, products: [...updateFromProducts]
			})

			await warehouseApi.update({...warehouseIn, products: [...updateInProducts]})
			const {data} = await warehouseApi.getAll()
			setCurrentWarehouse(updateFromWarehouse.data)
			setWarehouses(data)
			setCheckProducts([])
			toggleIsVisible()

		} catch (e) {
			alert(e)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		moveProduct()
	}

	return (
		<>
			<>
				{step === 1 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Move cargo"}>

					<StepIndicator step={step}/>

					<div className={styles.modalInputs}>
						<ModalInput label={"From"}
						            value={warehouseFrom.title}
						            type={"text"}
						            disabled/>

						<div className={styles.moveArrow}>
							<MoveArrowSvg/>
						</div>

						<ModalSelectCustom value={warehouseIn} setValue={setWarehouseIn}/>

					</div>
					<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(2)}/>
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
						<div onClick={() => (setShipmentMethod("air"))}>
							<ModalCheckRow isActive={shipmentMethod === "air"}>
								<AirMethodSvg width={24} height={24}/>
								By air transport
							</ModalCheckRow>
						</div>
						<div onClick={() => (setShipmentMethod("sea"))}>
							<ModalCheckRow isActive={shipmentMethod === "sea"}>
								<SeaMethodSvg width={24} height={24}/>
								By sea
							</ModalCheckRow>
						</div>
						<div onClick={() => (setShipmentMethod("truck"))}>
							<ModalCheckRow isActive={shipmentMethod === "truck"}>
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
						<ModalButton text={"Next step"}
						             type={"button"}
						             onClick={() => setStep(4)}/>
					</div>
				</ModalContainer>
				}
			</>
			<>
				{step === 4 &&
				<ModalContainer isVisible={isVisible}
				                toggleIsVisible={toggleIsVisible}
				                title={"Cargo was successfully moved"}
				                doneImg={"move"}
				                onSubmit={handleSubmit}>

						<ModalButton text={"Continue"} type={"submit"}/>
				</ModalContainer>
				}</>
		</>
	)
}

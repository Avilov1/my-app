import {useState} from "react";
import {ModalContainer, ModalButton, ModalInput} from "../UI";
import {useInput, errorMessages,} from "../services";
import styles from "./styles/AuthModal.module.scss"
import {useWarehousesContext} from "../context/warehousesContext";
import {ModalCheckRow} from "../UI/modalCheckRow";
import {
	AirMethodSvg,
	CargoSuccessSvg, CashSvg,
	MoveSuccessSvg,
	PaypalSvg,
	SeaMethodSvg,
	TruckMethodSvg,
	VisaSvg
} from "../UI/assets/svg";
import {ModalSelect} from "../UI/ModalSelect";

export const ProductMoveModal = ({isVisible, toggleIsVisible}) => {
	const {
		warehouses,
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

	const moveProduct = () => {
		const newFromWarehouseProducts = warehouseFrom.products.filter(prod => !checkProducts.includes(prod))
		const newInWarehouseProducts = warehouseFrom.products.filter(prod => checkProducts.includes(prod))
		const newFromWarehouse = {...warehouseFrom, products: [...newFromWarehouseProducts]}

		const newWarehouse = warehouses.map(warehouse => {
			if (warehouse.id === warehouseIn.id) {
				const newWarehouse = {...warehouse, products: [...warehouse.products, ...newInWarehouseProducts]}
				return newWarehouse
			} else {
				return warehouse
			}
		})

		setWarehouses(newWarehouse.map(warehouse => {

			if (warehouse.id === warehouseFrom.id) {
				const newWarehouse = {...warehouse, products: [...newFromWarehouseProducts]}
				return newWarehouse
			} else {
				return warehouse
			}
		}))
		setCurrentWarehouse(newFromWarehouse)
		setCheckProducts([])
		toggleIsVisible()
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
				                title={"Adding a product"}
				>

					<div className={styles.modalInputs}>
						<ModalInput label={"Product name"}
						            value={warehouseFrom.title}
						            type={"text"}/>
						<ModalSelect value={warehouseIn} setValue={setWarehouseIn}/>

					</div>
					<ModalButton text={"Next step"} type={"button"} onClick={() => setStep(2)}/>
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
						<MoveSuccessSvg width={224} height={224}/>
						<ModalButton text={"Continue"} type={"submit"}/>
					</div>
				</ModalContainer>
				}</>
		</>
	)
}

import styles from "./styles/ShipmentSwitchIcon.module.scss"
import {AirMethodSvg, SeaMethodSvg, TruckMethodSvg} from "./assets/svg";

export const ShipmentSwitchIcon = ({method}) => {

	const shipMethod = () => {
		switch (method) {
			case "AIR":
				return <AirMethodSvg width={15} height={16}/>
			case "SEA":
				return <SeaMethodSvg width={16} height={14}/>
			case "TRUCK":
				return <TruckMethodSvg width={14} height={16}/>
			default:
				return ""
		}
	}

	return (
		<div className={styles.icon}>
			{shipMethod()}
		</div>
	)
}
import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {TableRow} from "../UI/TableRow";

export const WarehouseId = ({title, manufacturer, itemNumber, purchasingTechnology, shipmentMethod}) => {
    return (
        <div>
            <header className={styles.headerContent}>
                <h1>{title}</h1>
                <div className={styles.rightSideHeader}>
                    <select>
                        <option>Filter by</option>
                    </select>
                    <SelectIconSvg />
                    <ButtonAdd text={"Add a warehouse"}/>
                </div>
            </header>
            <div className={styles.tableContainer}>
                <table>
                    <TableHeader col1={"All stores"} col2={"Number of products"}
                                 col3={"Length, m"} col4={"Width, m"} col5={"Height, m"}/>
                    <tbody>
                    <TableRow col1={"Warehouse 1"} col2={manufacturer} col3={itemNumber}
                              col4={purchasingTechnology} col5={shipmentMethod}/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
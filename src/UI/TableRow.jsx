import {Checkbox} from "./Checkbox";
import styles from "./styles/TableRow.module.scss"

export const TableRow = ({col1, col2, col3, col4, col5}) => {
    return (
        <tr className={styles.tr}>
            <td className={styles.td}><Checkbox /><span>{col1}</span></td>
            <td className={styles.td}>{col2}</td>
            <td className={styles.td}>{col3}</td>
            <td className={styles.td}>{col4}</td>
            <td className={styles.td}>{col5}</td>
        </tr>
    )
}
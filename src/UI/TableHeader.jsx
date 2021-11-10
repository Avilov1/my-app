import {CheckboxWarehouse} from "./CheckboxWarehouse";
import styles from "./styles/TableHeader.module.scss"

export const TableHeader = ({col1, col2, col3, col4, col5}) => {
	return (
		<thead>
		<tr className={styles.tr} width={200}>
			<th className={styles.th} width={200}>
				<div>
					<CheckboxWarehouse/>
					<span>{col1}</span>
				</div>
			</th>
			<th className={styles.th}>
				{col2}
			</th>
			<th className={styles.th}>
				{col3}
			</th>
			<th className={styles.th}>
				{col4}
			</th>
			<th className={styles.th}>
				{col5}
			</th>
		</tr>
		</thead>
	)
}

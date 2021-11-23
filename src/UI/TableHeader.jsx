import styles from "./styles/TableHeader.module.scss"
import {CheckboxHeaderTable} from "./CheckboxHeaderTable";

export const TableHeader = ({col1, col2, col3, col4, col5, parentComponent}) => {
	return (
		<thead>
		<tr className={styles.tr} width={200}>
			<th className={styles.th} width={200}>
				<div>
					<CheckboxHeaderTable parentComponent={parentComponent}/>
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

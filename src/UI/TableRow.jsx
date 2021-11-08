import {Checkbox} from "./Checkbox";
import styles from "./styles/TableRow.module.scss"
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const TableRow = ({col1, col2, col3, col4, col5, onClick}) => {
	return (
		<tr className={styles.tr} onClick={onClick}>
			<td className={styles.td}><Checkbox/><span>{col1}</span></td>
			<td className={styles.td}>{col2}</td>
			<td className={styles.td}>{col3}</td>
			<td className={styles.td}>{col4}</td>
			<td className={styles.td}>{col5}</td>
		</tr>
	)
}
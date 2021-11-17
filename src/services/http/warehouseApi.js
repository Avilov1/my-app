import {$authHost} from "./index";

export const warehouseRemove = async (id) => {
	try {
		const response = await $authHost.delete(`api/warehouse/${id}`)
		return response
	} catch (e) {
		return e.response
	}
}
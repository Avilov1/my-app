import {$authHost} from "./index";

export const warehouseApi = {
	async remove(id) {
		try {
			const response = await $authHost.delete(`api/warehouse/${id}`)
			return response
		} catch (e) {
			return e.response
		}
	},

	async getAll() {
		try {
			const response = await $authHost.get('api/warehouse')
			return response
		} catch (e) {
			return e.response
		}
	},

	async update(obj) {
		try {
			const response = await $authHost.patch(`api/warehouse/${obj._id}`, obj)
			return response
		} catch (e) {
			return e.response
		}
	},

	async add(obj) {
		try {
			const response = await $authHost.post(`api/warehouse`, obj)
			return response
		} catch (e) {
			return e.response
		}
	},
}
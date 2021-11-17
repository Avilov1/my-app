import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
	try {
		const response = await $host.post('api/auth/register', {email, password})
		return response
	} catch (e) {
		console.log(e.response)
		return e.response

	}
}

export const singIn = async (email, password) => {
	const {data} = await $host.post('api/auth/login', {email, password})
	localStorage.setItem("token", data.token)
	return data
}

export const check = async () => {
	const {data} = await $authHost.get('api/auth/login')
	localStorage.setItem("token", data)
	return data
}

export const getStringAt14 = (str: string | null | undefined) => {
	if (!str) return ''
	if (str.length < 14) return str
	return str.slice(0, 14) + '...'
}

export const firstLetterCapital = (str: string | null | undefined) => {
	if (!str) return ''

	return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
}

export const randomText = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let text = ''
	for (let i = 0; i < 10; i++) {
		text += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return text
}

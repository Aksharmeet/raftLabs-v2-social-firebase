import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Outlet } from 'react-router-dom'
import Loading from './Loading'

const Auth = ({ type }: { type: string }) => {
	const Auth = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()

	const currentUser = Auth?.currentUser
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		return () => {
			clearTimeout(timeout)
		}
	}, [currentUser])

	if (isLoading) return <Loading />

	if (type === 'public') {
		if (Auth?.currentUser) navigate('/', { replace: true })
	}

	if (type === 'private') {
		if (!Auth?.currentUser) navigate('/login', { replace: true })
	}

	// if type is private and user is authenticated, render the child route
	return <Outlet />
}

export default Auth

import { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

import { AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'

function Home() {
	const Auth = useContext(AuthContext)
	const [loading, setLoading] = useState(true)
	const [counter, setCounter] = useState(3)

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
	}, [counter])

	useEffect(() => {
		const changeLoader = () => {
			if (Auth?.currentUser?.photoURL) {
				setLoading(false)
			}
		}
		if (counter > 0) {
			setTimeout(() => {
				changeLoader()
			}, 3000)
		} else {
			changeLoader()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Auth?.userData])

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Sidebar>
					<div></div>
				</Sidebar>
			)}
		</>
	)
}

export default Home

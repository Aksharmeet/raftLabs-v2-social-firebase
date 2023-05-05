import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Error404 from './pages/Error404'
import Auth from './components/Auth'
import UserProfile from './pages/UserProfile'
import FindUsers from './pages/FindUsers'

function RouteProvider() {
	return (
		<Router>
			<Routes>
				<Route element={<Auth type='private' />}>
					<Route path='/' element={<Home />} />
					<Route path='/userProfile' element={<UserProfile />} />
					<Route path='/findUsers' element={<FindUsers />} />
				</Route>

				<Route element={<Auth type='public' />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<Error404 />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default RouteProvider

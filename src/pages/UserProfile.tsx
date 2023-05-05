import { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../context/AuthContext'

import UserData from '../components/UserProfile/UserData'
import PostsGrid from '../components/UserProfile/PostsGrid'

function UserProfile() {
	const authData = useContext(AuthContext)
	const userData = authData?.userData
	useEffect(() => {
		if (userData) console.log(userData)
	}, [userData])
	return (
		<Sidebar>
			<div className='text-darkest font-nekst pt-20 mx-32 mb-20'>
				<div className='flex flex-col gap-10 mx-auto'>
					<UserData />
					<div className='w-[90%] h-[.5px] bg-neutral-300' />
					<PostsGrid />
				</div>
			</div>
		</Sidebar>
	)
}

export default UserProfile

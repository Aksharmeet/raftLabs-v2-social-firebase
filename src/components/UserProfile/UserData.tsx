import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { firstLetterCapital, getStringAt14 } from '../../utils/stringManipulation'

function UserData() {
	const authData = useContext(AuthContext)
	const userData = authData?.userData
	return (
		<div className='flex items-center gap-8'>
			<img src={userData?.profileUrl} alt='profile' className='w-36 h-36 rounded-full' />
			<div className='mt-4'>
				<p className='text-3xl font-bold'> {firstLetterCapital(getStringAt14(userData?.username))} </p>
				<div className='mt-4 flex gap-7'>
					<div className='flex items-center gap-1'>
						<p className='text-sm font-semibold'>{userData?.followers}</p>
						<p className='font-medium'>Followers</p>
					</div>
					<div className='flex items-center gap-1'>
						<p className='text-sm font-semibold'>{userData?.following}</p>
						<p className=' font-medium'>Following</p>
					</div>
					<div className='flex items-center gap-1'>
						<p className='text-sm font-semibold'>{userData?.posts}</p>
						<p className=' font-medium'>Posts</p>
					</div>
				</div>
				<p className='mt-2'>Hello, {firstLetterCapital(getStringAt14(userData?.username))} </p>
			</div>
		</div>
	)
}

export default UserData

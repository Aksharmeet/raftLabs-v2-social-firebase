import { useState, useEffect } from 'react'
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, query, startAfter } from 'firebase/firestore'
import { db } from '../firebase'
import { UserData } from '../@types/UserData'
import Sidebar from '../components/Sidebar'

import { Button } from 'antd'
import { getStringAt14 } from '../utils/stringManipulation'

function UsersList() {
	const [users, setUsers] = useState<UserData[]>([])
	const [pageNo, setpageNo] = useState(0)
	const [lastPage, setLastPage] = useState<QueryDocumentSnapshot<DocumentData>>()

	useEffect(() => {
		const tempUsers: UserData[] = []
		const getPosts = async () => {
			const first = query(collection(db, 'users'), limit(10))
			if (pageNo === 0) {
				// Query the first page of docs
				const firstSnaps = await getDocs(first)

				if (firstSnaps.docs.length > 0) {
					setLastPage(firstSnaps.docs[firstSnaps.docs.length - 1])

					firstSnaps.forEach((doc) => {
						const User = doc.data() as UserData
						tempUsers.push(User)
					})
				}

				setUsers([...users, ...tempUsers])
				setpageNo((prev) => prev + 1)
			}
			if (pageNo > 1) {
				const next = query(collection(db, 'users'), startAfter(lastPage), limit(10))
				const nextSnaps = await getDocs(next)
				if (nextSnaps.docs.length > 0) {
					setLastPage(nextSnaps.docs[nextSnaps.docs.length - 1])

					nextSnaps.forEach((doc) => {
						const User = doc.data() as UserData
						tempUsers.push(User)
					})
				}

				setUsers([...users, ...tempUsers])
				setpageNo((prev) => prev + 1)
			}
		}

		getPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastPage])

	return (
		<Sidebar>
			<div className='w-full justify-center items-center mt-10  font-nekst'>
				<div className='border-b mb-5'>
					<p className='pl-10 py-10 text-3xl font-semibold'>Find Users</p>
				</div>
				{users.length > 0
					? users.map((user) => (
							<div className='flex items-center gap-10  hover:bg-neutral-100  py-3 px-10 transition-colors duration-500 overflow-clip'>
								<div key={user.uid} className=' flex gap-3  items-center w-full max-w-[600px] ms:max-w-[400px]'>
									<img src={user.profileUrl} alt='alt' className='w-16 h-16 rounded-full' />
									<div>
										<p className='font-medium text-lg'>{getStringAt14(user.username)}</p>
										<p className='text-neutral-500'>{getStringAt14(user.email)}</p>
									</div>
								</div>
								<Button
									type='primary'
									className='bg-blue-500 text-neutral-100  rounded-md hover:bg-blue-600 transition-colors'
									color='rgb(59, 130, 246)'
									// loading={loading}
									// onClick={() => handleSubmit()}
								>
									Follow
								</Button>
							</div>
					  ))
					: ''}
			</div>
			{/* <button onClick={loadMore}>Load more</button> */}
		</Sidebar>
	)
}

export default UsersList

import { useContext, useEffect, useState } from 'react'
import Create from '../../components/CreateDialog'
import { AuthContext } from '../../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { Posts } from '../../@types/Posts'

function PostsGrid() {
	const [CreateDialog, setCreateDialog] = useState(false)
	const [userPosts, setUserPosts] = useState<Posts[]>([])

	const Auth = useContext(AuthContext)

	useEffect(() => {
		const getPosts = async () => {
			if (Auth?.userData) {
				const querySnap = await getDocs(collection(db, 'users', Auth?.userData.uid, 'postsData'))
				const tempPosts = [] as Posts[] // create temporary array

				querySnap.forEach((doc) => {
					const post = doc.data() as Posts
					tempPosts.push(post) // add each post to temporary array
				})

				setUserPosts(tempPosts) // update userPosts with entire array
			}
		}

		getPosts()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Auth?.userData])

	return (
		<div>
			<div className='grid grid-cols-3 gap-1'>
				{userPosts.map((post, index) => (
					<div className='relative'>
						<div className='w-full h-full absolute top-0 right-0 left-0 z-10  hover:bg-[rgb(0,0,0,0.5)] transition-colors duration-300' />
						<img
							src={post.postImage}
							alt='post'
							key={index}
							className='w-full h-[320px]  object-cover absolute top-0 right-0 left-0  bg-neutral-200 z-[5] transition-colors duration-300'
						/>
						<div className='w-full h-[320px]  bg-neutral-200  transition-colors duration-300' />
					</div>
				))}
			</div>

			{CreateDialog ? <Create setOpen={setCreateDialog} open={CreateDialog} /> : ''}
		</div>
	)
}

export default PostsGrid

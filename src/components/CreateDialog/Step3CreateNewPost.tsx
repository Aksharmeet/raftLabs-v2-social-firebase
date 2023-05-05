import { useContext, useEffect, useState } from 'react'
import ArrowLeft from '../../assets/svgs/ArrowLeft'
import Modal from './Modal'
import { AuthContext } from '../../context/AuthContext'
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getStringAt14, randomText } from '../../utils/stringManipulation'

function Step3CreateNewPost({
	open,
	setOpen,
	setStageOfCreation,
	imgPreview,
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	setStageOfCreation: React.Dispatch<React.SetStateAction<number>>
	imgPreview: { src: string; blob: File }
}) {
	const auth = useContext(AuthContext)
	const currentUser = auth?.userData
	const [desc, setDesc] = useState('')

	useEffect(() => {
		const preview = document.getElementById('file-preview') as HTMLImageElement
		if (preview) preview.src = imgPreview.src
	}, [imgPreview])

	const handleNavigateBack = () => {
		setStageOfCreation((prev) => prev - 1)
	}

	const createPost = async () => {
		const uid = currentUser?.uid

		const storageRef = ref(storage, getStringAt14(desc) + randomText() + '.png')

		const uploadTask = uploadBytesResumable(storageRef, imgPreview.blob)

		if (uid) {
			const userPostRef = collection(db, 'users', uid, 'postsData')
			const UserDataRef = doc(db, 'users', uid)

			uploadTask.on(
				'state_changed',
				() => {},
				(error) => {
					console.log(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						try {
							await addDoc(userPostRef, {
								comments: [],
								coomentsCount: 0,
								likes: [],
								likesCount: 0,
								postImage: downloadURL,
								description: desc,
							})

							await updateDoc(UserDataRef, {
								posts: increment(1),
							})
							window.location.reload()
						} catch (err: any) {
							console.log(err)
						}

						setOpen((prev) => !prev)
					})
				}
			)
		}
	}

	const handleShare = () => {
		setStageOfCreation(4)
		createPost()
	}

	return (
		<Modal open={open} setOpen={setOpen} stageOfCreation={3}>
			<div className='flex justify-between pb-3 items-center '>
				<div className='cursor-pointer' onClick={handleNavigateBack}>
					<ArrowLeft />
				</div>
				<p className='font-bold text-base'>Create new post</p>

				<p className='text-[#0BA5E9] font-semibold cursor-pointer hover:text-[#63badf] transition-colors' onClick={handleShare}>
					Share
				</p>
			</div>
			<div className='flex gap-5'>
				<div>
					<img id='file-preview' alt='preview file' className='w-full h-[65vh] object-cover' />
				</div>
				<div className='w-[360px] mt-3'>
					<div className='flex items-center gap-2'>
						<div className='relative'>
							{currentUser && <img alt='preview file' src={currentUser.profileUrl} className='w-8 h-8 rounded-full  absolute z-10' />}
							<div className='w-8 h-8 bg-slate-400 rounded-full' />
						</div>
						<div>
							<p className='font-medium'> {currentUser && currentUser.username}</p>
						</div>
					</div>
					<div className='mt-3'>
						<textarea
							id='message'
							rows={15}
							className='block  py-2 w-full text-sm text-gray-900  rounded-lg active:outline-none focus:outline-none resize-none'
							placeholder='Write your thoughts here...'
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							maxLength={2200}
						></textarea>
						<p className='text-darkest text-right'>{desc.length} / 2,200</p>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default Step3CreateNewPost

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Button } from 'antd'
import { AuthContext } from '../context/AuthContext'
import { UserData } from '../@types/UserData'

function Register() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		file: new File([], ''),
	})
	const [err, setErr] = useState('')
	const [loading, setLoading] = useState(false)
	const Auth = useContext(AuthContext)

	const handleSubmit = async () => {
		setTimeout(() => {
			setLoading(true)
		})
		try {
			await createUserWithEmailAndPassword(auth, user.email, user.password).then((res) => {
				const storageRef = ref(storage, `${user.username}.png`)

				const uploadTask = uploadBytesResumable(storageRef, user.file)

				uploadTask.on(
					'state_changed',
					() => {},
					(error) => {
						console.log(error)
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							try {
								await updateProfile(res.user, {
									displayName: user.username,
									photoURL: downloadURL,
								})

								await setDoc(doc(db, 'users', res.user.uid), {
									uid: res.user.uid,
									username: user.username,
									email: user.email,
									profileUrl: downloadURL,
									createdAt: serverTimestamp(),
									followers: 0,
									following: 0,
									posts: 0,
								}).then(async () => {
									const docRef = doc(db, 'users', res.user.uid)
									const docSnap = await getDoc(docRef)
									if (Auth?.setUserData) {
										Auth?.setUserData(docSnap.data() as UserData)
									}
								})
							} catch (err: any) {
								setErr(JSON.stringify(err))
							}
						})
					}
				)
			})
		} catch (err: any) {
			setErr(JSON.stringify(err))
			setTimeout(() => {
				setLoading(false)
			})
		}
	}

	return (
		<section className='max-w-lg md:max-w-3xl lg:max-w-none xl:max-w-[1400px] text mx-auto py-5 sm:py-10 px-5  sm:px-14 lg:px-[40px]  items-start flex min-h-screen text-neutral-100'>
			<div className='lg:grid lg:grid-cols-2 gap-5 xl:gap-16 h-[100%] w-[100%] '>
				<div className='md:w-[70%] lg:w-[80%] mx-auto'>
					<Link className='flex items-center gap-2 ' to='/login'>
						<img
							src='https://uploads-ssl.webflow.com/60d5a97381523ace9d3c87bb/6447e9c71ae5fb1a8df86b1b_logo_1200w-p-500.png'
							alt='raftlabs logo'
							className='sm:h-10 sm:w-10 h-8 w-8'
						/>
						<p className=' text-xl md:text-2xl font-medium'>RaftLabs</p>
					</Link>
					<div className=' w-[100%] mt-16'>
						<h1 className='text-4xl lg:text-5xl xl:text-6xl font-semibold'>Lets get going..</h1>
						<p className='text-gray-500 mt-4 text-sm sm:text-base'>Register your account</p>

						<form className='mt-5'>
							<div className='flex flex-col gap-6'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='username' className='text-sm font-medium'>
										Name
									</label>
									<input
										type='text'
										name='username'
										id='username'
										value={user.username}
										onChange={(e) => setUser({ ...user, username: e.target.value })}
										className='border border-gray-300 rounded-md px-2 md:px-3 py-1 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-100 text-darkest'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='email' className='text-sm font-medium'>
										Email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										value={user.email}
										onChange={(e) => setUser({ ...user, email: e.target.value })}
										className='border border-gray-300 rounded-md px-2 md:px-3 py-1 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-100 text-darkest'
									/>
								</div>
								{/* add an image */}
								<div className='flex flex-col gap-2'>
									<label htmlFor='image' className='text-sm font-medium'>
										Profile Image
									</label>
									<input
										type='file'
										name='image'
										id='image'
										accept='image/png, image/jpeg'
										max={4 * 1024 * 1024}
										onChange={(e) => (e.target.files ? setUser({ ...user, file: e.target.files[0] }) : '')}
										className='border border-gray-300 rounded-md px-2 md:px-3 py-1 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 '
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='password' className='text-sm font-medium '>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										value={user.password}
										onChange={(e) => setUser({ ...user, password: e.target.value })}
										className='border border-gray-300 rounded-md px-2 md:px-3 py-1 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-darkest'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center'>
											<input type='checkbox' name='remember' id='remember' className='mr-2' />
											<label htmlFor='remember' className='text-sm font-medium'>
												Remember me
											</label>
										</div>
									</div>
								</div>
								<div className='flex items-center justify-between mt-4'>
									<Button
										type='primary'
										className='bg-blue-500 text-neutral-100  rounded-md hover:bg-blue-600 transition-colors'
										color='rgb(59, 130, 246)'
										loading={loading}
										onClick={() => handleSubmit()}
									>
										Register
									</Button>

									<Link to='/login' className='text-sm '>
										Existing user? <span className='font-medium text-blue-500'>Login</span>
									</Link>
								</div>
								{err && <p className='text-red-500 text-sm mt-2'>{err}</p>}
							</div>
						</form>
					</div>
				</div>
				<div className='bg-yellow-blur bg-cover rounded overflow-clip  items-center h-screen hidden lg:flex'>
					<img src={require('../assets/imgs/LoginMan.jpg')} alt='login main' className='w-[65%] mx-auto rounded' />
				</div>
			</div>
		</section>
	)
}

export default Register

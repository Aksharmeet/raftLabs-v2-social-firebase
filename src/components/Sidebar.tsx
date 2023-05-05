import { ReactNode, useContext, useState } from 'react'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { items, userSettings } from '../utils/menuItems'
import { AuthContext } from '../context/AuthContext'
import { firstLetterCapital, getStringAt14 } from '../utils/stringManipulation'
import ExpandArrow from '../assets/svgs/ExpandArrow'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import Create from '../components/CreateDialog'

import { auth } from '../firebase'

const Sidebar = ({ children }: { children: ReactNode }) => {
	const [toggler, setToggler] = useState(false)
	const [CreateDialog, setCreateDialog] = useState(false)

	const authUser = useContext(AuthContext)
	const currentUser = authUser?.currentUser

	const navigate = useNavigate()
	const location = useLocation()

	return (
		<Layout className='min-h-screen font-nekst' hasSider>
			<Sider
				breakpoint='lg'
				theme='light'
				collapsedWidth='0'
				width={280}
				onBreakpoint={(broken) => {}}
				onCollapse={(collapsed, type) => {}}
				className='text-darkest'
				style={{ position: 'absolute', zIndex: 1, height: '100vh', maxHeight: '100vh' }}
			>
				<div className=''>
					<div className='flex items-center gap-3 pt-10 pl-10'>
						<img
							src='https://uploads-ssl.webflow.com/60d5a97381523ace9d3c87bb/6447e9c71ae5fb1a8df86b1b_logo_1200w-p-500.png'
							alt='raftlabs logo'
							className='h-6 w-6'
						/>
						<p className=' text-lg md:text-xl font-medium'>RaftLabs</p>
					</div>
					{currentUser ? (
						<div>
							<div className='flex items-center mt-14 justify-between pl-5 pr-5 font-medium'>
								<Link to='/userProfile'>
									<div className='flex items-center gap-3 cursor-pointer'>
										<img
											src={currentUser.providerData[0].photoURL ? currentUser.providerData[0].photoURL : ''}
											alt='user profile'
											className='rounded-full sm:h-12 sm:w-12 h-10 w-10'
										/>
										<p>{firstLetterCapital(getStringAt14(currentUser.providerData[0].displayName))}</p>
									</div>
								</Link>

								<div
									onClick={() => setToggler((prev) => !prev)}
									className='transition-all duration-1000'
									style={{ transform: toggler ? 'rotate(540deg)' : '' }}
								>
									<ExpandArrow />
								</div>
							</div>
							<Menu
								mode='inline'
								className='px-3 mt-4 font-medium text-sm  transition-all duration-700'
								style={{ opacity: toggler ? 1 : 0, maxHeight: toggler ? '200px' : '0' }}
								items={userSettings}
								onClick={({ key }) => {
									if (key === '/login') {
										signOut(auth)
										navigate('/login')
									} else {
										navigate(key)
									}
								}}
							/>
						</div>
					) : (
						''
					)}
				</div>
				<Menu
					mode='inline'
					className='px-2 font-medium text-sm mt-4'
					onClick={({ key }) => {
						if (location.pathname === '/' + key) {
							return
						} else if (key === '/create') {
							setCreateDialog((prev) => !prev)
						} else {
							navigate(key)
						}
					}}
					defaultSelectedKeys={[location.pathname]}
					selectedKeys={[location.pathname]}
					items={items}
				/>
			</Sider>
			<Layout className='text-darkest lg:ml-[280px]'>
				<Content className='w-full bg-white border-l-[0.2px] border-neutral-300'>{children}</Content>
			</Layout>

			{CreateDialog ? <Create setOpen={setCreateDialog} open={CreateDialog} /> : ''}
		</Layout>
	)
}

export default Sidebar

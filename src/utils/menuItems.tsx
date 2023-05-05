import { MenuProps } from 'rc-menu'
import {
	HomeOutlined,
	CompassOutlined,
	VideoCameraOutlined,
	UsergroupAddOutlined,
	BellOutlined,
	MessageOutlined,
	TagOutlined,
	VideoCameraAddOutlined,
	PhoneOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons'

export type MenuItem = Required<MenuProps>['items'][number]

export default function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	disabled?: boolean
): MenuItem {
	return {
		key,
		icon,
		disabled,
		children,
		label,
	} as MenuItem
}

export const userSettings: MenuItem[] = [
	getItem('Settings', '', <SettingOutlined style={{ fontSize: '18px', marginRight: '13px' }} />, undefined, true),
	getItem('Logout', '/login', <LogoutOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
]

export const items: MenuItem[] = [
	getItem('Home', '/', <HomeOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
	getItem('Create', '/create', <VideoCameraAddOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),

	getItem('', '', <div className='my-1' />, undefined, true),

	getItem('Find Users', '/findUsers', <UsergroupAddOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
	getItem('Notifications', '/notificiations', <BellOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),

	getItem('', '', <div className='my-1' />, undefined, true),

	getItem('Messages', '/messages', <MessageOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
	getItem('Bookmarks', '/bookmarks', <TagOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
	getItem('Explore', '/explore', <CompassOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),

	getItem('', '', <div className='my-1' />, undefined, true),

	getItem('Help & Support', '/support', <PhoneOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
	getItem('Settings', '/settings', <SettingOutlined style={{ fontSize: '18px', marginRight: '13px' }} />),
]

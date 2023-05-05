import React, { ReactNode } from 'react'
import { Modal } from 'antd'

function Index({
	open,
	setOpen,
	stageOfCreation,
	children,
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: ReactNode
	stageOfCreation?: number
}) {
	const handleCancel = () => {
		console.log('Clicked cancel button')
		setOpen(false)
	}

	return (
		<Modal open={open} onCancel={handleCancel} closable={false} footer width={stageOfCreation === 3 ? 830 : 530} className='font-nekst'>
			{children}
		</Modal>
	)
}

export default Index

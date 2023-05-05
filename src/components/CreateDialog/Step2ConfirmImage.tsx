import { useEffect } from 'react'
import Modal from './Modal'
import ArrowLeft from '../../assets/svgs/ArrowLeft'

function Step2ConfirmImage({
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
	useEffect(() => {
		const preview = document.getElementById('file-preview') as HTMLImageElement
		if (preview) preview.src = imgPreview.src
	}, [imgPreview])

	const handleNavigateBack = () => {
		setStageOfCreation((prev) => prev - 1)
	}
	return (
		<Modal open={open} setOpen={setOpen}>
			<div className='flex justify-between pb-3 items-center'>
				<div className='cursor-pointer' onClick={handleNavigateBack}>
					<ArrowLeft />
				</div>
				<p className='font-bold text-base'>Confirm Image</p>

				<p className='text-[#0BA5E9] font-semibold cursor-pointer hover:text-[#63badf] transition-colors' onClick={() => setStageOfCreation(3)}>
					Next
				</p>
			</div>
			<div>
				<img id='file-preview' alt='preview file' className='w-full h-[65vh] object-cover' />
			</div>
		</Modal>
	)
}

export default Step2ConfirmImage

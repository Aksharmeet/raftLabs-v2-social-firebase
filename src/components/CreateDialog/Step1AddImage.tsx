import Modal from './Modal'

function Step1AddImage({
	open,
	setOpen,
	setStageOfCreation,
	setImgPreview,
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	setStageOfCreation: React.Dispatch<React.SetStateAction<number>>
	setImgPreview: React.Dispatch<
		React.SetStateAction<{
			src: string
			blob: File
		}>
	>
}) {
	const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			let src = URL.createObjectURL(e.target.files[0])

			setImgPreview({ src, blob: e.target.files[0] })
			setStageOfCreation(2)
		}
	}

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className=''>
				<div className='flex justify-center pb-3 border-gray-200 border-b '>
					<p className='font-bold text-base'>Create new post</p>
				</div>
				<div className='flex items-center justify-center w-full h-[60vh]'>
					<label htmlFor='dropzone-file' className='flex flex-col items-center justify-center rounded-lg cursor-pointer '>
						<div className='flex flex-col items-center justify-center pt-5 pb-6'>
							<div className='w-16 h-16 mb-4 opacity-70'>
								<svg version='1.0' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path
										d='M1150 4671c-73-23-125-57-183-120-58-62-92-132-107-221-8-46-10-460-8-1385l3-1320 22-58c43-115 139-214 250-258l58-24 1765-3c1290-2 1781 0 1825 8 165 32 303 171 335 335 8 43 10 429 8 1400l-3 1340-22 53c-32 80-97 158-166 203-115 74 38 69-1941 68-1675 0-1784-1-1836-18zm3639-217c66-33 107-93 116-168 3-28 5-482 3-1010l-3-958-473 551c-259 303-491 565-514 581-106 77-261 76-372-3-22-16-328-379-883-1046-2-3-81 72-176 167-202 201-227 216-352 216-146 1-138 6-632-487l-433-431v1227c0 1189 1 1229 19 1265 11 20 32 49 48 64 64 61-67 57 1849 58h1750l53-26zm-991-1182c13-9 268-303 567-652l544-635 1-143c0-79-5-164-12-190-16-64-86-134-150-150-61-16-3464-17-3519-2-20 6-51 20-69 33-71 48-100 12 435 547 322 322 498 491 515 495 15 3 40 1 56-5s121-103 234-215 218-209 234-215c67-25 64-28 567 575 309 371 479 567 497 574 33 12 69 6 100-17z'
										transform='matrix(.1 0 0 -.1 0 512)'
									/>
									<path
										d='M1790 4032c-73-24-125-59-183-121-155-166-149-420 14-584 246-246 659-111 719 234 24 136-26 275-134 377-84 78-148 104-271 109-68 2-104-1-145-15zm215-211c158-71 167-296 15-380-93-52-211-23-274 67-40 57-48 149-18 208 55 107 174 152 277 105zM478 3035c-16-9-33-32-42-57C398 2877 8 1400 3 1340c-14-168 88-343 240-413 29-13 308-93 622-177 314-83 1065-285 1670-447S3663 5 3696 3c158-14 333 85 404 227 32 64 200 679 200 732 0 45-38 94-79 103-36 8-96-16-111-45-9-17-190-670-190-686 0-3-19-25-41-49-31-34-55-49-96-61-62-18-54-19-318 52-110 29-857 229-1660 444-1578 422-1515 402-1562 484-46 83-51 56 182 924 118 441 215 814 215 828 0 16-13 39-34 60-38 38-81 44-128 19z'
										transform='matrix(.1 0 0 -.1 0 512)'
									/>
								</svg>
							</div>
							<p className='mb-2 text-xl text-gray-600  font-medium'>Drag photos and videos here</p>

							<div className='text-sm font-semibold bg-sky-500 text-white py-2 px-4 rounded-lg mt-2'>Select From Computer</div>
						</div>

						<input id='dropzone-file' accept='image/*' type='file' className='hidden' onChange={(e) => showPreview(e)} />
					</label>
				</div>
			</div>
		</Modal>
	)
}

export default Step1AddImage

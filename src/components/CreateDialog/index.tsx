import { useState } from 'react'
import Step1AddImage from './Step1AddImage'
import Step2ConfirmImage from './Step2ConfirmImage'
import Step3CreateNewPost from './Step3CreateNewPost'
import Step4Loading from './Step4Loading'

function Index({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
	const [stageOfCreation, setStageOfCreation] = useState(1)
	const [imgPreview, setImgPreview] = useState({ src: '', blob: new File([], '') })

	if (stageOfCreation === 1) {
		return <Step1AddImage setOpen={setOpen} open={open} setStageOfCreation={setStageOfCreation} setImgPreview={setImgPreview} />
	} else if (stageOfCreation === 2) {
		return <Step2ConfirmImage setOpen={setOpen} open={open} setStageOfCreation={setStageOfCreation} imgPreview={imgPreview} />
	} else if (stageOfCreation === 3) {
		return <Step3CreateNewPost setOpen={setOpen} open={open} setStageOfCreation={setStageOfCreation} imgPreview={imgPreview} />
	} else if (stageOfCreation === 4) {
		return <Step4Loading setOpen={setOpen} open={open} />
	} else {
		return <div></div>
	}
}

export default Index

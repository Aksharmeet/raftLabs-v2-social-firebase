import AnimatedLoader from '../../assets/svgs/AnimatedLoader'
import Modal from './Modal'

function Step4Loading({ setOpen, open }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; open: boolean }) {
	return (
		<Modal setOpen={setOpen} open={open}>
			<div className='h-[60vh] flex items-center justify-center text-xl'>
				<AnimatedLoader />
			</div>
		</Modal>
	)
}

export default Step4Loading

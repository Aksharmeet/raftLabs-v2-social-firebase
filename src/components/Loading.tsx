import LoadingAnimation from '../assets/svgs/LoadingAnimation'

function Loading() {
	return (
		<div className='h-screen w-screen flex flex-col justify-center'>
			<div className='flex justify-center items-center text-3xl gap-7'>
				<img
					src='https://uploads-ssl.webflow.com/60d5a97381523ace9d3c87bb/6447e9c71ae5fb1a8df86b1b_logo_1200w-p-500.png'
					alt='raftlabs logo'
					className='w-[10vh]'
				/>
				<p>RaftLabs</p>
			</div>
			<div className='flex justify-center mt-10'>
				<LoadingAnimation />
			</div>
		</div>
	)
}

export default Loading

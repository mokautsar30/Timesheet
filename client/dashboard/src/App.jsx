import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
	<div>
		<h1 className='flex flex-col justify-center items-center bg-black text-white'>
			this is app
		</h1>
	</div>
    </>
  )
}

export default App

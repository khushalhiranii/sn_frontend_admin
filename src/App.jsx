import { useState } from 'react'
import './App.css'
import SavingAccount from './pages/Saving-Account/SavingAccount'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SavingAccount/>
    </>
  )
}

export default App

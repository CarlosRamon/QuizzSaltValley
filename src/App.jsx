import { useState } from 'react'
import Quiz from './components/Quiz'
import Logo from './components/Logo'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <Logo />
      <Quiz />
    </div>
  )
}

export default App


import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TaskPage} from './pages/TaskPage'
import {TaskFormPage} from './pages/TaskFormPage'
import {Navigation} from './components/Navigation'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>

    <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="/tasks/:id" element={<TaskFormPage />} />
      <Route path="/task-create" element={<TaskFormPage />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
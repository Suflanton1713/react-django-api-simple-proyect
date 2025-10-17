import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { TaskPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { ProjectPage } from './pages/ProjectPage'
import { ProjectFormPage } from './pages/ProjectFormPage'
import { GraphQLPage } from './pages/GraphQLPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          
          {/* Tasks Routes */}
          <Route path="tasks" element={<TaskPage />} />
          <Route path="tasks/:id" element={<TaskFormPage />} />
          <Route path="task-create" element={<TaskFormPage />} />
          
          {/* Projects Routes */}
          <Route path="projects" element={<ProjectPage />} />
          <Route path="projects/:id" element={<ProjectFormPage />} />
          <Route path="project-create" element={<ProjectFormPage />} />
          
          {/* GraphQL Lab */}
          <Route path="graphql" element={<GraphQLPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
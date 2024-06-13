import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../shared/config/routes.ts'
import { NotFound } from '../pages/NotFound'
import { Layout } from './Layout'
import { Users } from '../pages/Users'
import { User } from '../pages/User'


export const App: React.FC = () => {


  return (
    <Routes>
      <Route index path={ROUTES.USERS.ROOT.path} element={<Layout><Users /></Layout>} />
      <Route index path={ROUTES.USERS.USER.createPath()} element={<Layout><User /></Layout>} />

      <Route
        path="/"
        element={ <Navigate to={ ROUTES.USERS.ROOT.path } /> }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

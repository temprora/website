import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './JoinOrCreate.css'

const JoinOrCreateHome = lazy(() => import('./Home/Home'))
const Join = lazy(() => import('./Join/Join'))
const Create = lazy(() => import('./Create/Create'))

export default function JoinOrCreate() {
  return (
    <div className="container container_content d_f_ce">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<JoinOrCreateHome />} />
          <Route path="join" element={<Join />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </Suspense>
    </div>
  )
}

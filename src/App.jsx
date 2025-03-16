import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Loading from './pages/Loading/Loading'
import Footer from './components/Footer/Footer'
import './style/App.css'

const Home = lazy(() => import('./pages/Home/Home'))
const JoinOrCreate = lazy(() => import('./pages/JoinOrCreate/JoinOrCreate'))
const Chat = lazy(() => import('./pages/Chat/Chat'))

function Layout({ children }) {
  const location = useLocation()
  const hideHeaderFooter = location.pathname === '/chat'

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join-or-create/*" element={<JoinOrCreate />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import supabase from './supabase-client'
import { Auth } from './components/Auth'
import { Dashboard } from './components/Dashboard';
import { Loading } from './components/Loading';

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userBalance, setUserBalance] = useState(0)
  const [hasShownInitialLoading, setHasShownInitialLoading] = useState(false)

  // Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await supabase.auth.getSession()
      setSession(currentSession.data.session)
      setLoading(false)
    }

    fetchSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Fetch balance when session is available
  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!session?.user?.email) return

      const { data, error } = await supabase
        .from('users')
        .select('balance')
        .eq('email', session.user.email)
        .single()

      if (error) {
        console.error('Error fetching user balance:', error)
      } else {
        console.log('User balance:', data.balance)
        setUserBalance(data.balance)
      }
    }

    fetchUserBalance()
  }, [session])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    if (loading && !hasShownInitialLoading) {
      setHasShownInitialLoading(true)
    }
  }, [loading])

  if (loading && !hasShownInitialLoading) {
    return <Loading />
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute session={session} requireAuth={true} path='/login'>
              <Dashboard userBalance={userBalance} session={session} logout={logout} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute session={session} path='/home'>
              <Auth />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

function ProtectedRoute({ session, path, requireAuth, children }) {
  const shouldRedirect = requireAuth ? !session : !!session
  if (shouldRedirect) {
    return <Navigate to={path} replace />
  }
  return children
}

export default App

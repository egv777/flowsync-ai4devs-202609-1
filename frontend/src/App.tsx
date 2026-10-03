import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { GuestOnly } from '@/components/guest-only'
import { RequireAuth } from '@/components/require-auth'
import { useAuth } from '@/lib/auth-context'
import { LoginPage } from '@/pages/login-page'
import { ProfilePage } from '@/pages/profile-page'
import { SignupPage } from '@/pages/signup-page'

function App() {
  const { token } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestOnly>
              <LoginPage />
            </GuestOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestOnly>
              <SignupPage />
            </GuestOnly>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to={token ? '/profile' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

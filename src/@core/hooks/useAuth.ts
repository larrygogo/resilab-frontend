import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/AuthContext'

export const useAuth = () => useContext(AuthContext)

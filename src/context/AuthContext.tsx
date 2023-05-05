import { User, onAuthStateChanged } from 'firebase/auth'
import { useState, createContext, useEffect, ReactNode } from 'react'
import { auth, db } from '../firebase'

import { UserData } from '../@types/UserData'
import { doc, getDoc } from 'firebase/firestore'

interface AuthData {
	currentUser: User | null
	userData: UserData | null
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>> | null
}
export const AuthContext = createContext<AuthData | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userData, setUserData] = useState<UserData | null>(null)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			const getUser = async () => {
				if (user?.uid) {
					const docRef = doc(db, 'users', user?.uid)
					const docSnap = await getDoc(docRef)

					setUserData(docSnap.data() as UserData)
				}
			}
			getUser()
		})

		return () => {
			unsub()
		}
	}, [])

	return <AuthContext.Provider value={{ currentUser, userData, setUserData }}>{children}</AuthContext.Provider>
}

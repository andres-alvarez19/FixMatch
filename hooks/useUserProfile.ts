import { useEffect, useState } from "react";
import api from "../api";

export interface Education {
  title: string
  institution: string
  period: string
}

export interface Resume {
  name: string
  url: string
  size: string
  date: string
}

export interface Certificate {
  name: string
  url: string
  size: string
  date: string
}

export interface UserProfile {
  fullName: string
  dateOfBirth: string
  email: string
  countryCode: string
  phoneNumber: string
  location: string
  profileImage: string
  rating: number
  projects: number
  aboutMe: string
  education: Education[]
  resume: Resume | null
  certificates: Certificate[]
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    api.get("/api/user/profile")
      .then(res => {
        console.log('Perfil obtenido:', res.data)
        // Asegurar que todos los campos tengan valores por defecto
        const profileData = {
          fullName: res.data.name || 'Usuario',
          dateOfBirth: res.data.dateOfBirth || '',
          email: res.data.email || '',
          countryCode: res.data.countryCode || '',
          phoneNumber: res.data.phoneNumber || '',
          location: res.data.location || 'Ubicación no especificada',
          profileImage: res.data.profileImage || 'https://via.placeholder.com/80',
          rating: res.data.rating || 0,
          projects: res.data.projects || 0,
          aboutMe: res.data.aboutMe || 'No hay información disponible sobre este usuario.',
          education: res.data.education || [],
          resume: res.data.resume || null,
          certificates: res.data.certificates || []
        }
        setProfile(profileData)
      })
      .catch(e => {
        console.error('Error obteniendo perfil:', e)
        setError(e.response?.data?.message || e.message || "Error al obtener el perfil")
        setProfile(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return { profile, loading, error }
} 
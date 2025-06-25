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
    api.get("/api/user/profile") // Ajusta el endpoint si es necesario
      .then(res => {
        setProfile(res.data)
      })
      .catch(e => {
        setError(e.message || "Error al obtener el perfil")
        setProfile(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return { profile, loading, error }
} 
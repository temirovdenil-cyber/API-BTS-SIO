'use client'
import { useState } from 'react'
import { Register } from '@/services/register'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    try {
      const { response } = await Register({ username: name, email, password })
      if (response.ok) {
        document.location.href = '/login'
      }
    } catch (error) {
      console.log('Erreur réseau', error)
    }
  }
  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-10">
        <div className="text-white font-bold text-xl">MY DIGITAL SCHOOL</div>
        <button className="text-white flex items-center gap-2">
          <span className="w-10 h-6 bg-indigo-500 rounded-full"></span>
          Retour a l'accueil
        </button>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-indigo-400 text-9xl opacity-30">💻</div>
      </div>
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-5xl font-bold text-white mb-2">Créer votre compte</h1>
        <p className="text-gray-400 mb-8">Tu cherches une école du digital en France ? Découvre les formations MyDigitalSchool dans nos 17 campus</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-2">Nom complet</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Entrez votre mail"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Créez un mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400"> 👁
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white text-sm mb-2">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirmez votre mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400">
                👁
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg mt-4">
            S'inscrire
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Déjà un compte ?{' '}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300">Se connecter</a>
        </p>
      </div>
    </div>
  )
}
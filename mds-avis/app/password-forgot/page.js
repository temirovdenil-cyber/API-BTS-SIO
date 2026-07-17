'use client'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      alert('Lien envoyé si l\'email existe !')
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-10">
        <div className="text-white font-bold text-xl">MY DIGITAL SCHOOL</div>
        <button className="text-white">Retour a l'accueil</button>
      </div>

      {/* Contenu */}
      <div className="flex w-full items-center">
        <div className="w-1/2 px-16">
          <h1 className="text-5xl font-bold text-white mb-4">Mot de passe oublié</h1>
          <p className="text-gray-400">Entrez votre mail et nous vous enverrons un lien pour réinitialisé votre mot de passe.</p>
        </div>

        <div className="w-1/2 flex justify-center">
          <div className="bg-[#1a1a2e] rounded-2xl p-8 w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Entrez votre mail"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a1a] text-white px-4 py-3 rounded-lg border border-indigo-500 focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg">
                Envoyer le lien
              </button>

              <div className="text-center">
                <a href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">
                  Retour à la connexion
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
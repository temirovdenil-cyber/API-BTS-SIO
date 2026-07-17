'use client'
import { useState, useEffect } from 'react'

export default function Avis() {
  const [avis, setAvis] = useState([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(5)
  const [page, setPage] = useState('liste')

  useEffect(() => {
    fetch('http://localhost:5000/avis')
      .then(res => res.json())
      .then(data => setAvis(data.reviews || []))
      .catch(err => console.error('Erreur:', err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:5000/add/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: titre,
          date: new Date().toISOString(),
          rating,
          description
        })
      })
      setPage('liste')
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#0d0d1f] flex flex-col justify-between py-8 px-6">
        <div>
          <div className="text-white font-bold text-lg mb-10">MY DIGITAL SCHOOL</div>
          <nav className="space-y-2">
            <button onClick={() => setPage('liste')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white ${page === 'liste' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/5'}`}>
              🏠 Accueil
            </button>
            <button onClick={() => setPage('liste')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white ${page === 'liste' ? '' : 'hover:bg-white/5'}`}>
              📬 Avis
            </button>
            <button onClick={() => setPage('deposer')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white ${page === 'deposer' ? 'bg-indigo-500 text-white' : 'hover:bg-white/5'}`}>
              ✏️ Déposer un avis
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 bg-[#1a1a2e] rounded-full px-4 py-2">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">👤</div>
          <div>
            <div className="text-white text-sm font-medium">Mon profil</div>
            <div className="text-gray-400 text-xs">Voir mon profil</div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 p-12">
        {page === 'liste' ? (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Les avis</h1>
            <p className="text-gray-400 mb-8">Découvrez les avis de nos étudiants</p>
            {avis.length === 0 ? (
              <p className="text-gray-400">Aucun avis pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {avis.map((a) => (
                  <div key={a.id} className="bg-[#1a1a2e] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{a.name}</span>
                      <span className="text-indigo-400">{'⭐'.repeat(a.rating)}</span>
                    </div>
                    <p className="text-gray-300">{a.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Laisser un avis</h1>
            <p className="text-gray-400 mb-8">Partagez votre expérience avec les autres.</p>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-white text-sm mb-2">Titre de l'avis</label>
                <input
                  type="text"
                  placeholder="Ex : service au top !"
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Votre avis</label>
                <textarea
                  placeholder="Décrivez votre expérience en détail..."
                  rows={8}
                  maxLength={1000}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#1a1a2e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <div className="text-right text-gray-400 text-sm">{description.length}/1000</div>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Votre note</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl ${star <= rating ? 'text-indigo-500' : 'text-gray-600'}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg">
                Publier mon avis
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
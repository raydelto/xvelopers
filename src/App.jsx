import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import XveloperCard from './components/XveloperCard.jsx';
import Footer from './components/Footer.jsx';
import { Loader2, SearchX } from 'lucide-react';

const FILTER_TAGS = [
  { id: 'all', label: 'Todos' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript / Web' },
  { id: 'dotnet', label: '.NET / Xamarin' },
  { id: 'games', label: 'Videojuegos' },
  { id: 'remote', label: 'Trabajo Remoto' },
  { id: 'community', label: 'Comunidades' },
];

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function App() {
  const [xvelopers, setXvelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Fetch developers from xvelopers.json
    fetch(`/xvelopers.json?v=${Date.now()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );
        setXvelopers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching xvelopers.json:', err);
        setError('No se pudo cargar la lista de Xvelopers.');
        setLoading(false);
      });
  }, []);

  // Filter developers based on search term and active category filter
  const filteredXvelopers = useMemo(() => {
    return xvelopers.filter((dev) => {
      const normName = normalizeText(dev.name);
      const normDesc = normalizeText(dev.description);
      const normQuery = normalizeText(searchTerm.trim());

      // Search match
      const matchesSearch = !normQuery || normName.includes(normQuery) || normDesc.includes(normQuery);

      if (!matchesSearch) return false;

      // Category chip match
      if (activeFilter === 'all') return true;
      if (activeFilter === 'python') return normDesc.includes('python');
      if (activeFilter === 'javascript') {
        return normDesc.includes('javascript') || normDesc.includes('react') || normDesc.includes('web');
      }
      if (activeFilter === 'dotnet') {
        return normDesc.includes('.net') || normDesc.includes('xamarin') || normDesc.includes('microsoft');
      }
      if (activeFilter === 'games') {
        return normDesc.includes('juego') || normDesc.includes('videojuego') || normDesc.includes('cocos2d');
      }
      if (activeFilter === 'remote') {
        return normDesc.includes('remoto') || normDesc.includes('weworkremotely');
      }
      if (activeFilter === 'community') {
        return (
          normDesc.includes('comunidad') ||
          normDesc.includes('organizador') ||
          normDesc.includes('coordina') ||
          normDesc.includes('hackathon') ||
          normDesc.includes('charlas')
        );
      }
      return true;
    });
  }, [xvelopers, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* Header Hero */}
        <Header />

        {/* Search & Filter Bar */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalCount={xvelopers.length}
          filteredCount={filteredXvelopers.length}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterTags={FILTER_TAGS}
        />

        {/* Main Grid Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <p className="text-sm font-medium">Cargando la lista de Xvelopers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-rose-400 bg-rose-950/20 border border-rose-900/40 rounded-2xl p-8 max-w-md mx-auto">
              <p className="font-medium mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-rose-300 underline underline-offset-2 hover:text-white"
              >
                Reintentar
              </button>
            </div>
          ) : filteredXvelopers.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
              <SearchX className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No se encontraron Xvelopers</h3>
              <p className="text-sm text-slate-400 mb-6">
                No hay resultados para "{searchTerm}". Intenta buscar con otros términos.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                Limpiar búsqueda y filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredXvelopers.map((dev) => (
                <XveloperCard key={dev.id} xveloper={dev} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

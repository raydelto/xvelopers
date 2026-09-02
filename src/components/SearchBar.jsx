import React from 'react';
import { Search, X, Users } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  totalCount,
  filteredCount,
  activeFilter,
  setActiveFilter,
  filterTags
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, tecnología, comunidad o palabra clave..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Count Badge */}
        <div className="flex items-center gap-2 self-center text-xs sm:text-sm text-slate-400 whitespace-nowrap px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-800">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>
            {filteredCount === totalCount ? (
              <>Mostrando <strong className="text-white">{totalCount}</strong> Xvelopers</>
            ) : (
              <><strong className="text-white">{filteredCount}</strong> de <strong className="text-slate-300">{totalCount}</strong> encontrados</>
            )}
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      {filterTags && filterTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 px-1">
          <span className="text-xs text-slate-400 font-medium mr-1">Filtros rápidos:</span>
          {filterTags.map((tag) => {
            const isActive = activeFilter === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveFilter(isActive ? 'all' : tag.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

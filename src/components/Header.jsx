import React from 'react';
import { Mic, FolderGit2, ExternalLink, Sparkles, Users } from 'lucide-react';

export default function Header() {
  return (
    <header className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
      {/* Community Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-6 shadow-inner">
        <span className="text-base leading-none">🇩🇴</span>
        <span>República Dominicana</span>
        <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
        <span className="text-indigo-200">Comunidad de Software</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          Xvelopers
        </span>
      </h1>

      {/* Subtitle / Definition */}
      <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
        Un <span className="font-semibold text-white">Xveloper</span> es un desarrollador que se ha destacado en la comunidad dominicana de desarrollo de software por <span className="text-indigo-400 font-medium">apoyar</span>, <span className="text-blue-400 font-medium">contribuir</span> e <span className="text-purple-400 font-medium">influir</span> en dicha comunidad.
      </p>

      {/* How to participate section */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-4xl mx-auto text-left shadow-xl shadow-black/20">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          ¿Cómo ser parte de Xvelopers?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mb-6">
          Tú también puedes ser un <strong className="text-slate-200">Xveloper</strong>. La comunidad crece gracias a la participación activa. Tienes dos formas principales:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Talks */}
          <div className="bg-slate-950/50 border border-slate-800/60 hover:border-indigo-500/40 transition-colors rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">
                  1. Impartiendo Charlas y Talleres
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Comparte tus conocimientos y experiencias con la comunidad de programadores.
              </p>
            </div>
            <a
              href="https://goo.gl/2nDvWC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/20 group"
            >
              <span>Llenar formulario para dar charla</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Option 2: Open Source */}
          <div className="bg-slate-950/50 border border-slate-800/60 hover:border-blue-500/40 transition-colors rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">
                  2. Colaborando en Open Source
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Participa en los proyectos de código abierto comunitarios:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="https://goo.gl/fbSqlj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 transition-colors"
              >
                <span>Emplea.do</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://goo.gl/0LR0U6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 transition-colors"
              >
                <span>Meta.do</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://goo.gl/7pg3Ie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 transition-colors"
              >
                <span>Streamelopers.org</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

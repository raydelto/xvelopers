import React from 'react';
import { Github, Heart, GitFork } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Credits */}
        <div className="text-sm text-slate-400">
          <p className="mb-1.5">
            &copy; 2019 – {currentYear}{' '}
            <span className="font-semibold text-slate-200">Xvelopers</span>. Proyecto original de{' '}
            <a
              href="https://torib.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2 transition-colors"
            >
              Enmanuel Toribio
            </a>
            , actualmente mantenido por{' '}
            <a
              href="https://www.raydelto.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2 transition-colors"
            >
              Raydelto Hernández
            </a>
            .
          </p>
          <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para la comunidad de desarrollo en República Dominicana.</span>
          </p>
        </div>

        {/* GitHub Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/raydelto/xvelopers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-sm font-medium transition-all shadow-sm group"
          >
            <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>Fork en GitHub</span>
            <GitFork className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors ml-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}

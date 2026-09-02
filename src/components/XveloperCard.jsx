import React, { useState } from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Instagram, 
  Globe, 
  ChevronDown, 
  ChevronUp,
  User
} from 'lucide-react';

function getIconComponent(iconStr, url) {
  const normalized = (iconStr || '').toLowerCase();
  const urlLower = (url || '').toLowerCase();

  if (normalized.includes('github') || urlLower.includes('github.com')) {
    return { Component: Github, label: 'GitHub', color: 'hover:text-white hover:bg-slate-800' };
  }
  if (normalized.includes('twitter') || urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return { Component: Twitter, label: 'Twitter / X', color: 'hover:text-sky-400 hover:bg-sky-500/10' };
  }
  if (normalized.includes('linkedin') || urlLower.includes('linkedin.com')) {
    return { Component: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:bg-blue-500/10' };
  }
  if (normalized.includes('youtube') || urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return { Component: Youtube, label: 'YouTube', color: 'hover:text-red-400 hover:bg-red-500/10' };
  }
  if (normalized.includes('facebook') || urlLower.includes('facebook.com')) {
    return { Component: Facebook, label: 'Facebook', color: 'hover:text-blue-500 hover:bg-blue-600/10' };
  }
  if (normalized.includes('instagram') || urlLower.includes('instagram.com')) {
    return { Component: Instagram, label: 'Instagram', color: 'hover:text-pink-400 hover:bg-pink-500/10' };
  }
  return { Component: Globe, label: 'Web', color: 'hover:text-indigo-400 hover:bg-indigo-500/10' };
}

// Convert HTML description to safely rendered links with modern styling
function formatDescription(rawHtml) {
  if (!rawHtml) return '';
  return rawHtml
    .replace(/<a\s+href=['"]([^'"]+)['"](?:\s+[^>]*)?>/gi, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2 transition-colors">');
}

function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, '');
}

export default function XveloperCard({ xveloper }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const rawDescription = xveloper.description || '';
  const textOnly = stripHtml(rawDescription);
  const isLong = textOnly.length > 115;

  // Format image source
  const imageSrc = xveloper.image
    ? (xveloper.image.startsWith('./') ? xveloper.image.substring(1) : xveloper.image)
    : null;

  return (
    <div 
      id={xveloper.id}
      className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-sm"
    >
      {/* Glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Top: Avatar & Name */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500/30 via-slate-800 to-blue-500/30 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300 shadow-lg shadow-black/40">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {imageSrc && !imageError ? (
                  <img
                    src={imageSrc}
                    alt={xveloper.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-indigo-400">
                    <User className="w-12 h-12 stroke-[1.5]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">
            {xveloper.name}
          </h3>

          {/* Description */}
          <div className="text-slate-300 text-sm leading-relaxed mb-4 text-center">
            {isLong && !expanded ? (
              <>
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: formatDescription(textOnly.substring(0, 95) + '...') 
                  }} 
                />
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-1 ml-1 px-2 py-1 -mx-1 rounded-md text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors focus:outline-none"
                >
                  <span>mostrar más</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: formatDescription(rawDescription) 
                  }} 
                />
                {isLong && (
                  <button
                    onClick={() => setExpanded(false)}
                    className="inline-flex items-center gap-1 ml-1 px-2 py-1 -mx-1 rounded-md text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors focus:outline-none"
                  >
                    <span>mostrar menos</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Social / Profile Links with minimum 40px touch targets */}
      {xveloper.links && xveloper.links.length > 0 && (
        <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 flex-wrap">
          {xveloper.links.map((link, idx) => {
            const { Component, label, color } = getIconComponent(link.icon, link.url);
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={`${label} de ${xveloper.name}`}
                className={`p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-800/50 text-slate-400 border border-slate-700/50 transition-all duration-200 active:scale-95 ${color}`}
              >
                <Component className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

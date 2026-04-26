'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

interface RadioPlayerProps {
  name: string;
  station: string;
  color: string;
}

export default function RadioPlayer({ name, station, color }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`flex items-center space-x-3 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group`}>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-slate-900 shadow-lg shadow-${color}/20 hover:scale-110 active:scale-95 transition-transform`}
      >
        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
      
      <div className="flex-1">
        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-tighter">{name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white truncate max-w-[100px]">{station}</p>
          {isPlaying && (
            <div className="flex space-x-0.5 items-end h-3">
              <div className="w-0.5 h-full bg-yellow-400 animate-pulse" />
              <div className="w-0.5 h-1/2 bg-yellow-400 animate-pulse delay-75" />
              <div className="w-0.5 h-3/4 bg-yellow-400 animate-pulse delay-150" />
            </div>
          )}
        </div>
      </div>
      
      <SpeakerWaveIcon className="w-4 h-4 text-white/20 group-hover:text-white/40" />
    </div>
  );
}

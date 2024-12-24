'use client';
import { useState } from 'react';
import { CharacterCard } from './charactercard';
import { CharacterDialog } from './characterdialog';
import { type Character } from '@/types';

export default function CharacterGrid({ 
  initialCharacters 
}: { 
  initialCharacters: Character[] 
}) {
  const [characters, setCharacters] = useState(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [favorites, setFavorites] = useState<Character[]>([]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onFavorite={(char) => {
              setFavorites(prev =>
                prev.find(f => f.id === char.id)
                  ? prev.filter(f => f.id !== char.id)
                  : [...prev, char]
              );
            }}
            onViewDetail={setSelectedCharacter}
            isFavorite={favorites.some(f => f.id === character.id)}
          />
        ))}
      </div>
      <CharacterDialog
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </>
  );
}
import { Suspense } from 'react';
import { getCharacters } from '@/libs/action';
import CharacterGrid from '@/components/ui/characters/charactergrid';
import AddCharacterButton from '@/components/ui/characters/addcharacterbutton';

export default async function HomePage() {
  const characters = await getCharacters();

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Star Wars Characters</h1>
        <AddCharacterButton />
      </div>
      <Suspense fallback={<div>Loading characters...</div>}>
        <CharacterGrid initialCharacters={characters} />
      </Suspense>
    </main>
  );
}
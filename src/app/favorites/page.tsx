import { getFavoriteCharacters } from '@/libs/action';
import CharacterGrid from '@/components/ui/characters/charactergrid';
import { Character } from '@/types';
import Link from 'next/link';

export default async function FavoritesPage() {
  const favorites: Character[] = await getFavoriteCharacters();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Favorite Characters</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No favorite characters yet.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
  Go back to all characters
</Link>
        </div>
      ) : (
        <CharacterGrid initialCharacters={favorites} />
      )}
    </div>
  );
}
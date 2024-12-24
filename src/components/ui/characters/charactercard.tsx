import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Home, Calendar, User, Palette, ArrowUp } from 'lucide-react';
import { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
  onFavorite: (character: Character) => void;
  onViewDetail: (character: Character) => void;
  isFavorite: boolean;
}

interface DetailRowProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onFavorite,
  onViewDetail,
  isFavorite,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-blue-600 font-semibold text-lg">{character.name}</h2>
        <Heart 
          className={`cursor-pointer ${isFavorite ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`}
          onClick={() => onFavorite(character)}
        />
      </div>
      <div className="space-y-2 text-sm">
        <DetailRow icon={<Home className="w-4 h-4" />} label="Home World:" value={character.homeWorld} />
        <DetailRow icon={<Calendar className="w-4 h-4" />} label="Birth Year:" value={character.birthYear} />
        <DetailRow icon={<User className="w-4 h-4" />} label="Gender:" value={character.gender} />
        <DetailRow icon={<Palette className="w-4 h-4" />} label="Hair Color:" value={character.hairColor} />
        <DetailRow label="Height:" value={character.height} />
        <DetailRow icon={<ArrowUp className="w-4 h-4" />} label="Mass:" value={character.mass} />
      </div>
      <Button 
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => onViewDetail(character)}
      >
        View Detail
      </Button>
    </div>
  );
};
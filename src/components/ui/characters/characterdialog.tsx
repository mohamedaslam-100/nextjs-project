import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Character } from '@/types';

interface CharacterDialogProps {
  character: Character | null;
  onClose: () => void;
}

interface DetailItemProps {
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div>
    <label className="font-semibold text-gray-600">{label}:</label>
    <p className="text-gray-900">{value}</p>
  </div>
);

export const CharacterDialog: React.FC<CharacterDialogProps> = ({ character, onClose }) => (
  <Dialog open={!!character} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-blue-600">
          {character?.name}
        </DialogTitle>
      </DialogHeader>
      {character && (
        <div className="grid grid-cols-2 gap-4 p-4">
          <DetailItem label="Home World" value={character.homeWorld} />
          <DetailItem label="Birth Year" value={character.birthYear} />
          <DetailItem label="Gender" value={character.gender} />
          <DetailItem label="Hair Color" value={character.hairColor} />
          <DetailItem label="Height" value={character.height} />
          <DetailItem label="Mass" value={character.mass} />
        </div>
      )}
    </DialogContent>
  </Dialog>
);
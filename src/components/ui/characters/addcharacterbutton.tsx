"use client"; // Add this directive at the top of the file

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Character } from '@/types';

const AddCharacterButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCharacter, setNewCharacter] = useState<Omit<Character, 'id'>>({
    name: '',
    homeWorld: '',
    birthYear: '',
    gender: '',
    hairColor: '',
    height: '',
    mass: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your character creation logic here
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white">
        Add New Character
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Character</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {(Object.keys(newCharacter) as Array<keyof typeof newCharacter>).map(field => (
                <Input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newCharacter[field]}
                  onChange={(e) => setNewCharacter({
                    ...newCharacter,
                    [field]: e.target.value
                  })}
                />
              ))}
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Add Character
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCharacterButton;

'use server';

import { Character } from '@/types';

// Simulating a database with an in-memory array
let characters: Character[] = [
  {
    id: 1,
    name: "Luke Skywalker",
    homeWorld: "Tatooine",
    birthYear: "19BBY",
    gender: "Male",
    hairColor: "Blond",
    height: "172",
    mass: "77"
  },
  {
    id: 2,
    name: "Leia Organa",
    homeWorld: "Alderaan",
    birthYear: "19BBY",
    gender: "Female",
    hairColor: "Brown",
    height: "150",
    mass: "49"
  },
  {
    id: 3,
    name: "Han Solo",
    homeWorld: "Corellia",
    birthYear: "29BBY",
    gender: "Male",
    hairColor: "Brown",
    height: "180",
    mass: "80"
  }
];

// Keep track of favorite character IDs
let favoriteCharacterIds = new Set<number>([1, 2]); // Example: Luke and Leia are favorites

export async function getCharacters(): Promise<Character[]> {
  try {
    // In a real application, you would fetch this from a database
    // For example: return await prisma.character.findMany();
    return [...characters];
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error('Failed to fetch characters');
  }
}

export async function getFavoriteCharacters(): Promise<Character[]> {
  try {
    // In a real application, you might fetch this from a user's preferences in the database
    return characters.filter(character => favoriteCharacterIds.has(character.id));
  } catch (error) {
    console.error('Error fetching favorite characters:', error);
    throw new Error('Failed to fetch favorite characters');
  }
}

export async function addCharacter(character: Omit<Character, 'id'>): Promise<Character> {
  try {
    // Validate the character data
    if (!character.name || !character.homeWorld) {
      throw new Error('Name and Home World are required fields');
    }

    // Create a new character with an ID
    const newCharacter: Character = {
      ...character,
      id: Math.max(...characters.map(c => c.id), 0) + 1 // Generate a new ID
    };

    // In a real application, you would save this to a database
    // For example: await prisma.character.create({ data: newCharacter });
    characters.push(newCharacter);

    return newCharacter;
  } catch (error) {
    console.error('Error adding character:', error);
    throw new Error('Failed to add character');
  }
}

export async function toggleFavorite(characterId: number): Promise<void> {
  try {
    if (favoriteCharacterIds.has(characterId)) {
      favoriteCharacterIds.delete(characterId);
    } else {
      favoriteCharacterIds.add(characterId);
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    throw new Error('Failed to toggle favorite status');
  }
}

export async function deleteCharacter(characterId: number): Promise<void> {
  try {
    // In a real application, you would delete this from a database
    // For example: await prisma.character.delete({ where: { id: characterId } });
    characters = characters.filter(character => character.id !== characterId);
    favoriteCharacterIds.delete(characterId);
  } catch (error) {
    console.error('Error deleting character:', error);
    throw new Error('Failed to delete character');
  }
}

export async function updateCharacter(characterId: number, updates: Partial<Omit<Character, 'id'>>): Promise<Character> {
  try {
    const characterIndex = characters.findIndex(c => c.id === characterId);
    if (characterIndex === -1) {
      throw new Error('Character not found');
    }

    // Update the character
    const updatedCharacter: Character = {
      ...characters[characterIndex],
      ...updates
    };

    // In a real application, you would update this in a database
    // For example: await prisma.character.update({ where: { id: characterId }, data: updates });
    characters[characterIndex] = updatedCharacter;

    return updatedCharacter;
  } catch (error) {
    console.error('Error updating character:', error);
    throw new Error('Failed to update character');
  }
}
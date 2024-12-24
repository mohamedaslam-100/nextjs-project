import { NextResponse } from 'next/server';
import type { Character } from '@/types';

const characters: Character[] = [
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
    name: "C-3PO",
    homeWorld: "Tatooine",
    birthYear: "112BBY",
    gender: "N/A",
    hairColor: "N/A",
    height: "167",
    mass: "75"
  },
  // Add more characters as needed
];


// For getting a single character
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json(characters);
  }

  const character = characters.find(char => char.id === parseInt(id));
  if (!character) {
    return NextResponse.json(
      { error: 'Character not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(character);
}

// For updating a character
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const index = characters.findIndex(char => char.id === body.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    characters[index] = { ...characters[index], ...body };
    return NextResponse.json(characters[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update character' },
      { status: 400 }
    );
  }
}

// For deleting a character
export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { error: 'Character ID is required' },
      { status: 400 }
    );
  }

  const index = characters.findIndex(char => char.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json(
      { error: 'Character not found' },
      { status: 404 }
    );
  }

  characters.splice(index, 1);
  return NextResponse.json({ success: true });
}
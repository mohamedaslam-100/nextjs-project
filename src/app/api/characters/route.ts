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
];

const getIdFromRequest = (request: Request): number | null => {
  const id = new URL(request.url).searchParams.get('id');
  return id ? parseInt(id) : null;
};

export async function GET(request: Request) {
  const id = getIdFromRequest(request);
  if (!id) {
    return NextResponse.json(characters);
  }

  const character = characters.find(char => char.id === id);
  if (!character) {
    return NextResponse.json(
      { error: `Character with ID ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(character);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const index = characters.findIndex(char => char.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { error: `Character with ID ${body.id} not found` },
        { status: 404 }
      );
    }

    characters[index] = { ...characters[index], ...body };
    return NextResponse.json(characters[index]);
  } catch (error) {
    console.error('Error updating character:', error);
    return NextResponse.json(
      { error: 'Failed to update character' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const id = getIdFromRequest(request);
  if (!id) {
    return NextResponse.json(
      { error: 'Character ID is required' },
      { status: 400 }
    );
  }

  const index = characters.findIndex(char => char.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: `Character with ID ${id} not found` },
      { status: 404 }
    );
  }

  characters.splice(index, 1);
  return NextResponse.json({ success: true, message: `Character with ID ${id} deleted` });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCharacter: Character = {
      id: characters.length + 1,
      ...body,
    };
    characters.push(newCharacter);
    return NextResponse.json(newCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    return NextResponse.json(
      { error: 'Failed to create character' },
      { status: 400 }
    );
  }
}

'use client'

import { useState } from "react"
import { Heart, Home, Calendar, User, Palette, ArrowUp, Trash2 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

interface Character {
  id: number
  name: string
  homeWorld: string
  birthYear: string
  gender: string
  hairColor: string
  height: string
  mass: string
  image: string
}

export default function StarWarsApp() {
  const [currentPage, setCurrentPage] = useState(1)
  const charactersPerPage = 9
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: "Luke Skywalker",
      homeWorld: "Tatooine",
      birthYear: "19BBY",
      gender: "Male",
      hairColor: "Blond",
      height: "172",
      mass: "77",
      image: "/luke-skywalker.jpg?height=300&width=300"
    },
    {
      id: 2,
      name: "C-3PO",
      homeWorld: "Tatooine",
      birthYear: "112BBY",
      gender: "N/A",
      hairColor: "N/A",
      height: "167",
      mass: "75",
      image: "/c3po.jpeg?height=300&width=300"
    },
    {
      id: 3,
      name: "R2-D2",
      homeWorld: "Naboo",
      birthYear: "33BBY",
      gender: "N/A",
      hairColor: "N/A",
      height: "96",
      mass: "32",
      image: "/r2d2.jpg?height=300&width=300"
    },
    {
      id: 4,
      name: "Darth Vader",
      homeWorld: "Tatooine",
      birthYear: "41.9BBY",
      gender: "Male",
      hairColor: "None",
      height: "202",
      mass: "136",
      image: "/Darth vader.jpeg?height=300&width=300"
    },
    {
      id: 5,
      name: "Leia Organa",
      homeWorld: "Alderaan",
      birthYear: "19BBY",
      gender: "Female",
      hairColor: "Brown",
      height: "150",
      mass: "49",
      image: "/Leia Organa.png?height=300&width=300"
    },
    {
      id: 6,
      name: "Owen Lars",
      homeWorld: "Tatooine",
      birthYear: "52BBY",
      gender: "Male",
      hairColor: "Brown, grey",
      height: "178",
      mass: "120",
      image: "/Owen Lars.jpeg?height=300&width=300"
    },
    {
      id: 7,
      name: "Beru Whitesun lars",
      homeWorld: "Tatooine",
      birthYear: "47BBY",
      gender: "Female",
      hairColor: "Brown",
      height: "165",
      mass: "75",
      image: "/Beru Whitesun lars.jpg?height=300&width=300"
    },
    {
      id: 8,
      name: "R5-D4",
      homeWorld: "Tatooine",
      birthYear: "unknown",
      gender: "N/A",
      hairColor: "N/A",
      height: "97",
      mass: "32",
      image: "/R5-D4.jpeg?height=300&width=300"
    },
    {
      id: 9,
      name: "Biggs Darklighter",
      homeWorld: "Tatooine",
      birthYear: "24BBY",
      gender: "Male",
      hairColor: "Black",
      height: "183",
      mass: "84",
      image: "/Biggs Darklighter.jpeg?height=300&width=300"
    },
    {
      id: 10,
      name: "Obi-Wan Kenobi",
      homeWorld: "Stewjon",
      birthYear: "57BBY",
      gender: "Male",
      hairColor: "Auburn, white",
      height: "182",
      mass: "77",
      image: "/Obi-Wan Kenobi.jpeg?height=300&width=300"
    }
  ])

  const [favorites, setFavorites] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)
  const [isNewCharacterOpen, setIsNewCharacterOpen] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [newCharacter, setNewCharacter] = useState<Omit<Character, "id" | "image">>({
    name: "",
    homeWorld: "",
    birthYear: "",
    gender: "",
    hairColor: "",
    height: "",
    mass: ""
  })

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === character.id)
        ? prev.filter((f) => f.id !== character.id)
        : [...prev, character]
    )
  }

  const handleEdit = (character: Character) => {
    setEditingCharacter({ ...character })
    setIsEditMode(true)
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCharacter) return

    setCharacters((prev) =>
      prev.map((char) =>
        char.id === editingCharacter.id ? editingCharacter : char
      )
    )

    // Also update the selected character if it's currently being viewed
    if (selectedCharacter?.id === editingCharacter.id) {
      setSelectedCharacter(editingCharacter)
    }

    // Update favorites if the edited character is in favorites
    setFavorites((prev) =>
      prev.map((char) =>
        char.id === editingCharacter.id ? editingCharacter : char
      )
    )

    setIsEditMode(false)
    setEditingCharacter(null)
  }

  const handleViewDetail = (character: Character) => {
    setSelectedCharacter(character)
    setIsDetailOpen(true)
  }

  const addNewCharacter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const character = { ...newCharacter, id: Date.now(), image: "/placeholder.svg?height=300&width=300" }
    setCharacters((prev) => [...prev, character])
    setIsNewCharacterOpen(false)
    setNewCharacter({
      name: "",
      homeWorld: "",
      birthYear: "",
      gender: "",
      hairColor: "",
      height: "",
      mass: ""
    })
  }

  const handleDelete = (id: number) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id))
    setFavorites((prev) => prev.filter((char) => char.id !== id))
  }

  // Calculate pagination
  const displayedCharacters = showFavorites ? favorites : characters
  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = displayedCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)
  const totalPages = Math.ceil(displayedCharacters.length / charactersPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              src="/star.jpeg"
              alt="Star Wars Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <nav>
        <Link href="/" className="text-white font-bold text-lg sm:text-2xl">
          STAR WARS
        </Link>
      </nav>
            </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? "All Characters" : "Favorites"}
            </Button>
            <Heart
              className={`cursor-pointer w-6 h-6 sm:w-8 sm:h-8 ${
                showFavorites ? "fill-white text-white" : "text-white"
              }`}
              onClick={() => setShowFavorites(!showFavorites)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            {showFavorites ? "Favorite Characters" : "Star Wars Characters"}
          </h1>
          {!showFavorites && (
            <Button
              onClick={() => setIsNewCharacterOpen(true)}
              className="bg-blue-600 text-white w-full sm:w-auto"
            >
              Add New Character
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentCharacters.map((character) => (
            <Card key={character.id} className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-blue-600 font-semibold text-lg">
                  {character.name}
                </h2>
                <Heart
                  className={`cursor-pointer w-6 h-6 ${
                    favorites.some((f) => f.id === character.id)
                      ? "fill-blue-600 text-blue-600"
                      : "text-gray-400"
                  }`}
                  onClick={() => toggleFavorite(character)}
                />
              </div>
              <div className="mb-4">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600">Home World:</span>
                  <span className="text-gray-900">{character.homeWorld}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600">Birth Year:</span>
                  <span className="text-gray-900">{character.birthYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600">Gender:</span>
                  <span className="text-gray-900">{character.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600">Hair Color:</span>
                  <span className="text-gray-900">{character.hairColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-600">Height:</span>
                  <span className="text-gray-900">{character.height}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Mass:</span>
                  <span className="text-gray-900">{character.mass}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleViewDetail(character)}
                >
                  View Detail
                </Button>
                <Button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => handleEdit(character)}
                >
                  Edit
                </Button>
                <Button
                  className="flex-none bg-red-600 hover:bg-red-700 text-white p-2"
                  onClick={() => handleDelete(character.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between mt-6 mb-8">
          <Button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </Button>
        </div>
      </main>

      <Dialog open={isDetailOpen} onOpenChange={() => setIsDetailOpen(false)}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600">
              {selectedCharacter?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedCharacter && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="col-span-1 sm:col-span-2">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-600">Home World:</label>
                <p className="text-gray-900">{selectedCharacter.homeWorld}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-600">Birth Year:</label>
                <p className="text-gray-900">{selectedCharacter.birthYear}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-600">Gender:</label>
                <p className="text-gray-900">{selectedCharacter.gender}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-600">Hair Color:</label>
                <p className="text-gray-900">{selectedCharacter.hairColor}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-600">Height:</label>
                <p className="text-gray-900">{selectedCharacter.height}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-600">Mass:</label>
                <p className="text-gray-900">{selectedCharacter.mass}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditMode} onOpenChange={() => setIsEditMode(false)}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Character</DialogTitle>
          </DialogHeader>
          {editingCharacter && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                {(Object.keys(editingCharacter) as Array<keyof Character>)
                  .filter((key) => key !== "id" && key !== "image")
                  .map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </label>
                      <Input
                        value={editingCharacter[field]}
                        onChange={(e) =>
                          setEditingCharacter({
                            ...editingCharacter,
                            [field]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white">
                Save Changes
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewCharacterOpen} onOpenChange={() => setIsNewCharacterOpen(false)}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Character</DialogTitle>
          </DialogHeader>
          <form onSubmit={addNewCharacter} className="space-y-4">
            <div className="space-y-2">
              {(Object.keys(newCharacter) as Array<keyof typeof newCharacter>).map(
                (field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <Input
                      value={newCharacter[field]}
                      onChange={(e) =>
                        setNewCharacter((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                    />
                  </div>
                )
              )}
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Add Character
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <footer className="bg-blue-600 p-4 mt-8">
        <div className="container mx-auto text-center text-white text-sm sm:text-base">
          © 2024 Star Wars App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


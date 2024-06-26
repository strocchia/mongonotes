"use client";

import { useEffect, useState } from "react";

import { Note } from "@/lib/Note";

import "flowbite";
import NotesGrid from "@/components/NotesGrid";
import ExampleSide from "@/components/ExampleSide";
import NoteModal from "@/components/NoteModal";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [editingContent, setEditingContent] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedColor(null);
    setEditingContent("");
    setEditingId(null);
  };

  async function getNotes() {
    const resp = await fetch("/api/mongo");
    const notes = await resp.json();
    setNotes(notes);
  }

  useEffect(() => {
    getNotes();
  }, []);

  const filterByColor = async (color: string) => {
    const resp = await fetch(`/api/mongo/${color}`);
    const blah = await resp.json();

    if (color === "") {
      getNotes();
    } else {
      setNotes(blah);
    }
  };

  return (
    <>
      <main>
        <div className="container flex max-w-screen-2xl">
          <div className="flex">
            <ExampleSide
              notes={notes}
              setNotes={setNotes}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              openModal={openModal}
            />
          </div>
          <div className="flex-1 mr-3">
            <NotesGrid
              notes={notes}
              selectedColor={selectedColor}
              editingContent={editingContent}
              editingId={editingId}
              setEditingContent={setEditingContent}
              setEditingId={setEditingId}
              openModal={openModal}
              filterByColor={filterByColor}
            />
          </div>
          {modalOpen && (
            <div>
              {/* Note Modal */}
              <NoteModal
                notes={notes}
                setNotes={setNotes}
                selectedColor={selectedColor}
                editingId={editingId}
                editingContent={editingContent}
                setEditingContent={setEditingContent}
                onClose={closeModal}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

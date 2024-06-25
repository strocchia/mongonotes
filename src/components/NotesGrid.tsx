import { Note } from "@/lib/Note";
import { useState } from "react";
import NoteComponent from "./NoteComponent";
import TimestampButton from "./TimestampButton";
import HeaderNav from "./HeaderNav";
import { useSession } from "next-auth/react";

function NotesGrid({
  notes,
  selectedColor,
  editingContent,
  setEditingContent,
  editingId,
  setEditingId,
  openModal,
  filterByColor,
}: {
  notes: Note[];
  selectedColor: string | null;
  editingContent: string;
  setEditingContent: (content: string) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  openModal: () => void;
  filterByColor: (color: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useSession();

  const newNoteModal = () => {
    setEditingContent("");
    setEditingId(null);
    setIsEditing(true);
  };

  const openEditModal = (note: Note) => {
    if (note.userId !== data?.user?.id) {
      alert("You cannot edit someone else's note!");
      return;
    }

    setEditingContent(note.content);
    setEditingId(note.id);
    setIsEditing(true);
    openModal();
  };

  const closeEditModal = () => {
    setEditingContent("");
    setEditingId(null);
    setIsEditing(false);
  };

  const session = useSession();

  return (
    <div>
      <HeaderNav filterByColor={filterByColor} />
      {session.data?.user && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {notes.map((nt: Note) => (
            <div key={nt.id}>
              <div
                className="flex flex-col h-[300px] max-w-full justify-between rounded-md"
                style={{
                  backgroundColor: nt.color,
                }}
              >
                {/* Note component */}
                <NoteComponent note={nt} />
                {/* Timestamp button */}
                <TimestampButton
                  note={nt}
                  onClick={openEditModal}
                  closeNoteEditModal={closeEditModal}
                  timestamp={nt.timestamp}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesGrid;

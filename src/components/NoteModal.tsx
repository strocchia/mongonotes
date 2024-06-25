"use client";

import { colors } from "@/lib/Colors";
import { Note } from "@/lib/Note";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button, Label, Modal, Radio, Textarea } from "flowbite-react";
import clientPromise from "@/lib/db";

type Props = {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  //   selectedColor?: string;
  selectedColor: string | null;
  editingContent: string;
  setEditingContent: (content: string) => void;
  //   editingId?: number;
  editingId: number | null;
  onClose: () => void;
};

function NoteModal({
  notes,
  setNotes,
  selectedColor,
  editingContent,
  setEditingContent,
  editingId,
  onClose,
}: Props) {
  const [radioColor, setRadioColor] = useState<string>(
    selectedColor || notes.find((note) => note.id === editingId)?.color || ""
  );
  const [content, setContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = notes.find((note) => note.id === editingId)?.userId;

  useEffect(() => {
    setContent("");
    if (editingId) {
      setContent(editingContent);
    }
  }, [editingId, editingContent]);

  const handleSave = async () => {
    console.log(
      notes,
      // setNotes,
      selectedColor,
      editingContent,
      // setEditingContent,
      editingId
      // onClose
    );

    const colorToSave = selectedColor ?? "";

    if (editingId) {
      const updatedNote = {
        editingId,
        content: content,
        color: radioColor!,
        timestamp: new Date(),
        userId,
      };

      const blah = await fetch("/api/mongo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      console.log("blah", blah);

      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? {
                ...note,
                content: updatedNote.content,
                color: updatedNote.color,
                timestamp: updatedNote.timestamp,
              }
            : note
        )
      );

      setContent("");
      setRadioColor(selectedColor || "");

      onClose();
    } else {
      const newNote = {
        id: Date.now(),
        content: content,
        color: radioColor,
        timestamp: new Date(),
      };

      const blah = await fetch("/api/mongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      console.log(blah);

      setNotes((prev) => [...prev, newNote]);

      setContent("");
      setRadioColor(selectedColor || "");

      onClose();
    }
  };

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={true} onClose={onClose}>
        <div className="flex flex-col gap-4 m-4">
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <Label
                  htmlFor="note"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Note
                </Label>
                <Textarea
                  name="note"
                  id="note"
                  className="text-sm text-gray-900 bg-gray-50"
                  rows={5}
                  value={content}
                  onChange={(evt) => setContent(evt.target.value)}
                  placeholder="Note here..."
                ></Textarea>
              </div>
              {colors.map((clr, idx) => (
                <div className="flex items-center gap-2">
                  <Radio
                    id={`default-radio-${idx}`}
                    name={`default-radio-${idx}`}
                    value={clr.hashcode}
                    checked={clr.hashcode === radioColor}
                    onChange={(e) => setRadioColor(e.target.value)}
                  />
                  <Label htmlFor={`default-radio-${idx}`}>{clr.name}</Label>
                </div>
              ))}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="text-gray-900 bg-primary-700 hover:text-gray-200 hover:bg-green-500 px-2"
              onClick={handleSave}
            >
              Submit
            </Button>
            <Button
              className="text-gray-900 bg-transparent  hover:text-gray-900 hover:bg-gray-200 px-2"
              onClick={onClose}
            >
              Decline
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );

  //   return (
  //     <div
  //       id="noteModal"
  //       className="flex justify-center items-center fixed top-0 right-0 left-0 z-50 w-full h-screen backdrop-blur-sm"
  //     >
  //       <form>
  //         <div className="mb-4">
  //           <label htmlFor="note" className="block mb-2 text-sm font-medium">
  //             Note
  //           </label>
  //           <textarea
  //             name="note"
  //             id="note"
  //             className="w-full text-sm text-gray-900 bg-gray-50"
  //             rows={5}
  //             value={content}
  //             onChange={(evt) => setContent(evt.target.value)}
  //             placeholder="Note here..."
  //           ></textarea>
  //         </div>
  //         <div className="flex justify-end">
  //           {/* <button
  //             id="dropdownRadio"
  //             type="button"
  //             className="text-white bg-blue-700 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
  //             onClick={() => setShowDropdown(!showDropdown)}
  //           >
  //             Color category
  //           </button> */}
  //           <div>
  //             <ul>
  //               {colors.map((clr, idx) => (
  //                 <li key={idx}>
  //                   <div className="flex items-center p-1">
  //                     <input
  //                       type="radio"
  //                       name="default-radio"
  //                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
  //                       value={clr.hashcode}
  //                       checked={clr.hashcode === radioColor}
  //                       onChange={(e) => setRadioColor(e.target.value)}
  //                     />
  //                     <label
  //                       htmlFor="default-radio-4"
  //                       className="w-full m-2 text-sm font-medium"
  //                     >
  //                       {clr.name}
  //                     </label>
  //                   </div>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   );
}

export default NoteModal;

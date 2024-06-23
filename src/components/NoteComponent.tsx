import { Note } from "@/lib/Note";
import { CSSProperties } from "react";

export default function NoteComponent({ note }: { note: Note }) {
  const clampStyle: CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    marginLeft: 20,
    marginRight: 20,
  };

  const overflowStyle: CSSProperties = {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div>
      <div style={{ ...clampStyle, ...overflowStyle }}>{note.content}</div>
    </div>
  );
}

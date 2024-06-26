import { Note } from "@/lib/Note";

type Props = {
  onClick: (note: Note) => void;
  timestamp: Date;
  note: Note;
  closeNoteEditModal: () => void;
};

const TimestampButton: React.FC<Props> = ({
  onClick,
  timestamp,
  note,
  closeNoteEditModal,
}) => {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <p className="ml-2.5">{new Date(timestamp).toLocaleString()}</p>
      <button
        className="mr-0 inline-flex items-center justify-center w-8 h-8"
        type="button"
        onClick={() => onClick(note)}
      >
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          // height="1em"
          // width="1em"
          className="w-20 h-20"
          strokeWidth="1.2"
          stroke="black"
        >
          <path d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 015 12.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.468-.325z" />
        </svg>
      </button>
    </div>
  );
};

export default TimestampButton;

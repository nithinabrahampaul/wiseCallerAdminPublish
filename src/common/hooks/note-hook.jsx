import { useContext } from "react";
import { NoteContext } from "../contexts/note-context";

export const useNote = () => useContext(NoteContext);

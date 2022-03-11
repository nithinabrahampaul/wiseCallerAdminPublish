import React, { useState, createContext, useCallback } from "react";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import { GET_ALL_NOTES, UPDATE_NOTES } from "../apis/api-urls";
import { useLoader } from "../hooks";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const { setLoading } = useLoader();

  const getAllNotes = useCallback(
    async (params) => {
      try {
        setUpdated(false);
        setLoading(true);
        let result = await executePostApi(GET_ALL_NOTES, params);
        if (result?.data?.success) {
          setNotes(result.data.data);
        } else {
          toast.error(result.data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onUpdateNotes = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(UPDATE_NOTES, values);
        if (result?.data?.success) {
          setUpdated(true);
          toast.success("Notes updated successfully");
        } else {
          toast.error(result.data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  let value = {
    notes,
    isUpdated,
    getAllNotes: useCallback(
      (params) => {
        getAllNotes(params);
      },
      [getAllNotes]
    ),
    onUpdateNotes: useCallback(
      (values) => {
        onUpdateNotes(values);
      },
      [onUpdateNotes]
    ),
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

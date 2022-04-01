import React, { createContext, useCallback } from "react";
import { toast } from "react-toastify";
import { executePostApi } from "../apis";
import { SEND_CUSTOM_NOTIFICATION } from "../apis/api-urls";
import { useLoader } from "../hooks";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const { setLoading } = useLoader();
  const onSendCustomNotification = useCallback(
    async (values) => {
      try {
        setLoading(true);
        let result = await executePostApi(SEND_CUSTOM_NOTIFICATION, values);
        if (result.data?.success) {
          setLoading(false);
          toast.success("Notification send successfully");
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        setLoading(true);
      }
    },
    [setLoading]
  );

  let values = {
    onSendCustomNotification: useCallback(
      (values) => {
        onSendCustomNotification(values);
      },
      [onSendCustomNotification]
    ),
  };
  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};

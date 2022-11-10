import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { GET_ALL_TEMPLATE, UPDATE_TEMPLATE } from "../apis/api-urls";
import { executePostFormApi, executePostApi } from "../apis/base-api";
import { useLoader } from "../hooks";

export const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [isRefetched, setRefetched] = useState(false);
  const { setLoading } = useLoader();

  const getAlTemplates = useCallback(
    async (params) => {
      try {
        setLoading(true);
        let result = await executePostApi(GET_ALL_TEMPLATE, params);

        if (result?.data?.success) {
          setTemplates(result.data.data);
        } else {
          toast.error(result?.data?.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const onCreateTemplate = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (key === "template") {
            if (value) {
              formData.set(key, value[0]);
            }
          } else formData.set(key, value);
        }

        let { data } = await executePostFormApi(UPDATE_TEMPLATE, formData);
        if (data?.success) {
          setRefetched(true);
          toast.success("Templte created successfully");
          setLoading(false);
        }
      } catch (error) {}
    },
    [setLoading]
  );

  const onUpdateTemplate = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (key === "template") {
            if (value) {
              formData.set(key, value[0]);
            }
          } else formData.set(key, value);
        }

        let { data } = await executePostFormApi(UPDATE_TEMPLATE, formData);
        if (data?.success) {
          setRefetched(true);
          toast.success("Templte updated successfully");
          setLoading(false);
        }
      } catch (error) {}
    },
    [setLoading]
  );

  const onDeleteTemplate = useCallback(
    async (values) => {
      try {
        setRefetched(false);
        setLoading(true);
        let { data } = await executePostApi(UPDATE_TEMPLATE, {
          ...values,
          deleted: true,
        });
        if (data?.success) {
          setRefetched(true);
        }
      } catch (error) {}
    },
    [setLoading]
  );

  let value = {
    templates,
    isRefetched,
    onCreateTemplate: useCallback(
      async (values) => {
        return await onCreateTemplate(values);
      },
      [onCreateTemplate]
    ),
    onUpdateTemplate: useCallback(
      async (values) => {
        return await onUpdateTemplate(values);
      },
      [onUpdateTemplate]
    ),
    getAlTemplates: useCallback(
      async (params) => {
        await getAlTemplates(params);
      },
      [getAlTemplates]
    ),
    onDeleteTemplate: useCallback(
      async (values) => {
        return onDeleteTemplate(values);
      },
      [onDeleteTemplate]
    ),
  };
  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

import api from "./api";

export const addEducation = async (formData) => {
  const response = await api.post(
    "/Education/AddEducation",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


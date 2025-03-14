import axios from "axios";

const URL = "http://127.0.0.1:8000/api/";

const postFetcher = async function (url, { arg }) {
  const data = !arg?.phone
    ? arg
    : {
        ...arg,
        phone: arg?.phone.replace(/\D/g, "").replaceAll(" ", ""),
      };

  try {
    const response = await axios.post(`${URL}${url}`, data, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.error;
  }
};

const patchFetcher = async function (url, { arg }) {
  try {
    const response = await axios.patch(`${URL}${url}`, arg, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const putFetcher = async function (url, { arg }) {
  try {
    const response = await axios.put(`${URL}${url}`, arg, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const putFileFetcher = async function (url, { arg }) {
  try {
    const response = await axios.put(`${URL}${url}`, arg, {
      withCredentials: true,

      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const deleteFetcher = async function (url) {
  try {
    const response = await axios.delete(`${URL}${url}`, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const deleteDataFetcher = async function (url, { arg }) {
  console.log(arg);
  try {
    const response = await axios.delete(`${URL}${url}`, arg, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const getFetcher = async function (url) {
  try {
    const response = await axios.get(`${URL}${url}`, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export {
  postFetcher,
  getFetcher,
  patchFetcher,
  deleteFetcher,
  putFetcher,
  putFileFetcher,
  deleteDataFetcher,
};

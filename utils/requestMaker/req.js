import { ToastContainer, toast, Bounce } from "react-toastify";

const toastSettins = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

async function makeRequest(url, method, body) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const fetchData = async (url, setState) => {
  try {
    const res = await makeRequest(url, "GET", {});
    setState(res);
  } catch (error) {
    console.error("Error fetching unbooked transactions:", error);
  }
};

function handleRequest(method, url, data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        toast.error("Something went wrong", {
          position: "top-right",
        });

        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.message, {
        position: "top-right",
      });

      console.log("Request successful:", data);
      return data;
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-right",
      });

      console.error("Request error:", error);
      throw error;
    });
}

export { makeRequest, fetchData, handleRequest };

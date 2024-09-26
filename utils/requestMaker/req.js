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
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle successful response
      console.log("Request successful:", data);
      return data;
    })
    .catch((error) => {
      // Handle error
      console.error("Request error:", error);
      throw error;
    });
}

export { makeRequest, fetchData, handleRequest };

// // Example usage:
// handleRequest("GET", "https://api.example.com/data")
//   .then((data) => {
//     // Process the retrieved data
//     console.log("Retrieved data:", data);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error("Error fetching data:", error);
//   });

// // ... similar usage for POST, PUT, and DELETE requests

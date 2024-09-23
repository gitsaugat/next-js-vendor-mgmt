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

export { makeRequest, fetchData };

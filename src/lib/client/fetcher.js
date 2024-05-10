const fetcher = async (url) => {
  const response = await fetch(url);

  // Check if the response is ok and the content type is JSON
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Non-JSON response received');
  }

  return response.json();
};

export default fetcher;

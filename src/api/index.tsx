export const fetchTasks = async () => {
  const response = await fetch('http://localhost:3001/todos');

  if (!response.ok) {
    throw new Error(`HTTP Error! status: ${response.status}`);
  }

  return response.json();
};

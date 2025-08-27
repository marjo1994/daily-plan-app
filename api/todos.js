const BIN_ID = '68accf96ae596e708fd5c01e';
const MASTER_KEY =
  '$2a$10$TZSBh4LblnE7rgs.yRLL9ecUJjhqHQiDMP72tdIyXhkR98AjJBMcG';
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        const getResponse = await fetch(BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
          },
        });

        if (!getResponse.ok) {
          throw new Error(`HTTP error! status: ${getResponse.status}`);
        }

        const data = await getResponse.json();
        res.status(200).json(data);
        break;

      case 'POST':
        const { todo, currentTodos } = req.body;

        const newTodo = {
          ...todo,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const updatedTodos = [...currentTodos, newTodo];

        const postResponse = await fetch(BASE_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
          },
          body: JSON.stringify(updatedTodos),
        });

        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        res.status(200).json(newTodo);
        break;

      case 'PUT':
        const { updatedTodo, currentTodos: existingTodos } = req.body;

        const putUpdatedTodos = existingTodos.map(todo =>
          todo.id === updatedTodo.id
            ? { ...updatedTodo, updatedAt: new Date().toISOString() }
            : todo
        );

        const putResponse = await fetch(BASE_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
          },
          body: JSON.stringify(putUpdatedTodos),
        });

        if (!putResponse.ok) {
          throw new Error(`HTTP error! status: ${putResponse.status}`);
        }

        res.status(200).json(updatedTodo);
        break;

      case 'DELETE':
        const { todoId, currentTodos: todosToFilter } = req.body;

        // Filter out the todo to delete
        const filteredTodos = todosToFilter.filter(todo => todo.id !== todoId);

        const deleteResponse = await fetch(BASE_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
          },
          body: JSON.stringify(filteredTodos),
        });

        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! status: ${deleteResponse.status}`);
        }

        res
          .status(200)
          .json({ message: 'Todo deleted successfully', deletedId: todoId });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}

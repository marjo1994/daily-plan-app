const BIN_ID = '68accf96ae596e708fd5c01e';
const MASTER_KEY =
  '$2a$10$TZSBh4LblnE7rgs.yRLL9ecUJjhqHQiDMP72tdIyXhkR98AjJBMcG';

const BASE_URL_V4 = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const getTodos = async () => {
  try {
    const response = await fetch(`${BASE_URL_V4}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY,
      },
      mode: 'cors',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    //console.log('Todos:', data.record.todos);
    return data.record.todos;
  } catch (error) {
    console.error('Could not fetch todos:', error);
    return [];
  }
};

/*export const getTodos = async () => {
  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    //console.log(data.record);
    return data.record;
  } catch (error) {
    console.error('Could not fetch todos:', error);
    return [];
  }
};*/

import axios from 'axios';

export const loginUser = async (userName: string, password: string): Promise<string> => {
  const response = await axios.post('https://localhost:7023/api/User/login', {
    userName,
    password,
  });
  return response.data.token;
};

import axios from "axios";
import { Post } from "../types/post";

export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await axios.get("https://localhost:7023/api/Post", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updatePost = async (post: Post) => {
  const response = await axios.put(`https://localhost:7023/api/Post/${post.id}`, post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await axios.get(`https://localhost:7023/api/Post/${id}`);
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axios.post("https://localhost:7023/api/Post", post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`https://localhost:7023/api/Post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
};
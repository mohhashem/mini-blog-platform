"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, CircularProgress, Box, Chip } from "@mui/material";
import { fetchPostById } from "../../services/postService";
import styles from "./PostDetailPage.module.css";
import { Post } from "@/app/types/post";


const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await fetchPostById(id as string);
        setPost(post);
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Typography color="error" align="center" mt={10}>
        {error || "Post not found."}
      </Typography>
    );
  }

  return (
    <Container className={styles.wrapper}>
      <Box className={styles.titleBar}>
        <Chip
          label={post.isPublished ? "Published" : "Draft"}
          color={post.isPublished ? "success" : "default"}
        />
      </Box>

      <Typography className={styles.label}>Title:</Typography>
      <Typography className={styles.title}>{post.title}</Typography>

      <Typography className={styles.label}>Content:</Typography>
      <Typography className={styles.content}>{post.content}</Typography>

      <Typography className={styles.meta}>
        By {post.author} on {new Date(post.createdAt).toLocaleString()}
      </Typography>
    </Container>
  );
};

export default PostDetailPage;

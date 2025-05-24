"use client";

import { useContext, useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Button } from "@mui/material";
import { AuthContext } from "@/app/context/AuthContext";
import { createPost, fetchAllPosts, updatePost, deletePost } from "../../services/postService";
import { Post } from "../../types/post";
import styles from "./HomePage.module.css";
import ListView from "./Components/ListView";
import TableView from "./Components/TableView";
import PostModal from "@/app/SharedComponents/modals/PostModal";
import ConfirmDeleteModal from "@/app/SharedComponents/modals/DeletePostModal";
import { toast } from "react-toastify";

const HomePage = () => {
  const { isAdmin,adminName } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts();
        const filtered = isAdmin ? data : data.filter((p) => p.isPublished);
        setPosts(filtered);
      } catch {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [isAdmin]);

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handlePostSave = async (updatedPost: Post) => {
    if (updatedPost.id === 0) {
      try {
        const newPost = await createPost(updatedPost);
        setPosts((prev) => [...prev, newPost]);
        toast.success("Post created successfully!");
      } catch {
        toast.error("Failed to create post.");
      }
    } else {
      try {
        const result = await updatePost(updatedPost);
        if (result && result.status === 200) {
          setPosts((prev) =>
            prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
          );
          toast.success("Post updated successfully!");
        } else {
          toast.error("Failed to update post.");
        }
      } catch {
        toast.error("Error while updating post.");
      }
    }

    setModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const success = await deletePost(deleteId);
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success("Post deleted successfully.");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch {
      toast.error("Error while deleting post.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography className={styles.title}>Posts</Typography>
        <Button variant="contained" onClick={() => setIsTableView(!isTableView)}>
          Switch to {isTableView ? "List" : "Table"} View
        </Button>
      </Box>

      {loading ? (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : isTableView ? (
        <TableView
          posts={posts}
          onEditClick={handleEditClick}
          onDeleteClick={confirmDelete}
          isAdmin={isAdmin}
        />
      ) : (
        <ListView
          posts={posts}
          isAdmin={isAdmin}
          onEditClick={handleEditClick}
          onDeleteClick={confirmDelete}
          onCreateClick={() => {
            setSelectedPost(null);
            setModalOpen(true);
          }}
        />
      )}

      {modalOpen && (
        <PostModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          post={selectedPost}
          onSave={handlePostSave}
           adminName={adminName}
        />
      )}

      <ConfirmDeleteModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default HomePage;

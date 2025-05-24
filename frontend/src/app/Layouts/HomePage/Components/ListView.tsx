"use client";

import { Box, Typography } from "@mui/material";
import { Post } from "@/app/types/post";
import PostCard from "./PostCard";
import styles from "../HomePage.module.css";

interface ListViewProps {
  posts: Post[];
  isAdmin: boolean;
  onEditClick: (post: Post) => void;
  onDeleteClick: (id: number) => void;
  onCreateClick: () => void;
}

const ListView = ({ posts, isAdmin, onEditClick, onDeleteClick, onCreateClick }: ListViewProps) => {
  return (
    <>
      {posts.length === 0 && (
        <Typography align="center" sx={{ mb: 4 }}>
          No posts found.
        </Typography>
      )}

      <Box className={styles.cardBox}>
        {posts.map((post) => (
          <Box key={post.id} className={styles.cardItem}>
            <PostCard
              {...post}
              onEditClick={isAdmin ? () => onEditClick(post) : undefined}
              onDeleteClick={isAdmin ? () => onDeleteClick(post.id) : undefined}
            />
          </Box>
        ))}

        {isAdmin && (
          <Box key="create" className={styles.cardItem}>
            <div className={styles.createCard} onClick={onCreateClick}>
              +
            </div>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListView;

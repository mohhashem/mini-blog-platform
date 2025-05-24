"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  isPublished: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const PostCard = ({
  id,
  title,
  content,
  author,
  createdAt,
  isPublished,
  onEditClick,
  onDeleteClick,
}: PostCardProps) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        boxShadow: 1,
        transition: "0.3s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          borderColor: "#bbb",
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: 1.2,
              color: "#1a202c",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexGrow: 1,
              pr: 1,
            }}
          >
            {title}
          </Typography>

          {isAdmin && (
            <Box display="flex" alignItems="center" gap={0.5}>
              {onEditClick && (
                <IconButton size="small" onClick={onEditClick}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {onDeleteClick && (
                <IconButton size="small" onClick={onDeleteClick}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              )}
            </Box>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#4a5568",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 2,
            color: "#718096",
            fontStyle: "italic",
          }}
        >
          By {author} on {new Date(createdAt).toLocaleString()}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
          <Chip
            label={isPublished ? "Published" : "Draft"}
            color={isPublished ? "success" : "default"}
            size="small"
          />
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.location.assign(`/post/${id}`)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../HomePage.module.css";
import { useState } from "react";
import { Post } from "@/app/types/post";

interface TableViewProps {
  posts: Post[];
  onEditClick: (post: Post) => void;
  onDeleteClick: (id: number) => void;
  isAdmin: boolean;
}

const TableView = ({ posts, onEditClick, onDeleteClick, isAdmin }: TableViewProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box className={styles.tableWrapper}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table size="small" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Content</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>View</TableCell>
              {isAdmin && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.content}
                </TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleString()}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <Chip
                    label={post.isPublished ? "Published" : "Draft"}
                    color={post.isPublished ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => window.location.assign(`/post/${post.id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <IconButton onClick={() => onEditClick(post)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(post.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={posts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default TableView;

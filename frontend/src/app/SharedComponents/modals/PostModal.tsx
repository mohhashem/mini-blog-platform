'use client';

import { useRef } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import InputField, { InputFieldHandle } from '../basicComponents/InputField';
import RadioGroupAtom, { RadioGroupHandle } from '../basicComponents/RadioGroup';
import ButtonAtom from '../basicComponents/ButtonAtom';
import { Post } from '../../types/post';

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (updatedPost: Post) => Promise<void>;
  adminName: string | null; 
}

const PostModal = ({ open, onClose, post, onSave, adminName }: PostModalProps) => {
  const isEdit = !!post;
  const titleRef = useRef<InputFieldHandle>(null);
  const contentRef = useRef<InputFieldHandle>(null);
  const statusRef = useRef<RadioGroupHandle>(null);

  const handleSave = async () => {
    const title = titleRef.current?.getValue().trim() || '';
    const content = contentRef.current?.getValue().trim() || '';
    const status = statusRef.current?.getValue();

    let isValid = true;

    if (!title) {
      titleRef.current?.setError('Title is required');
      isValid = false;
    } else {
      titleRef.current?.clearError();
    }

    if (!content) {
      contentRef.current?.setError('Content is required');
      isValid = false;
    } else {
      contentRef.current?.clearError();
    }

    if (!isValid) return;

    const updatedPost: Post = {
      id: post?.id || 0,
      title,
      content,
      author: post?.author || adminName || "Anonymous", 
      createdAt: post?.createdAt || new Date().toISOString(),
      isPublished: status === 'true',
    };

    await onSave(updatedPost);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          mx: 'auto',
          mt: 10,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {isEdit ? 'Edit Post' : 'Add Post'}
        </Typography>

        <InputField
          ref={titleRef}
          label="Title"
          type="text"
          defaultValue={post?.title || ''}
        />
        <InputField
          ref={contentRef}
          label="Content"
          type="text"
          defaultValue={post?.content || ''}
        />
        <RadioGroupAtom
          ref={statusRef}
          label="Published Status"
          defaultValue={post?.isPublished ? 'true' : 'false'}
          options={[
            { label: 'Published', value: 'true' },
            { label: 'Draft', value: 'false' },
          ]}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <ButtonAtom label="Cancel" onClick={onClose} variant="outlined" />
          <ButtonAtom label="Save" onClick={handleSave} variant="contained" />
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;

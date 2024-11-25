import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { getFetcher, postFetcher } from "../services/data";
import { useAuth } from "../contexts/AuthProvider";

import useSWRMutation from "swr/mutation";
import DeleteRating from "./DeleteRating";

function ProductComments({ product, onAverageRatingUpdate }) {
  const [comments, setComments] = useState(product.ratings);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const { trigger: addComment, data: commentData } = useSWRMutation(
    `products/post-comment/`,
    postFetcher
  );

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    const commentData = {
      id: product.id,
      stars: rating,
      comment: newComment,
    };

    try {
      const response = await addComment(commentData);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce(
      (sum, comment) => sum + comment.rating?.stars,
      0
    );
    return (total / comments.length).toFixed(1);
  };

  useEffect(() => {
    const average = calculateAverageRating(comments);
    onAverageRatingUpdate(average);
  }, [comments, onAverageRatingUpdate]);

  return (
    <Box mt={4}>
      {product?.userOrdered && product?.canReview ? (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCommentSubmit();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
        >
          <Typography variant="h6" gutterBottom>
            Adicione seu comentário
          </Typography>
          <Rating
            name="new-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Digite seu comentário aqui..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <button
            className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
            type="submit"
          >
            Enviar
          </button>
        </Box>
      ) : (
        ""
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Avaliações do Produto
      </Typography>

      <Box mb={4}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src={comment.user?.avatar}
                  alt="Avatar"
                  width="40"
                  height="40"
                  style={{ borderRadius: "50%" }}
                />
                <Typography
                  className="capitalize"
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  {comment.user?.name}
                </Typography>
              </Box>
              <Rating value={comment.rating?.stars} readOnly />
              <Typography
                variant="subtitle2"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                }}
              >
                {comment.rating?.comment}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Atualizado em:{" "}
                {new Date(comment.rating?.updateAt).toLocaleDateString()}
              </Typography>
              {user?.id === comment.user?.id && (
                <DeleteRating product={product} setComments={setComments} />
              )}
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma avaliação ainda.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProductComments;

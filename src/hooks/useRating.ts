import { RatingRequest, RatingResponse } from './../server/api/rating/rating';
import { useEffect, useRef, useState } from "react";
import {
  createRating,
  updateRating,
  getRatingsByProduct,
  getAvgRating,
} from "../server/api/rating/rating";

function useRating(productId?: string) {
  const [ratings, setRatings] = useState<RatingResponse[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<boolean>(false);

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    setError(message);
    console.error("useRating error:", message);
  };

  const fetchRatings = async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const data = await getRatingsByProduct(productId);
      setRatings(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageRating = async () => {
    if (!productId) return;
    try {
      const avg = await getAvgRating(productId);
      setAverage(avg);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current && productId) {
      hasFetched.current = true;
      fetchRatings();
      fetchAverageRating();
    }
  }, [productId]);

  const handleCreateRating = async (payload: RatingRequest): Promise<void> => {
    setLoading(true);
    try {
      await createRating(payload);
      await fetchRatings();
      await fetchAverageRating();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRating = async (
    ratingId: string,
    payload: Pick<RatingRequest, "comment" | "score">
  ): Promise<void> => {
    setLoading(true);
    try {
      await updateRating(ratingId, payload);
      await fetchRatings();
      await fetchAverageRating();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ratings,
    average,
    loading,
    error,
    fetchRatings,
    fetchAverageRating,
    handleCreateRating,
    handleUpdateRating,
  };
}

export default useRating;

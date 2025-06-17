import { useEffect, useState } from "react";
import {
    createRating,
    getAvgRating,
    getRatingsByProduct,
    RatingRequest,
    RatingResponse
} from "../server/api/rating/rating";

export const useRating = (productId: string) => {
    const [ratings, setRatings] = useState<RatingResponse[]>([]);
    const [average, setAverage] = useState<number>(0);

    const fetchRatings = async () => {
        const data = await getRatingsByProduct(productId);
        console.log("Ratings fetch được:", data);
        setRatings(data);
    };

    const fetchAverage = async () => {
        const avg = await getAvgRating(productId);
        setAverage(avg);
    };

    const submitRating = async (rating: RatingRequest) => {
        const res = await createRating(rating);
        await fetchRatings();
        await fetchAverage();
        return res;
    };

    useEffect(() => {
        if (productId) {
            fetchRatings();
            fetchAverage();
        }
    }, [productId]);

    return { ratings, average, submitRating, fetchRatings };
};

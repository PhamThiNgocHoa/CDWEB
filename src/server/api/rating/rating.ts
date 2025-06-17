import ApiService from "../ApiService";

export interface RatingRequest {
  productId: string;    
  customerId: string;   
  comment: string;
  score: number;
}

export interface RatingResponse {
  id: string;
  customerName: string;
  comment: string;
  score: number;
  createdAt: string;
}


export const createRating = async (
  payload: RatingRequest
): Promise<RatingResponse> => {
  const res = await ApiService.post(
    `/api/rating`,
    payload
  );
  return res.data.data;
};


export const updateRating = async (
  ratingId: string,
  payload: Pick<RatingRequest, "comment" | "score">
): Promise<RatingResponse> => {
  const res = await ApiService.patch(
    `/api/rating/${ratingId}`,
    payload
  );
  return res.data.data;
};


export const getRatingsByProduct = async (
  productId: string
): Promise<RatingResponse[]> => {
  const res = await ApiService.get(
    `/api/rating/product/${productId}`
  );
  return res.data.data;
};


export const getAvgRating = async (productId: string): Promise<number> => {
  const res = await ApiService.get(
    `/api/rating/avg/${productId}`
  );
  return res.data.data;
};

import { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import api from '../utils/api';

const RatingSystem = ({ movie, userRating, onRatingChange }) => {
  const [rating, setRating] = useState(userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRating = async (newRating) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/movies/rate', {
        movieId: movie._id,
        rating: newRating
      });
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Star Rating */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-400 text-sm mr-2">Rate:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => submitRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={isSubmitting}
            className="transition-colors duration-200"
          >
            <FaStar
              size={16}
              className={`${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-600'
              } hover:text-yellow-300`}
            />
          </button>
        ))}
      </div>

      {/* Quick Rating Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => submitRating(5)}
          disabled={isSubmitting}
          className={`p-1 rounded transition-colors ${
            rating >= 4
              ? 'text-green-400 hover:text-green-300'
              : 'text-gray-600 hover:text-green-400'
          }`}
          title="Like"
        >
          <FaThumbsUp size={14} />
        </button>
        <button
          onClick={() => submitRating(1)}
          disabled={isSubmitting}
          className={`p-1 rounded transition-colors ${
            rating <= 2 && rating > 0
              ? 'text-red-400 hover:text-red-300'
              : 'text-gray-600 hover:text-red-400'
          }`}
          title="Dislike"
        >
          <FaThumbsDown size={14} />
        </button>
      </div>

      {rating > 0 && (
        <span className="text-gray-400 text-sm">
          You rated: {rating}/5
        </span>
      )}
    </div>
  );
};

export const AverageRating = ({ movie }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [movie._id]);

  const fetchRatings = async () => {
    try {
      const response = await api.get(`/movies/${movie._id}/ratings`);
      setAverageRating(response.data.average || 0);
      setTotalRatings(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  if (totalRatings === 0) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <FaStar className="text-yellow-400" size={14} />
        <span className="text-white font-medium">
          {averageRating.toFixed(1)}
        </span>
      </div>
      <span className="text-gray-400 text-sm">
        ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
      </span>
    </div>
  );
};

export default RatingSystem;
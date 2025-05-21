import { type MouseEvent, useState } from "react";

type StarRatingProps = {
  totalStars: number;
};

export const StarRating = ({ totalStars = 5 }: StarRatingProps) => {
  const [rating, setRating] = useState(0); // selected rating
  const [hover, setHover] = useState(0); // hover rating

  // determine if hover or click is on the left (half-start) or right (full-star)
  const getStarHoverValue = (event: MouseEvent, index: number) => {
    const { offsetX, target } = event.nativeEvent;
    const isHalf = offsetX < (target as HTMLElement).offsetWidth / 2;
    return isHalf ? index - 0.5 : index;
  };

  // handle hover event
  const handleMouseMove = (event: MouseEvent, index: number) => {
    setRating(getStarHoverValue(event, index));
  };

  // handle click event
  const handleStarClick = (event: MouseEvent, index: number) => {
    setRating(getStarHoverValue(event, index));
  };

  // reset hover when mouse leaves
  const handleMouseLeave = () => {
    setHover(0);
  };

  // render start with rating and hover
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const index = i + 1;
      const isFull = hover >= index || rating >= index;
      const isHalf = hover === index - 0.5 || rating === index - 0.5;
      stars.push(
        <div
          key={index}
          className="star-container"
          onMouseMove={(e) => handleMouseMove(e, index)}
          onClick={(e) => handleStarClick(e, index)}
        >
          <span
            className={`star ${isFull ? "full" : isHalf ? "half" : "empty"}`}
          >
            ★
          </span>
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {renderStars()}
    </div>
  );
};

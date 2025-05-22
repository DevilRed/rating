import { type MouseEvent, useState } from "react";

type StarRatingProps = {
  totalStars: number;
};

export const StarRating = ({ totalStars = 5 }: StarRatingProps) => {
  const [rating, setRating] = useState(0); // selected rating
  const [hover, setHover] = useState(0); // hover rating

  // determine if hover or click is on the left (half-start) or right (full-star)
  /**
    * event.nativeEvent: Gets the raw browser mouse event
      offsetX: The horizontal pixel position of the mouse cursor relative to the element's left edge
      target: The DOM element that triggered the event (the star container)
      target.offsetWidth: The total width of the star element in pixels
  */
  const getStarHoverValue = (event: MouseEvent, index: number) => {
    const { offsetX, target } = event.nativeEvent;
    /**
     *  If offsetX is less than half the star's width → mouse is on the left half
        If offsetX is greater than or equal to half the star's width → mouse is on the right half
    */
    const isHalf = offsetX < (target as HTMLElement).offsetWidth / 2;
    /**
     If mouse is on left half: returns index - 0.5 (half-star value)
     If mouse is on right half: returns index (full-star value)

     Visual Example
     Imagine star #3 (index = 3) that's 100px wide:
     Star #3: [    Left Half    |    Right Half    ]
         [   0px - 50px    |   50px - 100px   ]

    Mouse at 30px: 30 < 50 → isHalf = true → returns 2.5
    Mouse at 70px: 70 < 50 → isHalf = false → returns 3

    */
    console.log(index);
    return isHalf ? index - 0.5 : index;
  };

  // handle hover event, When a user moves their mouse over a star
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
      // index = each star position
      const index = i + 1;
      // Is the current hover value greater than or equal to this star's position
      // Is the selected rating greater than or equal to this star's position
      /**
       * Example: If the user is hovering over star 3 (hover = 3):

            Star 1: 3 >= 1 = true → full
            Star 2: 3 >= 2 = true → full
            Star 3: 3 >= 3 = true → full
            Star 4: 3 >= 4 = false → not full
       */
      const isFull = hover >= index || rating >= index;
      /**
       *  hover === index - 0.5 - Is the hover exactly half of this star's position?
          rating === index - 0.5 - Is the rating exactly half of this star's position?
            Example: If the user clicks on the left half of star 3 (rating = 2.5):

            Star 1: 2.5 === 1 - 0.5 = false → not half
            Star 2: 2.5 === 2 - 0.5 = false → not half
            Star 3: 2.5 === 3 - 0.5 = true → half
            Star 4: 2.5 === 4 - 0.5 = false → not half
       */
      const isHalf = hover === index - 0.5 || rating === index - 0.5;
      stars.push(
        // div to hold the * star and handle events, this has the background color
        <div
          key={index}
          className="star-container"
          onMouseMove={(e) => handleMouseMove(e, index)}
          onClick={(e) => handleStarClick(e, index)}
        >
          <span
            className={`star ${isFull ? "full" : isHalf ? "half" : "empty"}`}
          >
            {/* the star character, it is transparent to give the effect */}★
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

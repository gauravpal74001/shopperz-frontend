import { Navigate, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useProductdetailsQuery,
} from "../redux/api/product-api";
import Skeleton from "../components/skeleton";
import {
  type CarouselButtonType,
  Slider,
  MyntraCarousel,
} from "6pp";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaPen,
} from "react-icons/fa";
import Rating from "../components/rating";
import { addToCart } from "../redux/reducer/cartReducer";
import type { cartItems, Review } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../redux/store";
import { FaTrash } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useProductdetailsQuery(id!);
  const [carousel, setCarousel] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const { data: reviews } = useGetReviewsQuery(id!);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, data?.product?.stock || 1));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  const cartHandler = (cartItems: cartItems) => {
    dispatch(addToCart(cartItems));
    toast.success("Product added to cart");
  };

  if (isError) <Navigate to="/404" />;

  const images = data?.product?.photos?.map((i) => i.url) || [];
  const [review, setReview] = useState<boolean>(false);

  return (
    <div className="product-details">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main>
            <section>
              {images.length > 0 && (
                <>
                  <Slider
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarousel(true)}
                    images={images}
                  />
                  {carousel && (
                    <MyntraCarousel
                      images={images}
                      PrevButton={prevbutton}
                      NextButton={nextbutton}
                      setIsOpen={setCarousel}
                    />
                  )}
                </>
              )}
            </section>
            <section>
              <h1>{data?.product?.name}</h1>
              <p>{data?.product?.price}</p>
              <p>{data?.product?.category}</p>
              <div className="rating">
                <Rating value={data?.product?.ratings || 0} />
                <small>{data?.product?.no_of_reviews} reviews</small>
              </div>
              <div className="cart-controls">
                <div className="quantity-controls">
                  <button onClick={decrementQuantity}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={incrementQuantity}>
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="add-to-cart"
                  onClick={() =>
                    cartHandler({
                      productId: data?.product?._id!,
                      quantity,
                      price: data?.product?.price!,
                      name: data?.product?.name!,
                      photo: data?.product?.photos[0]?.url!,
                      stock: data?.product?.stock!,
                    })
                  }
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </section>
          </main>

          <section className="reviews-section">
            <article className="reviews-header">
              <h2>Reviews</h2>
              <button
                onClick={() => setReview(true)}
                className="write-review-button"
              >
                <FaPen />
              </button>
              {review && <WriteReview setReview={setReview} id={id!} />}
            </article>

            <div className="reviews-container">
              {reviews?.reviews.map((i) => (
                <ReviewCard key={i._id} review={i} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export const ReviewCard =  ({ review }: { review: Review }) => {
  const {user}=useSelector((state:RootState)=>state.userReducer);

  const [deleteReview]=useDeleteReviewMutation();


  const deletehandler=async (product_id:string , user_id:string)=>{
    await deleteReview({product_id, user_id});
    toast.success("review Deleted Successfully");
  }
 
  return (
    <div className="review-card">
      {user?._id === review.user_id && (
        <button onClick={()=>deletehandler(review.product_id , user?._id!)} className="delete-review">
          <FaTrash />
        </button>
      )}
      <div className="review-header">
        <div className="user-info">
          <img src={review.user.photo} alt="User" className="user-avatar" />
          <span className="user-name">{review.user.name}</span>
        </div>
        <div className="review-rating">
          <Rating value={review.ratings} />
          <span className="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

const prevbutton: CarouselButtonType = ({ onClick }) => (
  <button className="carousel-button" onClick={onClick}>
    <FaArrowLeft />
  </button>
);

const nextbutton: CarouselButtonType = ({ onClick }) => (
  <button className="carousel-button" onClick={onClick}>
    <FaArrowRight />
  </button>
);

export const ProductLoader = () => {
  return (
    <main>
      <section>
        <div className="product-loader-image">
          <Skeleton width="100%" height="500px" margin="0 0 1rem 0" />
        </div>
      </section>
      <section>
        <div className="product-info">
          <Skeleton width="60%" height="30px" margin="0 0 1rem 0" />
          <Skeleton width="40%" height="50px" margin="0 0 1rem 0" />
          <Skeleton width="100%" height="100px" margin="2rem 0 0 0" />
        </div>
      </section>
    </main>
  );
};

const WriteReview = ({
  setReview,
  id,
}: {
  setReview: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [createReview] = useCreateReviewMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const handleSubmit = async () => {
    await createReview({
      product_id: id,
      user_id: user?._id!,
      comment: comment,
      ratings: rating,
    });
    toast.success("Review submitted successfully");
    setRating(0);
    setComment("");
    setReview(false);
  };

  // close the review overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setReview(false);
    }
  };

  return (
    <div className="review-overlay" onClick={handleOverlayClick}>
      <div className="write-review" onClick={(e) => e.stopPropagation()}>
        <h3>Write a Review</h3>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} type="button">
              {star <= rating ? <FaStar color="#ffd700" /> : <FaRegStar />}
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows={3}
        />
        <div className="review-buttons">
          <button className="submit-review" onClick={handleSubmit}>
            Submit Review
          </button>
          <button
            className="close-review"
            onClick={() => {
              setComment("");
              setReview(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

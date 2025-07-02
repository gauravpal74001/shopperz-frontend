import {useRating} from "6pp";
import {FaStar,FaRegStar} from "react-icons/fa";

const Rating = ({value=0}:{value:number}) => {
  const {Ratings}=useRating({
    IconFilled:<FaStar/>,
    IconOutline:<FaRegStar/>,
    value:value,
    styles:{
        color:"coral",
        gap:2,
    }
  })
  return (
   <Ratings/>
  )
}

export default Rating;


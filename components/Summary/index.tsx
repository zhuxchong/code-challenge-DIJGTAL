import Icon from "@/public/“.png";
import Image from "next/image";
import "./styles.css";

const Summary = (props: { i: number }) => {
  return (
    <div className="constrains-Carousel-description">
      <Image
        src={Icon}
        alt={`Icon ${props.i + 1}`}
        className="constrains-Carousel-icon"
      />
      Lorem ipsum dolor sit amet consectetur. Placerat interdum mollis dui
      vitae.
    </div>
  );
};
export default Summary;

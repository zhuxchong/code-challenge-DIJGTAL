import Icon from "@/public/“.png";
import Image from "next/image";
import "./styles.css";

const Summary = (props: { i: number; currentIndex: number }) => {
  return (
    <div
      className={`components-Summary-description ${
        props.currentIndex === props.i
          ? ""
          : "components-Summary-description-hide"
      }`}
    >
      <Image
        src={Icon}
        alt={`Icon ${props.i + 1}`}
        className="components-Summary-icon"
      />
      Greatness respects greatness. That’s why I’m teaming up with this brand,
      giving you a chance to be great.
    </div>
  );
};
export default Summary;

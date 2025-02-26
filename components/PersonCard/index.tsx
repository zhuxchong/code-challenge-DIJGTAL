import Image from "next/image";
import "./styles.css";
import Man1 from "@/public/floyd-mayweather-image.png";
import Man1Sign from "@/public/floyd-mayweather-signature.png";
import Logo from "@/public/Sports.png";
// import Bkg from "@/public/aqib-talib-background.png";

const Card = ({ index }: { index: number }) => {
  return (
    <div className={"components-PersonCard-wrapper"} id={`personCard${index}`}>
      <div className="components-PersonCard-card">
        {/* 背景 */}
        <div className="components-PersonCard-background">
          <div className="components-PersonCard-backgroundFade"></div>
          <Image
            src={Man1Sign} // 替换成人物图片路径
            alt="Floyd Mayweather sign"
            className={"components-PersonCard-personImageSign"}
          />
          <Image
            src={Logo} // 替换成人物图片路径
            alt="WBA"
            className={"components-PersonCard-WBA"}
          />
          <div className={"components-PersonCard-person"}>
            <Image
              src={Man1} // 替换成人物图片路径
              alt="Floyd Mayweather"
              className={"components-PersonCard-personImage"}
              fill
              objectFit="contain"
              // width={318}
              // height={424}
              priority
            />
          </div>
        </div>
        <div className={"components-PersonCard-subtitle"}>
          The best defensive boxer of all time
        </div>

        {/* 文本内容 */}
        <div className={"components-PersonCard-text"}>FLOYD MAYWEATHER</div>
      </div>
    </div>
  );
};

export default Card;

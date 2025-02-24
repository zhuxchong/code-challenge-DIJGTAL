"use client";
import Image from "next/image";
import "./styles.css";
import Man1 from "@/public/floyd-mayweather-image.png";
import Man1Sign from "@/public/floyd-mayweather-signature.png";
import Logo from "@/public/Sports.png";
// import Bkg from "@/public/aqib-talib-background.png";

const Card = () => {
  return (
    <div className={"components-PersonCard-wrapper"}>
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
            />
          </div>
        </div>
        <div className={"components-PersonCard-subtitle"}>
          LOREM IPSUM DOLOR
        </div>

        {/* 文本内容 */}
        <div className={"components-PersonCard-text"}>Lorem Ipsum</div>
      </div>
    </div>
  );
};

export default Card;

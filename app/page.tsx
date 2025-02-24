import Link from "next/link";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>Home Page</h1>
      <Link href="/carousel" style={{ fontSize: "20px", color: "#fff" }}>
        Go to Carousel / This version doesn’t use any libraries, and the drag
        feature still needs some time to be implemented. (Update: Drag events
        have been added, and I am currently testing them. Later, I will make it
        responsive. )
      </Link>
      <Link href="/swiper" style={{ fontSize: "20px", color: "#fff" }}>
        Go to Swiper / This version uses Swiper/React, but the animations aren’t
        as smooth.
      </Link>
    </div>
  );
}

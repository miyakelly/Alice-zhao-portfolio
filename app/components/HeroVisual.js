import Image from "next/image";
import s from "./HeroVisual.module.css";

export default function HeroVisual({ src, alt }) {
  return (
    <div className={s.visual}>
      {src ? (
        <Image
          src={src}
          alt={alt || ""}
          width={1920}
          height={1080}
          sizes="(max-width: 900px) 100vw, 60vw"
          className={s.image}
        />
      ) : (
        <span className={s.placeholder}>{alt || "[ product visual ]"}</span>
      )}
    </div>
  );
}

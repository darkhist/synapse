import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const Photo = ({ src, alt }: Props) => (
  <div className="mb-4">
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
      }}
    />
  </div>
);

export default Photo;

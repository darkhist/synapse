import Image from "next/legacy/image";

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
      layout="responsive"
      objectFit="contain"
    />
  </div>
);

export default Photo;

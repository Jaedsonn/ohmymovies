import Image from "next/image";

const HomeCarouselCard = ({ image, children }: { image: string, children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-h-[700px] px-4">
      <div
        className="absolute inset-0 w-full h-full bg-carousel-movie flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {children}
      </div>

      <Image
        width={1000}
        height={500}
        alt="movie image"
        src={image}
        className="w-full h-auto object-contain  blur-md"
        quality={100}
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

export default HomeCarouselCard;

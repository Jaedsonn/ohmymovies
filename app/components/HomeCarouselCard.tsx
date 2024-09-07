import Image from "next/image";

const HomeCarouselCard = ({ image, children }: { image: string, children: React.ReactNode }) => {
  
  return (
    <div className="relative w-full max-h-700 ">
      <div
        className="absolute inset-0 w-full h-full dark:bg-carousel-movie bg-dark-carousel-movie flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {children}
      </div>

      <Image
        width={1000}
        height={500}
        alt="movie image"
        src={image}
        className="w-full h-auto  blur-md lg:flex  "
        quality={100}
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

export default HomeCarouselCard;

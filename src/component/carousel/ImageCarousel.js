import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";


const ImageCarousel = ({ images, handleChangeImage, prevRef, nextRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderThumbs = () => {
    // Render thumbnails for the first four images only
    return images.slice(0, 4).map((img, i) => (
      <button key={i + 1} onClick={() => handleChangeImage(img)}>
        <img
          className="border inline-flex items-center justify-center px-3 py-1 mt-2"
          src={img.medialink}
          alt="product"
          width={85}
          height={85}
        />
      </button>
    ));
  };
  
  return (
    <>
      <Carousel
        showArrows={true}
        showThumbs={true}
        renderThumbs={renderThumbs}
        width={400}
        height={400}

      >
        {images.slice(0, 4).map((img, index) => (
          <div key={index}  >
            <img src={img.medialink} alt="product" />
          </div>
        ))}
      </Carousel>

    </>
  );
};


export default dynamic(() => Promise.resolve(ImageCarousel), { ssr: false });

import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import style from './Slideshow.module.css';

type SlideshowProps = {
  images: string[];
};

export const ProductSlideshow: FC<SlideshowProps> = ({ images }) => {
  return (
    <Slide easing='ease' duracion={7000} indicators>
      {images.map((image) => (
        <div className={style['each-slide']} key={image}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }}
          ></div>
        </div>
      ))}
    </Slide>
  );
};

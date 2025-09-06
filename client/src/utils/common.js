import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export const SliderSettings = {
    slidesPerView: 3,
    spaceBetween: 5,

    /*    spaceBetween={30}
    slidesPerView={3}
     
    */
    breakpoints: {
        480: {
            slidesPerView: 1
        },
        600: {
            slidesPerView: 2
        },
        750: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4
        }

    }

}

export const updateFavourites = (id, favourites) => {
    if (favourites.includes(id)) {
        return favourites.filter((resId) => resId !== id)
    } else {
        return [...favourites, id]
    }
}


export const checkFavourites = (id, favourites) => {
    return favourites?.includes(id) ? "#fa3e5f" : "white";
};

export const validateString = (value) => {
    return value?.length < 3 || value === null ? "Must have atleast 3 characters" : null;

};

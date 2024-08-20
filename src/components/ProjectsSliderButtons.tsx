'use client';

import { useSwiper } from 'swiper/react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

const ProjectsSliderButtons = ({
    containerClasses,
    buttonClasses,
    iconClasses,
}: {
    containerClasses: string;
    buttonClasses: string;
    iconClasses?: string;
}) => {
    const swiper = useSwiper();
    return (
        <div className={containerClasses}>
            <button className={buttonClasses} onClick={() => swiper.slidePrev()}>
                <PiCaretLeftBold className={iconClasses} />
            </button>
            <button className={buttonClasses}>
                <PiCaretRightBold className={iconClasses} onClick={() => swiper.slideNext()} />
            </button>
        </div>
    );
};

export default ProjectsSliderButtons;

export interface CarouselImage {
    url: string;
    alt?: string;
    title?: string;
    description?: string;
}

export interface CarouselTheme {
    primary?: string;
    secondary?: string;
    background?: string;
    textColor?: string;
}

export interface ParallaxCarouselProps {
    images: CarouselImage[];
    interval?: number;
    className?: string;
    onSlideChange?: (currentIndex: number) => void;
    showArrows?: boolean;
    showDots?: boolean;
    showThumbnails?: boolean;
    autoPlay?: boolean;
    pauseOnHover?: boolean;
    theme?: CarouselTheme;
    effect?: 'slide' | 'fade' | 'zoom';
    height?: string | number;
    thumbnailPosition?: 'top' | 'bottom' | 'left' | 'right';
    showCaption?: boolean;
    infinite?: boolean;
    keyboardControl?: boolean;
} 
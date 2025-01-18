import React, { useState, useEffect, useRef, useCallback } from "react";
import { ParallaxCarouselProps } from "../../types";
import "./ParallaxCarousel.css";

export const ParallaxCarousel: React.FC<ParallaxCarouselProps> = ({
	images,
	interval = 5000,
	className = "",
	onSlideChange,
	showArrows = true,
	showDots = true,
	showThumbnails = false,
	autoPlay = true,
	pauseOnHover = true,
	theme,
	effect = "slide",
	height = "500px",
	thumbnailPosition = "bottom",
	showCaption = false,
	infinite = true,
	keyboardControl = true,
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [prevSlide, setPrevSlide] = useState(-1);
	const [isPaused, setIsPaused] = useState(false);
	const touchStartX = useRef<number>(0);
	const touchEndX = useRef<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const generateCustomStyles = () => {
		if (!theme) return {};

		return {
			"--primary-color": theme.primary,
			"--secondary-color": theme.secondary,
			"--background-color": theme.background,
			"--text-color": theme.textColor,
		} as React.CSSProperties;
	};

	const handleSlideChange = useCallback(
		(newIndex: number) => {
			const currentIndex = currentSlide;
			let finalIndex;

			if (!infinite) {
				finalIndex = Math.max(0, Math.min(newIndex, images.length - 1));
			} else {
				finalIndex = newIndex < 0 
					? images.length - 1 
					: newIndex % images.length;
			}
			
			setPrevSlide(currentIndex);
			setCurrentSlide(finalIndex);
			onSlideChange?.(finalIndex);
		},
		[infinite, images.length, onSlideChange, currentSlide]
	);

	// Auto transition effect
	useEffect(() => {
		if (!autoPlay || isPaused || !images.length) return;

		const timer = setInterval(() => {
			handleSlideChange(currentSlide + 1);
		}, interval);

		return () => clearInterval(timer);
	}, [currentSlide, interval, autoPlay, isPaused, handleSlideChange, images.length]);

	// keyboard control
	useEffect(() => {
		if (!keyboardControl) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				handleSlideChange(currentSlide - 1);
			} else if (e.key === "ArrowRight") {
				handleSlideChange(currentSlide + 1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentSlide, keyboardControl, handleSlideChange]);

	const handleTouchStart = (e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStartX.current = touch.clientX;
		touchEndX.current = touch.clientX;
		containerRef.current!.setAttribute("data-touching", "true");
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		containerRef.current!.removeAttribute("data-touching");
		handleSwipe();
	};

	const handleSwipe = () => {
		const swipeThreshold = 50;
		const difference = touchStartX.current - touchEndX.current;

		if (Math.abs(difference) > swipeThreshold) {
			if (difference > 0) {
				handleSlideChange(currentSlide + 1);
			} else {
				handleSlideChange(currentSlide - 1);
			}
		}
	};

	const handleMouseEnter = () => {
		if (pauseOnHover) {
			setIsPaused(true);
		}
	};

	const handleMouseLeave = () => {
		if (pauseOnHover) {
			setIsPaused(false);
		}
	};

	return (
		<div
			className={`carousel-container ${className} effect-${effect} thumbnail-${thumbnailPosition}`}
			style={{ ...generateCustomStyles(), height }}
			ref={containerRef}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			data-testid="carousel-container"
			role="region"
			tabIndex={0}
			aria-label="Image carousel"
		>
			{/* main slides */}
			<div className="carousel-slides">
				{images.map((image, index) => (
					<div
						key={`${image.url}-${index}`}
						className={`carousel-slide ${
							index === currentSlide ? "active" : ""
						} ${index === prevSlide ? "prev" : ""}`}
						data-testid={`carousel-slide-${index}`}
					>
						<img
							src={image.url}
							alt={image.alt || `Slide ${index + 1}`}
							className="carousel-image"
						/>
						{showCaption && (image.title || image.description) && (
							<div className="carousel-caption">
								{image.title && <h3>{image.title}</h3>}
								{image.description && <p>{image.description}</p>}
							</div>
						)}
					</div>
				))}
			</div>

			{/* arrows control */}
			{showArrows && (
				<>
					<button
						className="carousel-arrow prev"
						onClick={() => handleSlideChange(currentSlide - 1)}
						disabled={!infinite && currentSlide === 0}
						data-testid="prev-button"
					>
						‹
					</button>
					<button
						className="carousel-arrow next"
						onClick={() => handleSlideChange(currentSlide + 1)}
						disabled={!infinite && currentSlide === images.length - 1}
						data-testid="next-button"
					>
						›
					</button>
				</>
			)}

			{/* dot navigation */}
			{showDots && (
				<div className="carousel-controls" data-testid="carousel-controls">
					{images.map((_, index) => (
						<button
							key={index}
							className={`carousel-dot ${
								index === currentSlide ? "active" : ""
							}`}
							onClick={() => handleSlideChange(index)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleSlideChange(index);
								}
							}}
							data-testid={`carousel-dot-${index}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}

			{/* small images */}
			{showThumbnails && (
				<div className="carousel-thumbnails" data-testid="carousel-thumbnails">
					{images.map((image, index) => (
						<div
							key={`thumb-${index}`}
							className={`carousel-thumbnail ${
								index === currentSlide ? "active" : ""
							}`}
							onClick={() => handleSlideChange(index)}
							data-testid={`carousel-thumbnail-${index}`}
						>
							<img src={image.url} alt={`Thumbnail ${index + 1}`} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ParallaxCarousel;

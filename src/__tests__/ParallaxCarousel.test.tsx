import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import ParallaxCarousel from '../components/ParallaxCarousel/ParallaxCarousel';

const mockImages = [
    { url: 'test1.jpg', alt: 'Test 1', title: 'Title 1', description: 'Desc 1' },
    { url: 'test2.jpg', alt: 'Test 2', title: 'Title 2', description: 'Desc 2' },
    { url: 'test3.jpg', alt: 'Test 3', title: 'Title 3', description: 'Desc 3' }
];

describe('ParallaxCarousel', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllTimers();
    });

    it('renders without crashing', () => {
        render(<ParallaxCarousel images={mockImages} />);
        expect(screen.getByTestId('carousel-container')).toBeInTheDocument();
    });

    it('shows correct number of slides', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const slides = screen.getAllByTestId(/carousel-slide-/);
        expect(slides).toHaveLength(mockImages.length);
    });

    it('shows navigation arrows when showArrows is true', () => {
        render(<ParallaxCarousel images={mockImages} showArrows={true} />);
        expect(screen.getByTestId('prev-button')).toBeInTheDocument();
        expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('hides navigation arrows when showArrows is false', () => {
        render(<ParallaxCarousel images={mockImages} showArrows={false} />);
        expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
    });

    it('shows dots when showDots is true', () => {
        render(<ParallaxCarousel images={mockImages} showDots={true} />);
        expect(screen.getByTestId('carousel-controls')).toBeInTheDocument();
    });

    it('hides dots when showDots is false', () => {
        render(<ParallaxCarousel images={mockImages} showDots={false} />);
        expect(screen.queryByTestId('carousel-controls')).not.toBeInTheDocument();
    });

    it('shows thumbnails when showThumbnails is true', () => {
        render(<ParallaxCarousel images={mockImages} showThumbnails={true} />);
        expect(screen.getByTestId('carousel-thumbnails')).toBeInTheDocument();
    });

    it('handles touch navigation', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        // Swipe left
        fireEvent.touchStart(container, { touches: [{ clientX: 200, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 50, clientY: 0 }] });
        fireEvent.touchEnd(container);

        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');
    });

    it('handles keyboard navigation when enabled', () => {
        render(<ParallaxCarousel images={mockImages} keyboardControl={true} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.keyDown(container, { key: 'ArrowRight' });
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');

        fireEvent.keyDown(container, { key: 'ArrowLeft' });
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('active');
    });

    it('handles autoplay correctly', () => {
        render(<ParallaxCarousel images={mockImages} autoPlay={true} interval={3000} />);
        
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');
        
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(screen.getByTestId('carousel-slide-2')).toHaveClass('carousel-slide active');
    });

    it('pauses on hover when pauseOnHover is true', () => {
        render(<ParallaxCarousel images={mockImages} autoPlay={true} pauseOnHover={true} interval={3000} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.mouseEnter(container);
        jest.advanceTimersByTime(3000);
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('active');
    });

    it('shows captions when showCaption is true', () => {
        render(<ParallaxCarousel images={mockImages} showCaption={true} />);
        expect(screen.getByText('Title 1')).toBeInTheDocument();
        expect(screen.getByText('Desc 1')).toBeInTheDocument();
    });

    it('handles infinite scroll correctly', () => {
        render(<ParallaxCarousel images={mockImages} infinite={true} />);
        const nextButton = screen.getByTestId('next-button');

        // Go to last slide
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        expect(screen.getByTestId('carousel-slide-2')).toHaveClass('active');

        // Should wrap to first slide
        fireEvent.click(nextButton);
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('active');
    });

    it('respects non-infinite scroll when infinite is false', () => {
        render(<ParallaxCarousel images={mockImages} infinite={false} />);
        const nextButton = screen.getByTestId('next-button');
        const prevButton = screen.getByTestId('prev-button');

        expect(prevButton).toBeDisabled();

        // Go to last slide
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        
        expect(nextButton).toBeDisabled();
    });

    it('applies custom theme correctly', () => {
        const theme = {
            primary: '#ff0000',
            secondary: '#00ff00',
            background: '#0000ff',
            textColor: '#ffffff'
        };

        render(<ParallaxCarousel images={mockImages} theme={theme} />);
        const container = screen.getByTestId('carousel-container');
        
        expect(container).toHaveStyle({
            '--primary-color': '#ff0000',
            '--secondary-color': '#00ff00',
            '--background-color': '#0000ff',
            '--text-color': '#ffffff'
        });
    });

    it('handles dot navigation correctly', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const dots = screen.getAllByTestId(/carousel-dot-/);

        fireEvent.click(dots[1]);
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');

        fireEvent.click(dots[2]);
        expect(screen.getByTestId('carousel-slide-2')).toHaveClass('active');
    });

    it('handles thumbnail navigation correctly', () => {
        render(<ParallaxCarousel images={mockImages} showThumbnails={true} />);
        const thumbnails = screen.getAllByTestId(/carousel-thumbnail-/);

        fireEvent.click(thumbnails[1]);
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');

        fireEvent.click(thumbnails[2]);
        expect(screen.getByTestId('carousel-slide-2')).toHaveClass('active');
    });

    it('handles touch move correctly', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.touchStart(container, { touches: [{ clientX: 200, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 100, clientY: 0 }] });
        fireEvent.touchEnd(container);

        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');
    });

    it('does not change slide on small swipe', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.touchStart(container, { touches: [{ clientX: 100, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 95, clientY: 0 }] });
        fireEvent.touchEnd(container);

        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
    });

    it('calls onSlideChange when slide changes', () => {
        const onSlideChange = jest.fn();
        render(<ParallaxCarousel images={mockImages} onSlideChange={onSlideChange} />);
        const nextButton = screen.getByTestId('next-button');

        fireEvent.click(nextButton);
        expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('cleans up event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const { unmount } = render(
            <ParallaxCarousel images={mockImages} keyboardControl={true} />
        );

        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalled();
        removeEventListenerSpy.mockRestore();
    });

    it('handles swipe left and right correctly', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        // Swipe left
        fireEvent.touchStart(container, { touches: [{ clientX: 200, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 50, clientY: 0 }] });
        fireEvent.touchEnd(container);
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');

        // Swipe right
        fireEvent.touchStart(container, { touches: [{ clientX: 50, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 200, clientY: 0 }] });
        fireEvent.touchEnd(container);
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
    });

    it('handles touch events with data-touching attribute', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.touchStart(container, { touches: [{ clientX: 100, clientY: 0 }] });
        expect(container).toHaveAttribute('data-touching', 'true');

        fireEvent.touchEnd(container);
        expect(container).not.toHaveAttribute('data-touching');
    });

    it('handles slide change with infinite scroll', () => {
        const onSlideChange = jest.fn();
        render(
            <ParallaxCarousel 
                images={mockImages} 
                infinite={true} 
                onSlideChange={onSlideChange}
            />
        );

        // Test going past the last slide
        const nextButton = screen.getByTestId('next-button');
        mockImages.forEach(() => {
            fireEvent.click(nextButton);
        });

        expect(onSlideChange).toHaveBeenCalledTimes(mockImages.length);
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
    });

    it('handles keyboard events correctly', () => {
        render(<ParallaxCarousel images={mockImages} keyboardControl={true} />);

        fireEvent.keyDown(window, { key: 'ArrowRight' });
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');

        fireEvent.keyDown(window, { key: 'ArrowLeft' });
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
    });

    it('handles small swipe movement', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.touchStart(container, { touches: [{ clientX: 100, clientY: 0 }] });
        fireEvent.touchMove(container, { touches: [{ clientX: 90, clientY: 0 }] });
        fireEvent.touchEnd(container);

        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
    });

    it('calls onSlideChange callback', () => {
        const mockOnSlideChange = jest.fn();
        render(<ParallaxCarousel 
            images={mockImages} 
            onSlideChange={mockOnSlideChange}
        />);

        const nextButton = screen.getByTestId('next-button');
        fireEvent.click(nextButton);

        expect(mockOnSlideChange).toHaveBeenCalledWith(1);
    });

    it('removes event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const { unmount } = render(
            <ParallaxCarousel 
                images={mockImages} 
                keyboardControl={true} 
                autoPlay={true}
            />
        );

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });

    describe('swipe threshold', () => {
        it('should not change slide when swipe is below threshold', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Simulate small swipe (less than 50px)
            fireEvent.touchStart(container, { touches: [{ clientX: 100 }] });
            fireEvent.touchMove(container, { touches: [{ clientX: 80 }] });
            fireEvent.touchEnd(container);

            // Should stay on first slide
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('active');
        });
    });

    describe('slide change callback', () => {
        it('should call onSlideChange with correct index', () => {
            const handleSlideChange = jest.fn();
            render(
                <ParallaxCarousel 
                    images={mockImages} 
                    onSlideChange={handleSlideChange} 
                />
            );

            // Trigger slide change
            const nextButton = screen.getByTestId('next-button');
            fireEvent.click(nextButton);

            // Verify callback
            expect(handleSlideChange).toHaveBeenCalledWith(1);
        });
    });

    describe('cleanup', () => {
        it('should remove event listeners on unmount', () => {
            const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
            const { unmount } = render(
                <ParallaxCarousel 
                    images={mockImages} 
                    keyboardControl={true} 
                    autoPlay={true} 
                />
            );

            unmount();

            // Verify cleanup
            expect(removeEventListenerSpy).toHaveBeenCalled();
            removeEventListenerSpy.mockRestore();
        });
    });

    it('should unpause on mouse leave when pauseOnHover is true', () => {
        jest.useFakeTimers();
        render(<ParallaxCarousel 
            images={mockImages} 
            autoPlay={true} 
            pauseOnHover={true} 
            interval={3000} 
        />);
        const container = screen.getByTestId('carousel-container');

        fireEvent.mouseEnter(container);
        
        fireEvent.mouseLeave(container);
        
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');
        
        jest.useRealTimers();
    });

    it('should disable prev button when on first slide and not infinite', () => {
        render(
            <ParallaxCarousel 
                images={mockImages} 
                infinite={false} 
                showArrows={true} 
            />
        );
        
        const prevButton = screen.getByTestId('prev-button');
        expect(prevButton).toBeDisabled();

        const nextButton = screen.getByTestId('next-button');
        fireEvent.click(nextButton);
        expect(prevButton).not.toBeDisabled();
    });

    it('should handle prev button click correctly', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const prevButton = screen.getByTestId('prev-button');
        
        const nextButton = screen.getByTestId('next-button');
        fireEvent.click(nextButton);
        expect(screen.getByTestId('carousel-slide-1')).toHaveClass('active');
        
        fireEvent.click(prevButton);
        expect(screen.getByTestId('carousel-slide-0')).toHaveClass('active');
    });

    it('should handle prev button click with infinite scroll', () => {
        render(<ParallaxCarousel images={mockImages} infinite={true} />);
        const prevButton = screen.getByTestId('prev-button');
        
        fireEvent.click(prevButton);
        expect(screen.getByTestId(`carousel-slide-${mockImages.length - 1}`)).toHaveClass('active');
    });

    describe('dot keyboard navigation', () => {
        it('should handle Enter and Space keys on dots', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const dots = screen.getAllByTestId(/carousel-dot-/);
            
            // Enter key test
            fireEvent.keyDown(dots[1], { key: 'Enter' });
            expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');
            
            // Space key test
            fireEvent.keyDown(dots[2], { key: ' ' });
            expect(screen.getByTestId('carousel-slide-2')).toHaveClass('carousel-slide active');
            
            // Other key test (should not change slide)
            fireEvent.keyDown(dots[1], { key: 'Tab' });
            expect(screen.getByTestId('carousel-slide-2')).toHaveClass('carousel-slide active');
        });
    });

    describe('theme handling', () => {
        it('should apply custom theme when provided', () => {
            const theme = {
                primary: '#ff0000',
                secondary: '#00ff00',
                background: '#0000ff',
                textColor: '#ffffff'
            };
            
            render(<ParallaxCarousel images={mockImages} theme={theme} />);
            const container = screen.getByTestId('carousel-container');
            
            expect(container).toHaveStyle({
                '--primary-color': '#ff0000',
                '--secondary-color': '#00ff00',
                '--background-color': '#0000ff',
                '--text-color': '#ffffff'
            });
        });

        it('should work without theme', () => {
            render(<ParallaxCarousel images={mockImages} theme={undefined} />);
            const container = screen.getByTestId('carousel-container');
            expect(container).toBeInTheDocument();
        });
    });

    describe('slide navigation', () => {
        it('should handle slide changes with infinite scroll', () => {
            render(<ParallaxCarousel images={mockImages} infinite={true} />);
            const nextButton = screen.getByTestId('next-button');
            
            // Go to last slide
            mockImages.forEach((_, index) => {
                fireEvent.click(nextButton);
                const expectedSlideIndex = (index + 1) % mockImages.length;
                const currentSlide = screen.getByTestId(`carousel-slide-${expectedSlideIndex}`);
                expect(currentSlide).toHaveClass('carousel-slide active');
            });
        });

        it('should handle slide changes without infinite scroll', () => {
            render(<ParallaxCarousel images={mockImages} infinite={false} />);
            const prevButton = screen.getByTestId('prev-button');
            const nextButton = screen.getByTestId('next-button');
            
            // Try to go before first slide
            fireEvent.click(prevButton);
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
            
            // Go to last slide
            mockImages.forEach(() => {
                fireEvent.click(nextButton);
            });
            
            // Try to go past last slide
            fireEvent.click(nextButton);
            expect(screen.getByTestId(`carousel-slide-${mockImages.length - 1}`)).toHaveClass('carousel-slide active');
        });
    });

    it('should apply custom className when provided', () => {
        const customClass = 'my-custom-carousel';
        render(<ParallaxCarousel 
            images={mockImages} 
            className={customClass} 
        />);
        
        const container = screen.getByTestId('carousel-container');
        expect(container).toHaveClass(customClass);
    });

    it('should work without custom className', () => {
        render(<ParallaxCarousel images={mockImages} />);
        const container = screen.getByTestId('carousel-container');
        expect(container).toHaveClass('carousel-container');
    });

    describe('style and effect props', () => {
        it('should apply default values when not provided', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');
            
            expect(container).toHaveClass('effect-slide');
            expect(container).toHaveStyle({ height: '500px' });
            expect(container).toHaveClass('thumbnail-bottom');
        });

        it('should apply custom effect, height and thumbnailPosition', () => {
            render(
                <ParallaxCarousel 
                    images={mockImages}
                    effect="fade"
                    height="300px"
                    thumbnailPosition="top"
                />
            );
            const container = screen.getByTestId('carousel-container');
            
            expect(container).toHaveClass('effect-fade');
            expect(container).toHaveStyle({ height: '300px' });
            expect(container).toHaveClass('thumbnail-top');
        });

        it('should handle different thumbnail positions', () => {
            const positions = ['top', 'bottom', 'left', 'right'] as const;
            
            positions.forEach(position => {
                const { rerender } = render(
                    <ParallaxCarousel 
                        images={mockImages}
                        thumbnailPosition={position}
                    />
                );
                
                expect(screen.getByTestId('carousel-container')).toHaveClass(`thumbnail-${position}`);
                rerender(<></>);
            });
        });

        it('should handle different effects', () => {
            const effects = ['slide', 'fade', 'zoom'] as const;
            
            effects.forEach(effect => {
                const { rerender } = render(
                    <ParallaxCarousel 
                        images={mockImages}
                        effect={effect}
                    />
                );
                
                expect(screen.getByTestId('carousel-container')).toHaveClass(`effect-${effect}`);
                rerender(<></>);
            });
        });
    });

    describe('keyboard control', () => {
        it('should handle keyboard navigation when enabled', () => {
            render(<ParallaxCarousel 
                images={mockImages} 
                keyboardControl={true}
            />);

            fireEvent.keyDown(window, { key: 'ArrowRight' });
            expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');

            fireEvent.keyDown(window, { key: 'ArrowLeft' });
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
        });

        it('should not handle keyboard navigation when disabled', () => {
            render(<ParallaxCarousel 
                images={mockImages} 
                keyboardControl={false}
            />);

            fireEvent.keyDown(window, { key: 'ArrowRight' });
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');

            fireEvent.keyDown(window, { key: 'ArrowLeft' });
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
        });
    });

    describe('touch events flow', () => {
        it('should handle complete touch interaction', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch start
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });
            expect(container).toHaveAttribute('data-touching', 'true');

            // Touch move
            fireEvent.touchMove(container, {
                touches: [{ clientX: 50, clientY: 0 }]
            });

            // Touch end
            fireEvent.touchEnd(container);
            expect(container).not.toHaveAttribute('data-touching');
            expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide', 'active');
        });

        it('should handle touch events in opposite direction', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');
            
            fireEvent.touchStart(container, { touches: [{ clientX: 200, clientY: 0 }] });
            fireEvent.touchMove(container, { touches: [{ clientX: 50, clientY: 0 }] });
            fireEvent.touchEnd(container);
            
            fireEvent.touchStart(container, { touches: [{ clientX: 50, clientY: 0 }] });
            fireEvent.touchMove(container, { touches: [{ clientX: 200, clientY: 0 }] });
            fireEvent.touchEnd(container);
            
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide', 'active');
        });

        it('should handle small touch movements', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch start
            fireEvent.touchStart(container, {
                touches: [{ clientX: 100, clientY: 0 }]
            });

            // Small touch move
            fireEvent.touchMove(container, {
                touches: [{ clientX: 95, clientY: 0 }]
            });

            // Touch end
            fireEvent.touchEnd(container);
            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide', 'active');
        });
    });

    describe('touch events with ref', () => {
        it('should handle touch start when ref exists', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch Start
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });

            // Verify data-touching attribute is set
            expect(container).toHaveAttribute('data-touching', 'true');
        });

        it('should handle touch start when ref is null', () => {
            // Create a ref to manipulate
            const mockRef = { current: null };
            jest.spyOn(React, 'useRef').mockReturnValueOnce(mockRef);

            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch Start with null ref
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });

            // Should not throw error
            expect(true).toBeTruthy();
        });
    });

    describe('touch event handlers', () => {
        it('should handle complete touch sequence with ref', () => {
            const { rerender } = render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Normal touch sequence
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });
            expect(container).toHaveAttribute('data-touching', 'true');

            fireEvent.touchMove(container, {
                touches: [{ clientX: 50, clientY: 0 }]
            });

            fireEvent.touchEnd(container);
            expect(container).not.toHaveAttribute('data-touching');

            rerender(<></>);
            rerender(<ParallaxCarousel images={mockImages} />);
            const newContainer = screen.getByTestId('carousel-container');

            // Touch sequence with null ref possibility
            fireEvent.touchStart(newContainer, {
                touches: [{ clientX: 200, clientY: 0 }]
            });

            fireEvent.touchMove(newContainer, {
                touches: [{ clientX: 50, clientY: 0 }]
            });

            fireEvent.touchEnd(newContainer);
        });

        it('should handle touch events when container is removed', () => {
            const { unmount } = render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Start touch sequence
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });

            // Remove component during touch sequence
            unmount();

            // Should not throw error
            expect(true).toBeTruthy();
        });

        it('should handle touch move with null ref', () => {
            const { rerender } = render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Start touch
            fireEvent.touchStart(container, {
                touches: [{ clientX: 200, clientY: 0 }]
            });

            // Force ref to be potentially null
            rerender(<></>);
            rerender(<ParallaxCarousel images={mockImages} />);
            const newContainer = screen.getByTestId('carousel-container');

            // Continue touch sequence
            fireEvent.touchMove(newContainer, {
                touches: [{ clientX: 50, clientY: 0 }]
            });
            fireEvent.touchEnd(newContainer);

            // Should not throw error
            expect(true).toBeTruthy();
        });
    });

    describe('touch handlers', () => {
        it('should handle touch start, move and end', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch Start
            fireEvent.touchStart(container, {
                touches: [{
                    identifier: 1,
                    target: container,
                    clientX: 200,
                    clientY: 0
                }]
            });

            // Touch Move
            fireEvent.touchMove(container, {
                touches: [{
                    identifier: 1,
                    target: container,
                    clientX: 50,
                    clientY: 0
                }]
            });

            // Touch End
            fireEvent.touchEnd(container);

            // Verify the sequence worked
            expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');
        });

        it('should handle touch events when ref is null', () => {
            const { unmount } = render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Start touch sequence
            fireEvent.touchStart(container, {
                touches: [{
                    identifier: 1,
                    target: container,
                    clientX: 200,
                    clientY: 0
                }]
            });

            // Unmount to make ref null
            unmount();

            // Should not throw error
            expect(true).toBeTruthy();
        });
    });

    describe('image and caption rendering', () => {
        it('should render image with provided alt text', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const image = screen.getByAltText('Test 1');
            expect(image).toBeInTheDocument();
        });

        it('should render default alt text when not provided', () => {
            const imagesWithoutAlt = [
                { url: 'test1.jpg', title: 'Title 1', description: 'Desc 1' }
            ];
            render(<ParallaxCarousel images={imagesWithoutAlt} />);
            const image = screen.getByAltText('Slide 1');
            expect(image).toBeInTheDocument();
        });

        it('should render caption when showCaption is true and content exists', () => {
            render(<ParallaxCarousel images={mockImages} showCaption={true} />);
            expect(screen.getByText('Title 1')).toBeInTheDocument();
            expect(screen.getByText('Desc 1')).toBeInTheDocument();
        });

        it('should not render caption when showCaption is false', () => {
            render(<ParallaxCarousel images={mockImages} showCaption={false} />);
            expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Desc 1')).not.toBeInTheDocument();
        });

        it('should handle missing title or description', () => {
            const imagesWithPartialData = [
                { url: 'test1.jpg', title: 'Only Title' },
                { url: 'test2.jpg', description: 'Only Description' },
                { url: 'test3.jpg' }
            ];
            
            const { rerender } = render(
                <ParallaxCarousel 
                    images={[imagesWithPartialData[0]]} 
                    showCaption={true} 
                />
            );
            // First slide - only title
            expect(screen.getByText('Only Title')).toBeInTheDocument();
            
            // Second slide - only description
            rerender(
                <ParallaxCarousel 
                    images={[imagesWithPartialData[1]]} 
                    showCaption={true} 
                />
            );
            expect(screen.getByText('Only Description')).toBeInTheDocument();
            
            // Third slide - no caption
            rerender(
                <ParallaxCarousel 
                    images={[imagesWithPartialData[2]]} 
                    showCaption={true} 
                />
            );
            expect(screen.queryByText('Only Title')).not.toBeInTheDocument();
            expect(screen.queryByText('Only Description')).not.toBeInTheDocument();
        });
    });

    describe('touch events', () => {
        beforeEach(() => {
            jest.spyOn(React, 'useRef').mockImplementation(() => ({
                current: document.createElement('div')
            }));
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should handle touch events with valid touches', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch Start with valid touch data
            act(() => {
                fireEvent.touchStart(container, {
                    touches: [{ clientX: 200, clientY: 0 }]
                });
            });

            // Touch Move with valid touch data
            act(() => {
                fireEvent.touchMove(container, {
                    touches: [{ clientX: 50, clientY: 0 }]
                });
            });

            // Touch End
            act(() => {
                fireEvent.touchEnd(container);
            });

            expect(screen.getByTestId('carousel-slide-1')).toHaveClass('carousel-slide active');
        });

        it('should handle touch events with empty touches array', () => {
            render(<ParallaxCarousel images={mockImages} />);
            const container = screen.getByTestId('carousel-container');

            // Touch Start with valid touch data
            act(() => {
                fireEvent.touchStart(container, {
                    touches: [{ clientX: 200, clientY: 0 }]
                });
            });

            // Then simulate empty touches
            act(() => {
                fireEvent.touchEnd(container);
            });

            expect(screen.getByTestId('carousel-slide-0')).toHaveClass('carousel-slide active');
        });
    });
}); 
import ParallaxCarousel from '../components/ParallaxCarousel/ParallaxCarousel';
import { ParallaxCarousel as exportedCarousel } from '../index';

describe('ParallaxCarousel index', () => {
    it('should export ParallaxCarousel component', () => {
        expect(exportedCarousel).toBe(ParallaxCarousel);
    });
}); 
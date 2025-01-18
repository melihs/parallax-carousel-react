# React Parallax Carousel

A modern, customizable, and responsive React carousel component. Includes touch support, parallax effects, and many features.

## 🚀 Features

- ✨ Parallax effects
- 📱 Touch and swipe support
- 🎨 Customizable theme
- 🖼️ Thumbnail view
- ⌨️ Keyboard control
- 🔄 Autoplay
- 🎯 Dot navigation
- ➡️ Arrow controls
- 📝 Title and description support
- 📱 Fully responsive design

## File Structure

```md
parallax-carousel-react/
├── src/
│   ├── __tests__/
│   ├── components/
│   ├── types/
│   ├── index.ts
│   └── setupTests.ts
├── coverage/
├── README.md
├── jest.config.js
├── tsconfig.json
├── rollup.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

## 📦 Installation

```bash
npm install parallax-carousel-react
# or
yarn add parallax-carousel-react
```

## 💻 Usage

```jsx
import { ParallaxCarousel } from "parallax-carousel-react";

const App = () => {
	const images = [
		{
			url: "/path/to/image1.jpg",
			alt: "First Slide",
			title: "Title 1",
			description: "Description 1",
		},
		{
			url: "/path/to/image2.jpg",
			alt: "Second Slide",
			title: "Title 2",
			description: "Description 2",
		},
	];

	return (
		<ParallaxCarousel
			images={images}
			interval={5000}
			showArrows={true}
			showDots={true}
			showThumbnails={true}
			autoPlay={true}
			pauseOnHover={true}
			theme={{
				primary: "#007bff",
				secondary: "#6c757d",
				background: "#000",
				textColor: "#fff",
			}}
			effect="slide"
			height="500px"
			thumbnailPosition="bottom"
			showCaption={true}
			infinite={true}
			keyboardControl={true}
			onSlideChange={(index) => console.log(`Current slide: ${index}`)}
		/>
	);
};
```

## 🌟 Examples

### Basic Usage

```jsx
<ParallaxCarousel images={images} />
```

### Full Customization

```jsx
<ParallaxCarousel
	images={images}
	interval={3000}
	showArrows={true}
	showDots={true}
	showThumbnails={true}
	thumbnailPosition="left"
	effect="zoom"
	height="600px"
	showCaption={true}
	theme={customTheme}
/>
```

## ⚙️ Props

| Prop              | Type                                   | Default   | Description                   |
| ----------------- | -------------------------------------- | --------- | ----------------------------- |
| images            | Array<CarouselImage>                   | required  | Array of images               |
| interval          | number                                 | 5000      | Auto transition duration (ms) |
| showArrows        | boolean                                | true      | Show/hide arrow controls      |
| showDots          | boolean                                | true      | Show/hide dot navigation      |
| showThumbnails    | boolean                                | false     | Show/hide thumbnails          |
| autoPlay          | boolean                                | true      | Auto play                     |
| pauseOnHover      | boolean                                | true      | Pause on hover                |
| theme             | CarouselTheme                          | undefined | Custom theme settings         |
| effect            | 'slide' \| 'fade' \| 'zoom'            | 'slide'   | Transition effect             |
| height            | string \| number                       | '500px'   | Carousel height               |
| thumbnailPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom'  | Thumbnail position            |
| showCaption       | boolean                                | false     | Show title and description    |
| infinite          | boolean                                | true      | Infinite loop                 |
| keyboardControl   | boolean                                | true      | Keyboard control              |
| onSlideChange     | function                               | undefined | Slide change callback         |

## 🔧 Type Definitions

```jsx
interface CarouselImage {
	url: string;
	alt?: string;
	title?: string;
	description?: string;
}

interface CarouselTheme {
	primary?: string;
	secondary?: string;
	background?: string;
	textColor?: string;
}
```

## 🎨 Theme Customization

```jsx
const theme = {
	primary: "#007bff", // Primary color
	secondary: "#6c757d", // Secondary color
	background: "#000", // Background color
	textColor: "#fff", // Text color
};
<ParallaxCarousel theme={theme} />;
```

## 📱 Mobile Support

- Touch and swipe gestures
- Responsive design
- Mobile-friendly thumbnail view
- Touch-friendly controls

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 🐛 Reporting Issues

Report issues via [GitHub Issues](https://github.com/melihs/parallax-carousel-react/issues).

## Changelog

For a detailed list of changes, please see the [CHANGELOG.md](CHANGELOG.md).

## �� Authors

- Melih Şahin & AI - [GitHub](https://github.com/melihs)

## 🙏 Acknowledgements

Thanks to everyone who contributed to this project!

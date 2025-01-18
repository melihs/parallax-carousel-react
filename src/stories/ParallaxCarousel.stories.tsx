import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ParallaxCarousel } from "../components/ParallaxCarousel/ParallaxCarousel";

const images = [
  {
    url: "https://picsum.photos/id/1018/1000/600",
    alt: "Nature 1",
    title: "Beautiful Mountain",
    description: "A scenic mountain view with snow caps",
  },
  {
    url: "https://picsum.photos/id/1015/1000/600",
    alt: "Nature 2",
    title: "Forest Stream",
    description: "A peaceful stream running through a forest",
  },
  {
    url: "https://picsum.photos/id/1019/1000/600",
    alt: "Nature 3",
    title: "Ocean View",
    description: "Waves crashing on rocky shore",
  },
];

const meta: Meta<typeof ParallaxCarousel> = {
  title: "Components/ParallaxCarousel",
  component: ParallaxCarousel,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
  args: {
    images: images,
    interval: 5000,
    showArrows: true,
    showDots: true,
    showThumbnails: false,
    autoPlay: false,
    pauseOnHover: true,
    effect: "slide",
    height: "400px",
    thumbnailPosition: "bottom",
    showCaption: true,
    infinite: true,
    keyboardControl: true,
    theme: {
      primary: "#007bff",
      secondary: "#6c757d",
      background: "#ffffff",
      textColor: "#000000",
    },
    onSlideChange: fn(),
  },
  argTypes: {
    interval: {
      control: "number",
      description: "Interval between slides in milliseconds",
    },
    showArrows: {
      control: "boolean",
      description: "Show navigation arrows",
    },
    showDots: {
      control: "boolean",
      description: "Show navigation dots",
    },
    showThumbnails: {
      control: "boolean",
      description: "Show thumbnail navigation",
    },
    autoPlay: {
      control: "boolean",
      description: "Enable auto-play",
    },
    pauseOnHover: {
      control: "boolean",
      description: "Pause auto-play on hover",
    },
    effect: {
      control: "select",
      options: ["slide", "fade", "zoom"],
      description: "Transition effect between slides",
    },
    height: {
      control: "text",
      description: "Height of the carousel",
    },
    thumbnailPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position of thumbnails",
    },
    showCaption: {
      control: "boolean",
      description: "Show image captions",
    },
    infinite: {
      control: "boolean",
      description: "Enable infinite loop",
    },
    keyboardControl: {
      control: "boolean",
      description: "Enable keyboard navigation",
    },
    theme: {
      control: "object",
      description: "Custom theme configuration",
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ParallaxCarousel>;

// Basic usage
export const Basic: Story = {
  args: {
    images: images,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic carousel with default settings. Try different viewport sizes to see responsive behavior.",
      },
    },
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    images: images,
    interval: 3000,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    autoPlay: true,
    pauseOnHover: true,
    effect: "slide",
    height: "500px",
    thumbnailPosition: "bottom",
    showCaption: true,
    infinite: true,
    keyboardControl: true,
    theme: {
      primary: "#007bff",
      secondary: "#6c757d",
      background: "#000",
      textColor: "#fff",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full-featured carousel with all options enabled. Responsive design adapts to different screen sizes.",
      },
    },
  },
};

// Mobile Optimized
export const MobileOptimized: Story = {
  args: {
    images: images,
    showArrows: true,
    showDots: true,
    showThumbnails: false,
    autoPlay: false,
    effect: "slide",
    height: "300px",
    showCaption: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobileLarge",
    },
    docs: {
      description: {
        story:
          "Mobile-optimized version with simplified controls and adjusted dimensions.",
      },
    },
  },
};

// Tablet Layout
export const TabletLayout: Story = {
  args: {
    images: images,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    thumbnailPosition: "bottom",
    effect: "slide",
    height: "400px",
    showCaption: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story:
          "Tablet-optimized layout with adjusted thumbnail position and dimensions.",
      },
    },
  },
};

// Custom Theme
export const CustomTheme: Story = {
  args: {
    images: images,
    showArrows: true,
    showDots: true,
    theme: {
      primary: "#ff4081",
      secondary: "#9c27b0",
      background: "#1a1a1a",
      textColor: "#ffffff",
    },
  },
};

// Different Effects
export const ZoomEffect: Story = {
  args: {
    images: images,
    effect: "zoom",
    interval: 2000,
    autoPlay: true,
  },
};

export const FadeEffect: Story = {
  args: {
    images: images,
    effect: "fade",
    interval: 2000,
    autoPlay: true,
  },
};

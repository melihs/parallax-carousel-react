import React from 'react';
import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  mobileLarge: {
    name: 'Mobile Large',
    styles: {
      width: '425px',
      height: '896px',
    },
  },
  mobileSmall: {
    name: 'Mobile Small',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    viewport: {
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      },
      defaultViewport: 'desktop',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: 0, padding: 0 }}>
        <Story />
      </div>
    ),
  ],
};

export default preview; 
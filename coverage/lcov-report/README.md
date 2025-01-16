# React Parallax Carousel

Modern, özelleştirilebilir ve duyarlı bir React carousel bileşeni. Touch desteği, parallax efektleri ve birçok özellik içerir.

## 🚀 Özellikler

- ✨ Parallax efektleri
- 📱 Touch ve swipe desteği
- 🎨 Özelleştirilebilir tema
- 🖼️ Küçük resim görünümü
- ⌨️ Klavye kontrolü
- 🔄 Otomatik oynatma
- 🎯 Nokta navigasyonu
- ➡️ Ok kontrolleri
- 📝 Başlık ve açıklama desteği
- 📱 Tam responsive tasarım

## Dosya Yapısı
```md
parallax-carousel-react/
├── src/
│   ├── components/
│   │   └── ParallaxCarousel/
│   │       ├── ParallaxCarousel.tsx
│   │       ├── ParallaxCarousel.css
│   │       └── ParallaxCarousel.test.tsx
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── jest.config.js
├── tsconfig.json
└── package.json
```

## 📦 Kurulum

```bash
npm install parallax-carousel-react
# veya
yarn add parallax-carousel-react
```

## 💻 Kullanım
```jsx
import { ParallaxCarousel } from 'parallax-carousel-react';

const App = () => {
  const images = [
    {
      url: '/path/to/image1.jpg',
      alt: 'İlk Slayt',
      title: 'Başlık 1',
      description: 'Açıklama 1'
    },
    {
      url: '/path/to/image2.jpg',
      alt: 'İkinci Slayt',
      title: 'Başlık 2',
      description: 'Açıklama 2'
    }
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
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#000',
    textColor: '#fff'
    }}
    effect="slide"
    height="500px"
    thumbnailPosition="bottom"
    showCaption={true}
    infinite={true}
    keyboardControl={true}
    onSlideChange={(index) => console.log(`Mevcut slayt: ${index}`)}
    />
  );
};
```

## 🌟 Örnekler

### Basit Kullanım
```jsx
<ParallaxCarousel images={images} />
```

### Tam Özelleştirme
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
| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|-----------|
| images | Array<CarouselImage> | gerekli | Görüntü dizisi |
| interval | number | 5000 | Otomatik geçiş süresi (ms) |
| showArrows | boolean | true | Ok kontrollerini göster/gizle |
| showDots | boolean | true | Nokta navigasyonunu göster/gizle |
| showThumbnails | boolean | false | Küçük resimleri göster/gizle |
| autoPlay | boolean | true | Otomatik oynatma |
| pauseOnHover | boolean | true | Hover'da duraklat |
| theme | CarouselTheme | undefined | Özel tema ayarları |
| effect | 'slide' \| 'fade' \| 'zoom' | 'slide' | Geçiş efekti |
| height | string \| number | '500px' | Carousel yüksekliği |
| thumbnailPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Küçük resim konumu |
| showCaption | boolean | false | Başlık ve açıklamayı göster |
| infinite | boolean | true | Sonsuz döngü |
| keyboardControl | boolean | true | Klavye kontrolü |
| onSlideChange | function | undefined | Slayt değişim callback'i |

## 🔧 Tip Tanımlamaları
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

## 🎨 Tema Özelleştirme
```jsx
const theme = {
primary: '#007bff', // Ana renk
secondary: '#6c757d', // İkincil renk
background: '#000', // Arkaplan rengi
textColor: '#fff' // Metin rengi
};
<ParallaxCarousel theme={theme} />
```

## 📱 Mobil Desteği

- Touch ve swipe hareketleri
- Responsive tasarım
- Mobil cihazlara uygun küçük resim görünümü
- Dokunmatik dostu kontroller

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 🐛 Hata Bildirimi

Hataları [GitHub Issues](https://github.com/melihs/parallax-carousel-react/issues) üzerinden bildirebilirsiniz.

## 📦 Sürüm Geçmişi

- **1.0.0**
  - İlk sürüm
  - Temel carousel özellikleri
  - Touch desteği
  - Parallax efektleri

## 👥 Yazarlar

- Melih Şahin & AI - [GitHub](https://github.com/melihs)

## 🙏 Teşekkürler
Bu projeye katkıda bulunan herkese teşekkürler!
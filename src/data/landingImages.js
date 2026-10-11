import sky from '@/assets/images/landing/043f4637e45f11f3ff284d501c294223.jpg'
import portrait from '@/assets/images/landing/517436d125482d2bc04d730da6e75080.jpg'
import friends from '@/assets/images/landing/72909c4b6ff4a353b71070984b2e5849.jpg'
import evening from '@/assets/images/landing/b10a431a26c9a423343b2a41be220464.jpg'

// Replace these imports with local images. Repeated tiles share the same URL.
const photos = [sky, portrait, friends, evening]

export const landingImages = [
  { photo: 3, position: '65% 50%', wide: true },
  { photo: 0, position: '45% 35%' },
  { photo: 2, position: '70% 50%' },
  { photo: 1, position: '50% 40%' },
  { photo: 0, position: '70% 50%' },
  { photo: 1, position: '45% 35%', wide: true },
  { photo: 3, position: '35% 50%' },
  { photo: 2, position: '50% 50%' },
  { photo: 2, position: '60% 50%' },
  { photo: 3, position: '55% 45%' },
  { photo: 0, position: '40% 40%', wide: true },
  { photo: 1, position: '60% 50%' },
].map((tile, index) => ({
  id: 'photo-' + index,
  src: photos[tile.photo],
  position: tile.position,
  wide: Boolean(tile.wide),
}))

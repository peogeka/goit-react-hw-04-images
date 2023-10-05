import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export function ImageGallery({ items, onClick }) {
  return (
    <div>
      <List className="gallery">
        {items.map(item => (
          <ImageGalleryItem item={item} key={item.id} onClick={onClick} />
        ))}
      </List>
    </div>
  );
}

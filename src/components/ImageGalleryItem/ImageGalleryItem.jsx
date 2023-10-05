import { ListItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ onClick, item }) {
  return (
    <>
      <ListItem className="gallery-item" onClick={() => onClick(item)}>
        <Image src={item.webformatURL} alt={item.tags} />
      </ListItem>
    </>
  );
}

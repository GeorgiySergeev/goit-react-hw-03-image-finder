import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ showModal, image, largeImage }) => {
  return (
    <GalleryItem
      onClick={e => {
        showModal(largeImage);
      }}
    >
      <ImageGalleryItemImage src={image} alt="" />
    </GalleryItem>
  );
};

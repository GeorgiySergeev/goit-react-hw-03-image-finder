import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadingSpinner } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fatchHits } from 'helpers/api-servise';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    query: this.props.query,
    images: [],
    page: 1,
    showModal: false,
    modalImg: '',
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const response = await fatchHits(this.props.query, this.state.page);
      if (response.hits.length === 0) {
        toast('Upsss, no image find!');
        this.setState({ loading: false });
        return;
      }

      if (response && response.hits) {
        if (prevProps.query !== this.props.query) {
          this.setState({ images: response.hits, loading: false });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            loading: false,
          }));
        }
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = img => {
    this.setState({ showModal: true, modalImg: img });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, loading, showModal, modalImg } = this.state;
    return (
      <>
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL }, index) => {
            return (
              <ImageGalleryItem
                key={index}
                showModal={this.openModal}
                image={webformatURL}
                largeImage={largeImageURL}
              />
            );
          })}
          {loading && <LoadingSpinner />}
          {showModal && (
            <Modal
              showModal={this.openModal}
              closeModal={this.closeModal}
              modalImage={modalImg}
            ></Modal>
          )}
        </Gallery>
        {images.length !== 0 && (
          <Button onLoadMore={this.handleLoadMore}>Load More</Button>
        )}
      </>
    );
  }
}

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';
import { Component } from 'react';
import { fatchHits } from 'helpers/api-servise';
import { LoadingSpinner } from 'components/Loader/Loader';
// import { loadData } from 'helpers/loadData';

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
        alert('No images find!');
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
    return (
      <>
        <Gallery>
          {this.state.images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                showModal={this.openModal}
                image={webformatURL}
                largeImage={largeImageURL}
              />
            );
          })}
          {this.state.loading && <LoadingSpinner />}
          {this.state.showModal && (
            <Modal
              showModal={this.openModal}
              closeModal={this.closeModal}
              modalImage={this.state.modalImg}
            ></Modal>
          )}
        </Gallery>
        {this.state.images.length !== 0 && (
          <Button onLoadMore={this.handleLoadMore}>Load More</Button>
        )}
      </>
    );
  }
}
//!=======================================
// export class ImageGallery extends Component {
//   state = {
//     query: this.props.query,
//     images: [],
//     page: 1,
//     showModal: false,
//     modalImg: '',
//     loading: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const shouldFetchData =
//       prevProps.query !== this.props.query ||
//       prevState.page !== this.state.page;

//     if (shouldFetchData) {
//       await this.loadData();
//     }
//   }

//   async loadData() {
//     this.setState({ loading: true });
//     const response = await loadData(this.props.query, this.state.page);

//     if (response && response.hits) {
//       if (this.props.query !== this.state.query) {
//         this.setState({ images: response.hits, loading: false });
//       } else {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.hits],
//           loading: false,
//         }));
//       }
//     }
//   }

//   // async componentDidUpdate(prevProps, prevState) {
//   //   if (
//   //     prevProps.query !== this.props.query ||
//   //     prevState.page !== this.state.page
//   //   ) {
//   //     this.setState({ loading: true });

//   //     // const response = await fatchHits(this.props.query, this.state.page);
//   //     // if (response.hits.length === 0) {
//   //     //   alert('No images find!');
//   //     //   this.setState({ loading: false });
//   //     //   return;
//   //     // }
//   //     loadData(this.props.query, this.state.page).then(response => {
//   //       console.log(response);
//   //     });
//   //   }
//   // }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = img => {
//     this.setState({ showModal: true, modalImg: img });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const { images, loading, showModal, modalImg } = this.state;
//     return (
//       <>
//         <Gallery>
//           {images.map(({ id, webformatURL, largeImageURL }) => {
//             return (
//               <ImageGalleryItem
//                 key={id}
//                 showModal={this.openModal}
//                 image={webformatURL}
//                 largeImage={largeImageURL}
//               />
//             );
//           })}
//           {loading && <LoadingSpinner />}
//           {showModal && (
//             <Modal
//               showModal={this.openModal}
//               closeModal={this.closeModal}
//               modalImage={modalImg}
//             ></Modal>
//           )}
//         </Gallery>
//         {images.length !== 0 && (
//           <Button onLoadMore={this.handleLoadMore}>Load More</Button>
//         )}
//       </>
//     );
//   }
// }

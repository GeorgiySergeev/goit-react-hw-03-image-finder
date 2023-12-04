import { fatchHits } from './api-servise';

export async function loadData(query, page) {
  const response = await fatchHits(query, page);
  if (response.hits.length === 0) {
    alert('No images find!');
    return { hits: [] };
  }
  return response;
}

// if (response && response.hits) {
//     if (prevProps.query !== this.props.query) {
//       this.setState({ images: response.hits, loading: false });
//     } else {
//       this.setState(prevState => ({
//         images: [...prevState.images, ...response.hits],
//         loading: false,
//       }));
//     }
//   }

//!
// export class ImageGallery extends Component {
//     state = {
//       query: this.props.query,
//       images: [],
//       page: 1,
//       showModal: false,
//       modalImg: '',
//       loading: false,
//     };

//     async componentDidUpdate(prevProps, prevState) {
//       const shouldFetchData =
//         prevProps.query !== this.props.query ||
//         prevState.page !== this.state.page;

//       if (shouldFetchData) {
//         await this.loadData();
//       }
//     }

//     async loadData() {
//       this.setState({ loading: true });
//       const response = await loadData(this.props.query, this.state.page);

//       if (response && response.hits) {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.hits],
//           loading: false,
//         }));
//       }
//     }

//     handleLoadMore = () => {
//       this.setState(
//         prevState => ({ page: prevState.page + 1 }),
//         () => this.loadData()
//       );
//     };

//     openModal = img => {
//       this.setState({ showModal: true, modalImg: img });
//     };

//     closeModal = () => {
//       this.setState({ showModal: false });
//     };

//     render() {
//       const { images, loading, showModal, modalImg } = this.state;

//       return (
//         <>
//           <Gallery>
//             {images.map(({ id, webformatURL, largeImageURL }) => (
//               <ImageGalleryItem
//                 key={id}
//                 showModal={this.openModal}
//                 image={webformatURL}
//                 largeImage={largeImageURL}
//               />
//             ))}
//           </Gallery>
//           {loading && <LoadingSpinner />}
//           {showModal && (
//             <Modal
//               showModal={this.openModal}
//               closeModal={this.closeModal}
//               modalImage={modalImg}
//             />
//           )}
//           {images.length !== 0 && (
//             <Button onLoadMore={this.handleLoadMore}>Load More</Button>
//           )}
//         </>
//       );
//     }
//   }

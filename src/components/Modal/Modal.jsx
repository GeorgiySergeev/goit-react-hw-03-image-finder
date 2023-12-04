import { Overlay, MolalForm } from './Modal.styled';
import { createPortal } from 'react-dom';
// import icon from '../../logo512.png';
import { Component } from 'react';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  state = {
    showModal: true,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackDropClick = e => {
    if (e.target.id === 'overlay') this.props.closeModal();
  };

  render() {
    console.log(this.props);
    return createPortal(
      <Overlay id="overlay" onClick={this.handleBackDropClick}>
        <MolalForm>
          {this.props.children}
          <img src={this.props.modalImage} alt="" />
        </MolalForm>
      </Overlay>,
      modalRoot
    );
  }
}

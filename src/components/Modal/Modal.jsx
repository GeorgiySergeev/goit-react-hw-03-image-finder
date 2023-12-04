import { createPortal } from 'react-dom';
import { Component } from 'react';

import { Overlay, MolalForm } from './Modal.styled';

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

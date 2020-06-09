import React, { Component } from 'react';
import ModalTrigger from './ModalTrigger'
import Modal from './Modal'
import AddThesisComponent from '../Thesis/AddThesisComponent';

export class ModalContainer extends Component {
    state = { 
        isShown: false 
    };

    showModal = () => {
        this.setState({ isShown: true }, () => {
          this.closeButton.focus();
        });
    };

    closeModal = () => {
        this.setState({ isShown: false });
        this.ModalTrigger.focus();
    };

    onKeyDown = (event) => {
        if (event.keyCode === 27) {
          this.closeModal();
        }
    };

    onClickOutside = (event) => {
        if (this.modal && this.modal.contains(event.target)) return;
        this.closeModal();
    };

    render() {

        const modal = (
            <Modal
                modalRef={(n) => (this.modal = n)}
                buttonRef={(n) => (this.closeButton = n)}
                closeModal={this.closeModal}
                onKeyDown={this.onKeyDown}
                onClickOutside={this.onClickOutside}
                modalAction={this.props.modalAction}
                thesisId={this.props.thesisId}
            />
        );

        return (
            <React.Fragment>
                {this.props.ButtonAsTrigger ? 
                <ModalTrigger 
                    showModal={this.showModal}
                    buttonRef={(n) => (this.ModalTrigger = n)}
                    triggerText={this.props.triggerText}
                    insideTable={this.props.table}
                /> :
                <AddThesisComponent 
                    showModal={this.showModal}
                    buttonRef={(n) => (this.ModalTrigger = n)}
                    triggerText={this.props.triggerText}
                />}

                {this.state.isShown ? modal : null}
            </React.Fragment>
        );
    }
}

export default ModalContainer;
import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { createUseStyles } from 'react-jss';
import AddThesisModalFormContainer from './AddThesis/AddThesisModalFormContainer';
import SelectUserModalFormContainer from './SelectUser/SelectUserModalFormContainer';
import ThesisDetailsModalFormContainer from './ThesisDetails/ThesisDetailsModalFormContainer';


const Modal = ({
  modalAction,
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal
}) => {

  const modals = {
      addThesis: AddThesisModalFormContainer,
      selectUser: SelectUserModalFormContainer,
      thesisDetails: ThesisDetailsModalFormContainer
  }

  const classes = useStyles();
  const SpecificModal = modals[modalAction];
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className={classes._modalCover}
        onClick={onClickOutside}
        onKeyDown={onKeyDown}>
        <div className={classes._modalArea} ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className={classes._modalClose}
            onClick={closeModal}>
            <span id="close-modal" className={classes._hideVisual}>
              Close
            </span>
            <svg className={classes._modalCloseIcon} viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className={classes._modalBody}>
            <SpecificModal closeModal={closeModal}/>
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

const useStyles = createUseStyles({
    _modalClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '0.5em',
        'line-height': 1,
        background: '#f6f6f7',
        border: 0,
        'box-shadow': 0,
        cursor: 'pointer',
    },
    _modalCloseIcon: {
        width: '25px',
        height: '25px',
        fill: 'transparent',
        stroke: 'black',
        'stroke-linecap': 'round',
        'stroke-width': 2
    },
    _modalArea: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: '2.5em 1.5em 1.5em 1.5em',
        'background-color': '#ffffff',
        'box-shadow': '0 0 10px 3px rgba(0, 0, 0, 0.1)',
        'overflow-y': 'auto',
        '-webkit-overflow-scrolling': 'touch'
    },
    '@media screen and (min-width: 500px)': {
        _modalArea: {
            left: '50%',
            top: '50%',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            'max-width': '80em',
            'max-height': 'calc(100% - 1em)'
        }
    },
    _modalBody: {
        'padding-top': '0.25em'
    },
    _hideVisual: {
        border: '0 !important',
        clip: 'rect(0 0 0 0) !important',
        height: '1px !important',
        margin: '-1px !important',
        overflow: 'hidden !important',
        padding: '0 !important',
        position: 'absolute !important',
        width: '1px !important',
        'white-space': 'nowrap !important',
    },
    _modalCover: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'z-index': 10,
        transform: 'translateZ(0)',
        'background-color': 'rgba(0, 0, 0, 0.8)'
      }
});

export default Modal;

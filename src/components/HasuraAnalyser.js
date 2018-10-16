import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

// Modal.setAppElement('#graphiql')

export class HasuraAnalyser extends React.Component {
  render() {
    return (
      <Modal isOpen ariaHideApp={false}>
        <h2>Hasura Analyser</h2>
      </Modal>
    );
  }
}

export default HasuraAnalyser;

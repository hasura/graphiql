import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';
export default class HasuraAnalyser extends React.Component {
  constructor() {
    super();
    Modal.setAppElement('body');
    this.state = {
      analyseData: [
        {
          field: 'node-1',
          sql: 'Generated sql 1',
          plan: ['Execution plan 1'],
        },
        {
          field: 'node-2',
          sql: 'Generated sql 2',
          plan: ['Execution plan 2'],
        },
        {
          field: 'node-3',
          sql: 'Generated sql 3',
          plan: ['Execution plan 3'],
        },
      ],
      activeNode: 0,
    };
  }
  fetchAnalyse() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
    options.body = JSON.stringify(this.props.analyseQuery);
    return fetch('http://localhost:8080/v1alpha1/graphql/explain', options);
  }
  componentDidMount() {
    this.fetchAnalyse(this.props.analyseQuery)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject('Invalid response json returned');
      })
      .then(data => {
        this.setState({
          ...this.state,
          analyseData: data,
          activeNode: 0,
        });
      })
      .catch(e => {});
  }
  handleAnalyseNodeChange(e) {
    let nodeKey = e.target.getAttribute('data-key');
    if (nodeKey) {
      nodeKey = parseInt(nodeKey);
      this.setState({ ...this.state, activeNode: nodeKey });
    }
  }
  render() {
    const { show, analyseQuery, clearAnalyse } = this.props;
    const analysisList = this.state.analyseData.map((analysis, i) => {
      return (
        <li
          className={i === this.state.activeNode ? 'active' : ''}
          key={i}
          data-key={i}
          onClick={this.handleAnalyseNodeChange.bind(this)}>
          <i className="fa fa-table" aria-hidden="true" />
          {analysis.field}
        </li>
      );
    });
    return (
      <Modal
        className="modalWrapper"
        overlayClassName="myOverlayClass"
        isOpen={show}>
        <div className="modalHeader">
          <div className="modalTitle">Query Analysis</div>
          <div className="modalClose">
            <button onClick={clearAnalyse} className="form-control">
              x
            </button>
          </div>
        </div>
        <div className="modalBody">
          <div className="wd25">
            <div className="topLevelNodesWrapper">
              <div className="title">Top level nodes</div>
              <ul>{analysisList}</ul>
            </div>
          </div>
          <div className="wd75">
            <div className="analysisWrapper">
              <div className="plansWrapper">
                <div className="overflowAuto">
                  <div className="plansTitle">Generated SQL</div>
                  <div className="codeBlock">
                    <code>
                      {this.state.activeNode >= 0
                        ? this.state.analyseData[this.state.activeNode].sql
                        : ''}
                    </code>
                  </div>
                </div>
                <div className="overflowAuto">
                  <div className="plansTitle">Execution Plan</div>
                  <div className="codeBlock">
                    <code>
                      {this.state.activeNode >= 0
                        ? this.state.analyseData[
                            this.state.activeNode
                          ].plan.join('')
                        : ''}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

HasuraAnalyser.propTypes = {
  show: PropTypes.bool.isRequired,
  analyseQuery: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  clearAnalyse: PropTypes.func.isRequired,
};

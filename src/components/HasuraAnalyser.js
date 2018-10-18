import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';
import AceEditor from 'react-ace';
export default class HasuraAnalyser extends React.Component {
  constructor() {
    super();
    Modal.setAppElement('body');
    this.state = {
      analyseData: [
        {
          id: 1,
          field: 'node-1',
          generated_sql: 'Generated sql 1',
          execution_plan: 'Execution plan 1',
        },
        {
          id: 2,
          field: 'node-2',
          generated_sql: 'Generated sql 2',
          execution_plan: 'Execution plan 2',
        },
        {
          id: 3,
          field: 'node-3',
          generated_sql: 'Generated sql 3',
          execution_plan: 'Execution plan 3',
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
    const dData = {
      data: [
        {
          field: 'a',
          sql: 'the generated sql for field a',
          plan: 'the plan for field a',
        },
        {
          field: 'b',
          sql: 'the generated sql for field b',
          plan: 'the plan for field b',
        },
      ],
      errors: [],
    };

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
                    <AceEditor
                      mode="json"
                      theme="github"
                      name="payload"
                      value={
                        this.state.activeNode >= 0
                          ? this.state.analyseData[this.state.activeNode].sql
                          : ''
                      }
                      minLines={4}
                      maxLines={100}
                      width="100%"
                      showPrintMargin={false}
                      showGutter={false}
                    />
                  </div>
                </div>
                <div className="overflowAuto">
                  <div className="plansTitle">Execution Plan</div>
                  <div className="codeBlock">
                    <AceEditor
                      mode="json"
                      theme="github"
                      name="payload"
                      value={
                        this.state.activeNode >= 0
                          ? this.state.analyseData[this.state.activeNode].plan
                          : ''
                      }
                      minLines={4}
                      maxLines={100}
                      width="100%"
                      showPrintMargin={false}
                      showGutter={false}
                    />
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

import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';
export default class HasuraAnalyser extends React.Component {
  constructor() {
    super();
    Modal.setAppElement('body');
    this.state = {
      analyseData: [],
      activeNode: 0,
    };
  }
  componentDidMount() {
    this.props
      .analyzeFetcher(this.props.analyseQuery.query)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        return r.text().then(r => {
          return Promise.reject(new Error(r));
        });
      })
      .then(data => {
        this.setState({
          ...this.state,
          analyseData: data,
          activeNode: 0,
        });
      })
      .catch(e => {
        const errorMessage = `Unable to fetch: ${e.message}.`;
        alert(errorMessage);
        this.props.clearAnalyse();
      });
  }
  render() {
    const { show, clearAnalyse } = this.props;
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
        isOpen={show && this.state.analyseData.length > 0}>
        <div className="modalHeader">
          <div className="modalTitle">{'Query Analysis'}</div>
          <div className="modalClose">
            <button onClick={clearAnalyse} className="form-control">
              {'x'}
            </button>
          </div>
        </div>
        <div className="modalBody">
          <div className="wd25">
            <div className="topLevelNodesWrapper">
              <div className="title">{'Top level nodes'}</div>
              <ul>{analysisList}</ul>
            </div>
          </div>
          <div className="wd75">
            <div className="analysisWrapper">
              <div className="plansWrapper">
                <div className="overflowAuto">
                  <div className="plansTitle">{'Generated SQL'}</div>
                  <div className="codeBlock">
                    <pre>
                      <code
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.activeNode >= 0 &&
                            this.state.analyseData.length > 0 &&
                            window.hljs &&
                            window.sqlFormatter &&
                            window.hljs.highlight(
                              'sql',
                              window.sqlFormatter.format(
                                this.state.analyseData[this.state.activeNode]
                                  .sql,
                                { language: 'sql' },
                              ),
                            ).value,
                        }}
                      />
                    </pre>
                  </div>
                </div>
                <div className="overflowAuto">
                  <div className="plansTitle">{'Execution Plan'}</div>
                  <div className="codeBlock">
                    {/*
                    <pre>
                      <code>
                        {this.state.activeNode >= 0
                          && this.state.analyseData.length > 0
                          ? this.state.analyseData[
                              this.state.activeNode
                            ].plan.map((k, i) => <div key={ i }>{k}</div> )
                          : ''}
                      </code>
                    </pre>
                    */}
                    <pre>
                      <code>
                        {this.state.activeNode >= 0 &&
                        this.state.analyseData.length > 0
                          ? this.state.analyseData[
                              this.state.activeNode
                            ].plan.join('\n')
                          : ''}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  /*
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
  */

  handleAnalyseNodeChange(e) {
    let nodeKey = e.target.getAttribute('data-key');
    if (nodeKey) {
      nodeKey = parseInt(nodeKey, 10);
      this.setState({ ...this.state, activeNode: nodeKey });
    }
  }
}

HasuraAnalyser.propTypes = {
  show: PropTypes.bool.isRequired,
  analyseQuery: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  clearAnalyse: PropTypes.func.isRequired,
  analyzeFetcher: PropTypes.func.isRequired,
};

import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

// Modal.setAppElement('#graphiql')

export class HasuraAnalyser extends React.Component {
  constructor() {
    super();
    this.state = {
      nodesAnalysis: [
        {
          id: 1,
          name: 'node-1',
          generated_sql: 'Generated sql 1',
          execution_plan: 'Execution plan 1',
        },
        {
          id: 2,
          name: 'node-2',
          generated_sql: 'Generated sql 2',
          execution_plan: 'Execution plan 2',
        },
        {
          id: 3,
          name: 'node-3',
          generated_sql: 'Generated sql 3',
          execution_plan: 'Execution plan 3',
        },
      ],
    };
  }
  render() {
    const analysisList = this.state.nodesAnalysis.map(Analysis => {
      return <li>{Analysis.name}</li>;
    });
    return (
      <Modal className="modalWrapper" overlayClassName="myOverlayClass" isOpen>
        <div className="modalHeader">
          <div className="modalTitle">
            Query Analysis
          </div>
          <div className="modalClose">
            <button>X</button>
          </div>
        </div>
        <div className="modalBody">
          <div className="wd25">
            <div className="topLevelNodesWrapper">
              <div className="title">
                Top level nodes
              </div>
              <ul>
                {analysisList}
              </ul>
            </div>
          </div>
          <div className="wd75">
            <div className="analysisWrapper">
              <div className="title textCenter">
                Analysis
              </div>
              <div className="plansWrapper">
                <div className="wd40 borderRight overflowAuto">
                  <div className="plansTitle">
                    Generated SQL
                  </div>
                  <div className="codeBlock">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                  </div>
                </div>
                <div className="wd60 overflowAuto">
                  <div className="plansTitle">
                    Execution Plan
                  </div>
                  <div className="codeBlock">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
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

export default HasuraAnalyser;

import React from 'react';
import PropTypes from 'prop-types';

import { ToolbarButton } from './ToolbarButton';
import HasuraAnalyser from './HasuraAnalyser';
import { print, parse } from 'graphql';

export default class AnalyseButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsOpen: false,
      highlight: null,
      isAnalysing: false,
      analyseQuery: '',
    };
  }
  handleAnalyseClick = () => {
    let parsedQuery = '';
    try {
      parsedQuery = (this.props.query && parse(this.props.query)) || '';
      if (!parsedQuery) {
        // Don't do anything and return
        return;
      }
    } catch (e) {
      console.error('Error analysing query:', e.toString());
      return;
    }
    if (this.props.operations && this.props.operations.length > 1) {
      this.setState({ ...this.state, optionsOpen: !this.state.optionsOpen });
      return;
    }
    if (this.props.operations.length === 1) {
      // Handle analyse click
      this.onRun(
        (this.props.operations &&
          this.props.operations[0].name &&
          this.props.operations[0].name.value) ||
          '',
      );
    }
  };
  clearAnalyse = () => {
    this.setState({ isAnalysing: false, analyseQuery: '' });
  };
  onRun = operation => {
    let parseQuery = null;
    try {
      parseQuery = parse(this.props.query);
    } catch (e) {
      console.error('Error analysing query:', e.toString());
      return;
    }

    const plainQuery = print(parseQuery);
    const analyseQuery = {
      // type: 'explain_graphql_query',
      // args: {
      query: {
        query: plainQuery,
        operationName: operation,
        variables: this.props.variables || {},
      },
      user: {
        role: 'admin',
        headers: {
          'x-hasura-user-id': '1',
        },
      },
      //},
    };
    this.setState({
      ...this.state,
      analyseQuery: analyseQuery,
      isAnalysing: true,
      optionsOpen: false,
      highlight: null,
    });
  };
  _onOptionSelected = operation => {
    this.setState({ optionsOpen: false });
    this.onRun(operation.name && operation.name.value);
  };

  _onOptionsOpen = downEvent => {
    let initialPress = true;
    const downTarget = downEvent.target;
    this.setState({ highlight: null, optionsOpen: true });

    let onMouseUp = upEvent => {
      if (initialPress && upEvent.target === downTarget) {
        initialPress = false;
      } else {
        document.removeEventListener('mouseup', onMouseUp);
        onMouseUp = null;
        const isOptionsMenuClicked =
          downTarget.parentNode.compareDocumentPosition(upEvent.target) &
          Node.DOCUMENT_POSITION_CONTAINED_BY;
        if (!isOptionsMenuClicked) {
          // menu calls setState if it was clicked
          this.setState({ optionsOpen: false });
        }
      }
    };

    document.addEventListener('mouseup', onMouseUp);
  };
  render() {
    const operations = this.props.operations;
    const optionsOpen = this.state.optionsOpen;
    const hasOptions = operations && operations.length > 1;

    let options = null;
    if (hasOptions && optionsOpen) {
      const highlight = this.state.highlight;
      options = (
        <ul className="execute-options">
          {operations.filter(o => o.name && o.name.value).map(operation => (
            <li
              key={operation.name ? operation.name.value : '*'}
              className={(operation === highlight && 'selected') || null}
              onMouseOver={() => this.setState({ highlight: operation })}
              onMouseOut={() => this.setState({ highlight: null })}
              onMouseUp={() => this._onOptionSelected(operation)}>
              {operation.name ? operation.name.value : '<Unnamed>'}
            </li>
          ))}
        </ul>
      );
    }
    let onMouseDown;
    if (!this.props.isAnalysing && hasOptions && !optionsOpen) {
      onMouseDown = this._onOptionsOpen;
    }

    return (
      <span className="analyse-button-wrap">
        <ToolbarButton
          onClick={this.handleAnalyseClick.bind(this)}
          onMouseDown={onMouseDown}
          title="Analyse Query"
          label="Analyse"
        />
        {options}
        {!!this.state.analyseQuery ? (
          <HasuraAnalyser
            show={this.state.isAnalysing}
            analyseQuery={this.state.analyseQuery}
            clearAnalyse={this.clearAnalyse.bind(this)}
          />
        ) : (
          ''
        )}
      </span>
    );
  }
}

AnalyseButton.propTypes = {
  operations: PropTypes.array,
  query: PropTypes.string,
  variables: PropTypes.string,
};

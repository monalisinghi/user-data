import React from 'react';
import * as Autosuggest from 'react-autosuggest';
import * as match from 'autosuggest-highlight/match';
import * as parse from 'autosuggest-highlight/parse';
import SimpleTextInput from '../SimpleTextInput';
import {jsonGet} from '../Utils';
class AutoLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstName: '',
      lastName: '',
      suggestions: []
    };
    this.theme = {
      input: 'form-control'
    };
  }
  componentDidMount() {
    jsonGet('https://randomuser.me/api/?results=50&nat=au&exc=login').then((data) => {
      this.setState(Object.assign(this.state, {userData: data.results}));
    });
  }
  onChange = (event, {newValue, method}) => {
    this.setState({
      value: newValue,
      invalid: false
    });
  };
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.state.userData)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  getSuggestions(value, userData) {
    return userData.filter((user) => user.name.first.toLowerCase().includes(value.toLowerCase()));
  }
  getSuggestionValue(suggestion) {
    this.setState(
      Object.assign(this.state, {invalid: false, firstName: suggestion.name.first, lastName: suggestion.name.last})
    );
    return suggestion.name.first;
  }
  renderSuggestion(suggestion, {query}) {
    const matches = match(suggestion.name.first, query);
    const parts = parse(suggestion.name.first, matches);
    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  }
  render() {
    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value: value,
      onChange: this.onChange
    };
    this.theme.input = 'form-control';
    const {
      meta: {touched, error},
      label,
      id,
      input
    } = this.props;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <Autosuggest
            theme={this.theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue.bind(this)}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            label={label}
            onChange={(e, value) => input.onChange(value)}
          />
          {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="form-row">
          <div className="col-12">
            <SimpleTextInput
              label="First name"
              name="firstName"
              id="firstName"
              subscription={this.state.firstName}
              value={this.state.firstName ? this.state.firstName : ''}
              readonly={true}
              onChange={(e, value) => input.onChange(value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-12">
            <SimpleTextInput
              label="Last name"
              name="lastName"
              id="lastName"
              subscription={this.state.lastName}
              value={this.state.lastName ? this.state.lastName : ''}
              readonly={true}
              onChange={(e, value) => input.onChange(value)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AutoLookup;

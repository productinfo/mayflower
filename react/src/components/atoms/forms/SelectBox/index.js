import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.options[0].text
    };
    this.selectTag = '';
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected });
    this.selectTag.selectedIndex = nextProps.options.findIndex((option) => option.text === nextProps.selected);
  }
  /**
   * Default event handler which renders selected item in the patter div.
   *
   * @param event The DOM onChange event
   *
   * Invokes custom callback passed as prop onChangeCallback, passing back the
   * object with select information.
   */
  handleOnChange(event) {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selected = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    this.setState({ selected });

    // invokes custom function if passed in the component
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback({ selectedIndex, selected, selectedValue });
    }
  }

  render() {
    let classNames = '';
    if (this.props.className) {
      classNames = this.props.className;
    } else {
      classNames = !this.props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown';
    }
    const selectClassNames = this.props.required ? 'ma__select-box__select js-dropdown-select js-required' : 'ma__select-box__select js-dropdown-select';
    const { selected } = this.state;
    const { stackLabel } = this.props;
    const labelClassNames = stackLabel ? 'ma__select-box__label' : 'ma__label--inline ma__label--small';
    const selectBoxInline = stackLabel ? '' : 'ma__select-box__field--inline';
    const disabled = this.props.disabled ? 'ma__select-box__field--disabled' : '';
    const labelDisabled = this.props.disabled ? 'ma__label--disabled' : '';
    return(
      <section className={classNames}>
        <label htmlFor={this.props.id} className={`${labelClassNames} ${labelDisabled}`}>{this.props.label}</label>

        <div className={`ma__select-box__field ${selectBoxInline} ${disabled}`}>
          <select
            name={this.props.id}
            id={this.props.id}
            className={selectClassNames}
            onChange={this.handleOnChange}
            disabled={this.props.disabled}
            ref={(select) => { this.selectTag = select; }}
          >
            {this.props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">{selected}</span>
            <span className="ma__select-box__icon" />
          </div>
        </div>
      </section>
    );
  }
}

SelectBox.propTypes = {
  /** The label text above the select box */
  label: PropTypes.string.isRequired,
  /** Whether to stack label or inline label */
  stackLabel: PropTypes.bool,
  /** Whether the form field is required or not */
  required: PropTypes.bool,
  /** The id of the selectbox element */
  id: PropTypes.string.isRequired,
  /** An array of options for the selectbox */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })),
  /** Change handler callback provided by the parent */
  onChangeCallback: PropTypes.func,
  /** Wrapper class for section tag */
  className: PropTypes.string,
  /** The default value for the select box */
  selected: PropTypes.string,
  /** Whether the input is disabled or not */
  disabled: PropTypes.bool
};

SelectBox.defaultProps = {
  required: false
};

export default SelectBox;

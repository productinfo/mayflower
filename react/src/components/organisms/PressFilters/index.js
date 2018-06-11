import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Button from '../../atoms/buttons/Button';
import ColoredHeading from '../../atoms/headings/ColoredHeading';
import DateRange from '../../molecules/DateRange';
import OrgSelector from '../../molecules/OrgSelector';
import SelectBox from '../../atoms/forms/SelectBox';
import InputTextTypeAhead from '../../atoms/forms/InputTextTypeAhead';
import './style.css';

const PressFilters = (props) => {
  const {
    action, coloredHeading, topic, orgSelector, pressType, dateRange, submitButton, clearButton
  } = props;
  const handleClear = () => {
    if (typeof props.clearButton.onClearCallback === 'function') {
      props.clearButton.onClearCallback('Clear all filters!');
    }
  };
  const selectBoxProps = pressType.selectBox;
  const typeAheadProps = pressType.typeAhead;
  return(
    <section className="ma__press-filters">
      <div className="ma__press-filters__container">
        <header className="ma__press-filters__heading">
          <ColoredHeading {...coloredHeading} />
        </header>
        <form className="ma__press-filters__form js-press-filters" action={action}>
          <div className="ma__press-filters__organizations">
            <OrgSelector {...orgSelector} />
          </div>
          {topic && (
            <div className="ma__press-filters__topic">
              <SelectBox {...topic} />
            </div>
          )}
          <div className="ma__press-filters__type">
            {selectBoxProps && <SelectBox {...selectBoxProps} />}
            {typeAheadProps && <InputTextTypeAhead {...typeAheadProps} />}
          </div>
          <div className="ma__press-filters__date">
            <DateRange {...dateRange} />
          </div>
          <div className="ma__press-filters__button">
            <Button {...submitButton} />
          </div>
          {clearButton && (
            <button type="button" aria-label={clearButton.info} className="ma__press-filters__clear js-press-filters-clear" onClick={() => handleClear()}>
              {clearButton.text}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

PressFilters.propTypes = {
  /** The form action  */
  action: PropTypes.string,
  /** @atoms/headings/ColoredHeading */
  coloredHeading: PropTypes.shape(ColoredHeading.PropTypes),
  /** @atoms/forms/SelectBox */
  topic: PropTypes.shape(SelectBox.PropTypes),
  /** @atoms/forms/SelectBox or /** @atoms/forms/InputTextTypeAhead  */
  pressType: PropTypes.oneOf([
    PropTypes.shape({ selectBox: SelectBox.propTypes }),
    PropTypes.shape({ typeAhead: InputTextTypeAhead.propTypes })
  ]),
  /** @molecules/OrgSelector */
  orgSelector: PropTypes.shape(OrgSelector.PropTypes).isRequired,
  /** @molecules/DateRange */
  dateRange: PropTypes.shape(DateRange.PropTypes).isRequired,
  /** @atoms/forms/Button */
  submitButton: PropTypes.shape(Button.PropTypes).isRequired,
  /** Clear all button at the bottom of the filter */
  clearButton: PropTypes.shape({
    text: PropTypes.string,
    info: PropTypes.string,
    onClearCallback: PropTypes.func
  })
};

PressFilters.defaultProps = {
  action: '#',
  coloredHeading: ColoredHeading.defaultProps
};

export default PressFilters;

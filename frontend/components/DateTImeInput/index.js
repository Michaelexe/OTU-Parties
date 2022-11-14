import {Button} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';

const DateTimeInput = ({
  mode,
  value,
  state,
  setState,
  textStyle,
  marginBottom,
  style,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        style={style}
        _text={textStyle}
        onPress={() => {
          setShow(true);
        }}
        marginBottom={marginBottom}>
        {value}
      </Button>
      {show ? (
        <DateTimePicker
          value={state}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event, newDate) => {
            setState(newDate || state);
            setShow(false);
          }}
        />
      ) : null}
    </>
  );
};

export default DateTimeInput;

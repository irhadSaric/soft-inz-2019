import React from 'react';
import { Input } from 'semantic-ui-react';

const InputComponent = ({ input, meta, ...rest }) => (
  <Input
    {...input}
    {...rest}
    error={meta.touched && meta.error}
  />
);


export default InputComponent;

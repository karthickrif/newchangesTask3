import React from 'react';
import styled from 'styled-components';
import styled, { keyframes } from 'styled-components'
import {
  FormControl,
  OutlinedInput,
  Select,
  Checkbox,
  InputAdornment,
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

export const StyledField = styled(OutlinedInput)`
width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #fff;
  margin: 5px 0;
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  `;
  export const StyledSelectField = styled(Select)`
  width: 350px;
    height: 35px;
    border-radius: 5px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #d0d0d0;
    outline: none;
    margin: 5px 0;
    color: #000;
    font-family: Arial, Helvetica, sans-serif;
    `;
  
export const StyledLabel = styled.label`
font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 5px;
  font-weight: 500;
`;
export const StyledSubmit = styled(Button)`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgb(0, 122, 255, 0.9);
  color: #fff;
  &:hover{
    width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgb(0, 122, 255, 0.9);
  color: #fff;
  }
`;

import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.headerBackgroundColor};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Slider = styled.input`
  width: 70%;
  -webkit-appearance: none;
  height: 5px;
  border-radius: 5px;
  background: ${props => `linear-gradient(to right, #007bff ${(props.value - props.min) / (props.max - props.min) * 100}%, #d3d3d3 ${(props.value - props.min) / (props.max - props.min) * 100}%)`};

  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProgressInfo = styled.span`
  font-size: 14px;
  color: ${props => props.theme.textColor};
`;

const ProgressBar = ({ currentPage, totalPages, onPageChange, onSaveProgress }) => {
  return (
    <ProgressBarContainer>
      <Slider
        type="range"
        min={0}
        max={totalPages > 0 ? totalPages - 1 : 0}
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
      />
      <ProgressInfo>
        Page {totalPages > 0 ? currentPage + 1 : 0} of {totalPages}
      </ProgressInfo>
      <SaveButton onClick={onSaveProgress}>Save Progress</SaveButton>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
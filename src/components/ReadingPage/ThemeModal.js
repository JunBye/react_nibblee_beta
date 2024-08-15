import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Cabin', sans-serif;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.modalBackgroundColor};
  color: ${props => props.theme.modalTextColor};
  border-radius: 8px;
  width: 520px;
  height: 584px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.h2`
  margin: 0;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
`;

const SettingSection = styled.div`
  padding: 10px 24px 20px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
`;


const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props => props.theme ? 'center' : 'space-between'};
`;

const Button = styled.button`
  display: flex;
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? 'rgb(56, 152, 236)' : '#ccc'};
  border-radius: 5px;
  background-color: ${props => props.active ? 'rgb(56, 152, 236)' : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.modalTextColor};
  cursor: pointer;
  margin: ${props => props.spacing ? '0 27px' : '0 15px'};
  font-family: 'Cabin', sans-serif;
  &:hover {
    background-color: ${props => props.active ? 'rgb(56, 152, 236)' : 'rgba(56, 152, 236, 0.1)'};
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const ThemeButton = styled(Button)`
  margin: 0 10px;
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  margin: 10px 0;
  background: transparent;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: ${props => `linear-gradient(to right, #1890ff ${(props.value - props.min) / (props.max - props.min) * 100}%, #f5f5f5 ${(props.value - props.min) / (props.max - props.min) * 100}%)`};
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1890ff;
    cursor: pointer;
    margin-top: -7.5px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 5px;
    background: ${props => `linear-gradient(to right, #1890ff ${(props.value - props.min) / (props.max - props.min) * 100}%, #f5f5f5 ${(props.value - props.min) / (props.max - props.min) * 100}%)`};
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1890ff;
    cursor: pointer;
  }
`;


const ThemeModal = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;
  const fontOptions =['Literata', 'Tahoma', 'Georgia', 'Arial'];

  return (
    <ModalOverlay onClick={onClose}>
      <GlobalStyle/>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>Reading Settings</ModalHeader>

        <SettingSection>
          <SectionTitle>Font Size: {settings.fontSize}px</SectionTitle>
          <Slider
            type="range"
            min="12"
            max="48"
            step="2"
            value={settings.fontSize}
            onChange={e => onSettingsChange('fontSize', Number(e.target.value))}
          />
        </SettingSection>

        <SettingSection>
          <SectionTitle>Font Type</SectionTitle>
          <ButtonGroup>
            {fontOptions.map(font => (
              <Button
                key={font}
                active={settings.fontType === font}
                onClick={() => onSettingsChange('fontType', font)}
              >
                {font}
              </Button>
            ))}
          </ButtonGroup>
        </SettingSection>

        <SettingSection>
          <SectionTitle>Line Spacing</SectionTitle>
          <ButtonGroup>
            {['1.0', '1.15', '1.5', '2.0'].map(spacing => (
              <Button
                key={spacing}
                active={settings.lineHeight === spacing}
                onClick={() => onSettingsChange('lineHeight', spacing)}
                spacing
              >
                {spacing}
              </Button>
            ))}
          </ButtonGroup>
        </SettingSection>

        <SettingSection>
          <SectionTitle>Theme</SectionTitle>
          <ButtonGroup>
            {['LIGHT', 'DARK'].map(theme => (
              <Button
                key={theme}
                active={settings.backgroundColor === (theme === 'LIGHT' ? 'white' : 'black')}
                onClick={() => onSettingsChange('backgroundColor', theme === 'LIGHT' ? 'white' : 'black')}
                spacing
              >
                {theme}
              </Button>
            ))}
          </ButtonGroup>
        </SettingSection>

        <SettingSection>
          <SectionTitle>Reading Mode</SectionTitle>
          <ButtonGroup>
            {['Scroll', 'Tap'].map(mode => (
              <Button
                key={mode}
                active={settings.mode === (mode === 'Scroll' ? 'Scroll' : 'Tap')}
                onClick={() => onSettingsChange('mode', mode === 'Scroll' ? 'Scroll' : 'Tap')}
                spacing
              >
                {mode}
              </Button>
            ))}
          </ButtonGroup>
        </SettingSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ThemeModal;
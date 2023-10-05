import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(128, 128, 128, 0.3);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ModalForm = styled.div`
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1280;
  background: transparent;
`;

export const Image = styled.img`
  width: 100%;
  background: transparent;
`;

export const Close = styled.button`
  position: fixed;
  right: 16px;
  top: 16px;
  border: none;
  background: transparent;
`;

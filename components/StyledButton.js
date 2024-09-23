import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: #988686;
  padding: 0.8rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid #2f5233;
  font-size: inherit;

  ${({ variant }) =>
    variant === "delete" &&
    css`
      background-color: #74b7ac
;
      color: black;
      &:hover {
        background-color: #b24a3b;
    `}
`;

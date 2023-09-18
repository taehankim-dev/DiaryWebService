import styled from "@emotion/styled";

// 나중에 버튼들 몰아서 만들기 위함.
export const CancelBtn = styled.button<{ width: number; }>`
  display: inline-block;
  width: ${props => props.width ? props.width : "100%"};
`
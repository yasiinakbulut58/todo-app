import styled from "styled-components";

const CustomLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => <Label {...props}>{children}</Label>;

export default CustomLabel;

export const Label = styled.label`
  display: block;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 10px;
  letter-spacing: -0.2px;
  color: #035687;
`;

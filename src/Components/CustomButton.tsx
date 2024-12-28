import { Button } from "flowbite-react";
import { ReactNode } from 'react';

const CustomButton: React.FC<{
  color: string;
  children: ReactNode;
}> = ({ color, children }) => {
  return (
    <>
      <Button color={color}>{children}</Button>
    </>
  );
};

export default CustomButton;

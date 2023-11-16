'use client';
import { Button } from '@chakra-ui/react';
import { MouseEventHandler, ReactElement } from 'react';

interface Props {
  buttonTitle: string;
  textColor: string;
  variant?: string;
  size: string;
  bg: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontSize: number;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  px?: string;
  py?: string;
  my?: number;
}

export default function CustomButton(props: Props) {
  const {
    buttonTitle,
    textColor,
    variant,
    size,
    bg,
    onClick,
    fontSize,
    leftIcon,
    rightIcon,
    px,
    py,
    my,
  } = props;
  return (
    <Button
      left-icon="email"
      border="3px"
      color={textColor}
      fontSize={fontSize}
      variant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      size={size}
      bg={bg}
      onClick={onClick}
      px={px}
      py={py}
      my={my}
    >
      {buttonTitle}
    </Button>
  );
}

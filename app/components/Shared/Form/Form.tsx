'use client';

import { COLORS } from '@/app/constant/UserDashboard';

import { InputLeftElement, Stack } from '@chakra-ui/react';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';
import CustomButton from '@/app/components/Shared/Buttons/CustomButton';
import { TextField } from '@/app/components/Shared/Inputs/TextField';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  buttonTitle: string;
  onChangeEmail: Dispatch<SetStateAction<string>>;
  emailValue: string;
  onChangePassword: Dispatch<SetStateAction<string>>;
  passwordValue: string;
  onClickButton: () => void;
  linkPath: string;
  linkTitle: string;
  extraContent: string;
  lastTitle: string;
}

export default function Form(props: Props) {
  const {
    buttonTitle,
    onChangeEmail,
    emailValue,
    onChangePassword,
    passwordValue,
    onClickButton,
    extraContent,
  } = props;

  return (
    <Stack>
      {/* email */}

      <TextField
        namespace="HomePage"
        label="Email"
        placeholder="Email address"
        leftIcon={
          <InputLeftElement>
            <RiMailLine color="#667085" />
          </InputLeftElement>
        }
        // rightIcon
        value={emailValue}
        type="email"
        onChange={event => onChangeEmail(event.target.value)}
      />

      <TextField
        namespace="HomePage"
        label="Password"
        placeholder="Create password"
        leftIcon={
          <InputLeftElement>
            <RiLock2Line color="#667085" />
          </InputLeftElement>
        }
        value={passwordValue}
        onChange={event => onChangePassword(event.target.value)}
        type="password"
      />
      {/* password */}

      <CustomButton
        bg={COLORS._primaryColor}
        textColor="white"
        size="md"
        buttonTitle={buttonTitle}
        fontSize={14}
        my={2}
        onClick={onClickButton}
      />
      {extraContent}
    </Stack>
  );
}

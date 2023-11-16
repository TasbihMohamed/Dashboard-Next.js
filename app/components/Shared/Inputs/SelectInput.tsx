'use client';
import {
  FormControl,
  InputGroup,
  FormLabel,
  Box,
  Select as DefaultSelect,
  SelectProps as DefaultSelectProps,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Namespace, TranslationKey } from '@/app/types/withTranslation';
import theme from '@/app/config/theme';
import { BaseInputProps } from '@/app/components/Shared/Inputs/types';

// Telling typescript that label or placeholder are translation keys
function getTranslationKey<
  NS extends Namespace,
  Key extends TranslationKey<NS>,
>(key: Key | string) {
  return key as Key;
}

type SelectProps<NS extends Namespace | undefined> = Omit<
  DefaultSelectProps,
  'placeholder'
> &
  BaseInputProps<NS>;

export const SelectInput = <NS extends Namespace | undefined>({
  namespace,
  label,
  placeholder,
  leftIcon,
  rightIcon,
  errorMessage,
  outerInputGroupProps,
  innerInputGroupProps,
  formControlProps,
  formLabelProps,
  errorProps,
  ...props
}: SelectProps<NS>) => {
  const t = useTranslations(namespace);
  const { colorMode } = useColorMode();

  return (
    <InputGroup
      display="flex"
      flexDirection="column"
      gap="0.25rem"
      {...outerInputGroupProps}
    >
      <FormControl isInvalid={!!errorMessage} {...formControlProps}>
        <FormLabel
          color={colorMode === 'light' ? '#4D5464' : 'white'}
          fontSize="0.875rem"
          fontWeight={500}
          lineHeight={1.42857}
          letterSpacing="0.07px"
          mb={1}
          {...formLabelProps}
        >
          {namespace ? t(getTranslationKey(label)) : label}
        </FormLabel>
        <InputGroup {...innerInputGroupProps}>
          {leftIcon}
          <DefaultSelect
            placeholder={
              namespace ? t(getTranslationKey(placeholder)) : placeholder
            }
            fontSize="0.875rem"
            lineHeight={1.42857}
            {...props}
            _invalid={{
              backgroundColor: colorMode === 'light' ? 'red.50' : 'transparent',
              borderColor: 'red.500',
              boxShadow: `0 0 0 0.5px ${theme.colors.red[500]}`,
              ...props._invalid,
            }}
            _disabled={{
              background: 'gray.100',
              borderColor: 'gray.100',
              ...props._disabled,
            }}
          />
          {rightIcon}
        </InputGroup>
      </FormControl>
      {errorMessage && (
        <Box
          display="flex"
          gap={2}
          fontSize="0.75rem"
          lineHeight={1.5}
          alignItems="center"
          color="red.500"
          {...errorProps}
        >
          {errorMessage}
        </Box>
      )}
    </InputGroup>
  );
};

import { Namespace, TranslationKey } from '@/app/types/withTranslation';
import { ReactElement } from 'react';
import {
  BoxProps,
  FormControlProps,
  FormLabelProps,
  InputGroupProps,
} from '@chakra-ui/react';

export type BaseInputProps<
  NS extends Namespace | undefined,
  Multiline extends boolean = false,
> = {
  /**
   * If set to a value then it will translate the label and placeholder
   */
  namespace?: NS;

  placeholder: NS extends Namespace ? TranslationKey<NS> : string;
  label: NS extends Namespace ? TranslationKey<NS> : string;

  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  errorMessage?: string;

  outerInputGroupProps?: InputGroupProps;
  innerInputGroupProps?: InputGroupProps;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  errorProps?: BoxProps;

  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline?: Multiline;
};

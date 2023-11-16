type Keys =
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Draft'
  | 'Published'
  | string;

export interface StatusColorsType
  extends Record<
    Keys,
    {
      background: string;
      color: string;
    }
  > {}

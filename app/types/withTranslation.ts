// Use type safe message keys with `next-intl`
type Messages = typeof import('@/messages/en.json');

export type Namespace = keyof Messages;

export type TranslationKey<NS extends Namespace> = keyof Messages[NS];

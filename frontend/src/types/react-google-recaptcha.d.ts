declare module 'react-google-recaptcha' {
  import * as React from 'react';

  export type Theme = 'light' | 'dark';
  export type Size = 'normal' | 'compact' | 'invisible';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    theme?: Theme;
    size?: Size;
    tabindex?: number;
    hl?: string;
    style?: React.CSSProperties;
  }

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    reset(): void;
    getValue(): string | null;
    execute(): void;
  }
}

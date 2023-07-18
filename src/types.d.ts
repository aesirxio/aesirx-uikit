declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.png';
declare module '*.svg';
declare module 'aesirx-dam-app';
declare module 'aesirx-sso';
declare const VERSION: string;

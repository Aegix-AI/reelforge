import { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {}
  }
}

declare module 'next/link' {
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    children?: ReactNode;
    locale?: string | false;
  }

  export default function Link(props: LinkProps): JSX.Element;
}

declare module 'next/head' {
  export default function Head(props: { children?: ReactNode }): JSX.Element;
}

declare module 'next/image' {
  export interface ImageProps {
    src: string | object;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    quality?: number | string;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    loader?: any;
    className?: string;
    style?: object;
  }

  export default function Image(props: ImageProps): JSX.Element;
} 
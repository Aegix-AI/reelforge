// React and Next.js type declarations
declare module "react" {
  // Define React hooks and types
  export type ReactNode = React.ReactNode;
  export type RefObject<T> = { current: T | null };
  
  // Hooks
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useRef<T>(initialValue: T): RefObject<T>;
  
  // Event types
  export interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  export interface SyntheticEvent<T = Element> {
    currentTarget: EventTarget & T;
    target: EventTarget;
    preventDefault(): void;
    stopPropagation(): void;
  }
  export interface EventTarget {
    value?: string;
  }
}

declare module "next/link" {
  import { ComponentType, ReactNode } from "react";
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    children?: ReactNode;
    className?: string;
  }
  
  const Link: ComponentType<LinkProps>;
  export default Link;
}

// UI Library type declarations
declare module "lucide-react" {
  import { ComponentType } from "react";
  
  export interface IconProps {
    size?: number | string;
    color?: string;
    stroke?: number | string;
    className?: string;
  }
  
  export const Settings: ComponentType<IconProps>;
  export const Download: ComponentType<IconProps>;
  export const Share2: ComponentType<IconProps>;
  export const Loader2: ComponentType<IconProps>;
  export const Upload: ComponentType<IconProps>;
  export const Play: ComponentType<IconProps>;
  export const Bot: ComponentType<IconProps>;
  export const Cpu: ComponentType<IconProps>;
  export const AlertCircle: ComponentType<IconProps>;
}

// Toast library type declarations
declare module "sonner" {
  export interface ToastOptions {
    id?: string | number;
    duration?: number;
    position?: string;
    description?: string;
    icon?: any;
    className?: string;
    style?: React.CSSProperties;
    cancel?: React.ReactNode;
    action?: React.ReactNode;
    onDismiss?: (id: string) => void;
    onAutoClose?: (id: string) => void;
  }
  
  export function toast(
    message: string | React.ReactNode,
    options?: ToastOptions
  ): string;
  
  export function toast(options: {
    message: string | React.ReactNode;
  } & ToastOptions): string;
  
  export namespace toast {
    function success(
      message: string | React.ReactNode, 
      options?: ToastOptions
    ): string;
    
    function error(
      message: string | React.ReactNode, 
      options?: ToastOptions
    ): string;
  }
} 
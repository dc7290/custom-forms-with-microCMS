import { AriaButtonProps } from '@react-types/button'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject,
} from 'react'

export interface ButtonAria<T> {
  /** Props for the button element. */
  buttonProps: T
  /** Whether the button is currently pressed. */
  isPressed: boolean
}

declare module 'react-aria' {
  export function useButton(
    props: AriaButtonProps<'a'>,
    ref: RefObject<HTMLAnchorElement>
  ): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>
  export function useButton(
    props: AriaButtonProps<'button'>,
    ref: RefObject<HTMLButtonElement>
  ): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>
  export function useButton(
    props: AriaButtonProps<'div'>,
    ref: RefObject<HTMLDivElement>
  ): ButtonAria<HTMLAttributes<HTMLDivElement>>
  export function useButton(
    props: AriaButtonProps<'input'>,
    ref: RefObject<HTMLInputElement>
  ): ButtonAria<InputHTMLAttributes<HTMLInputElement>>
  export function useButton(
    props: AriaButtonProps<'span'>,
    ref: RefObject<HTMLSpanElement>
  ): ButtonAria<HTMLAttributes<HTMLSpanElement>>
  export function useButton(
    props: AriaButtonProps<ElementType>,
    ref: RefObject<HTMLElement>
  ): ButtonAria<HTMLAttributes<HTMLElement>>
}

import { createElement, ElementType, InputHTMLAttributes, ReactElement } from 'react';
import { incorporate } from '@cycle/react';
export { Attributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      sel?: string | symbol;
    }
  }
  namespace React {
    interface ClassAttributes<T> extends Attributes {
      sel?: string | symbol;
    }
  }
}

type PropsExtensions = {
  sel?: string | symbol;
}

function createIncorporatedElement<P extends InputHTMLAttributes<HTMLInputElement> = any>(
  type: ElementType<P>,
  props: P & PropsExtensions | null,
  ...children: Array<string | ReactElement<any>>
): ReactElement<P> {
  if (!props || !props.sel) {
    return createElement(type, props, ...children);
  } else {
    return createElement(incorporate(type), props, ...children);
  }
}

export default {
  createElement: createIncorporatedElement
}

export interface VNode {
  tag: string;
  props: VNodeProps;
  children: (VNode | string)[];
  type: VNodeType;
}

export interface VNodeProps {
  sel?: Element;
  attributes: Record<string, string>;
  directives: Record<string, string>;
}

export type VNodeType = 0 | 1 | 2;

export const VNodeTypes: Record<string, VNodeType> = {
  STATIC: 0, // static VNode (no patching necessary)
  NEEDS_PATCH: 1, // uninitialized static VNode (needs one patch)
  DYNAMIC: 2, // dynamic VNode (needs patch every time view changes)
};

export const h = (
  tag: string,
  attributes: Record<string, string> = {},
  directives: Record<string, string> = {},
  children: (VNode | string)[] = [],
  type: VNodeType = 0,
  sel?: Element
): VNode => {
  return {
    tag,
    props: {
      attributes,
      directives,
      sel,
    },
    children,
    type,
  };
};

export default h;

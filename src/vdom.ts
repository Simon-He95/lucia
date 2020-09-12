import compute from './utils/compute';
import observer from './utils/observer';
import { getSelector, mapAttributes } from './utils/domUtil';
import { element, textNode } from './utils/helpers';
import directives from './directives';

class VDom {
  $el: any;
  vdom: Record<string, any>;
  data: Function | any;

  constructor($el: HTMLElement, data: Record<string, any>) {
    this.$el = $el;
    this.vdom = this.toVNode(this.$el);
    this.data = observer(data, this.patch.bind(this), this.vdom);
  }

  toVNode($el: any, recurse: boolean = false): any {
    const children = [];
    const targetChildNodes = $el.childNodes;

    for (let i = 0; i < targetChildNodes.length; i++) {
      switch (targetChildNodes[i].nodeType) {
        case Node.TEXT_NODE:
          children.push(textNode(targetChildNodes[i], targetChildNodes[i].nodeValue));
          break;
        case Node.ELEMENT_NODE:
          children.push(
            element(
              getSelector(targetChildNodes[i]),
              targetChildNodes[i].tagName.toLowerCase(),
              mapAttributes(targetChildNodes[i]),
              this.toVNode(targetChildNodes[i], true)
            )
          );
          break;
      }
    }
    if (recurse) return children;
    else {
      return element(getSelector($el), $el.tagName.toLowerCase(), mapAttributes($el), children);
    }
  }

  patchTemplates(html: string, data: any): string {
    const tokens = html.match(/{{\s?([^}]*)\s?}}/g) || [];
    for (const token of tokens) {
      const compressedToken = token.replace(/(\{)\s*(\S+)\s*(?=})/gim, '$1$2');
      const rawTemplateData = compressedToken.substring(2, compressedToken.length - 2).trim();

      if (rawTemplateData in data) {
        html = html.replace(token, data[rawTemplateData]);
      } else {
        html = html.replace(token, compute(rawTemplateData, data));
      }
    }
    return html;
  }

  patch(vnodes: any, data: any, recurse: any = false): any {
    if (!vnodes) return;
    if (typeof vnodes === 'string') {
      return this.patchTemplates(vnodes, data);
    }

    for (let i = 0; i < vnodes.children.length; i++) {
      if (vnodes.children[i].$el?.nodeType === Node.TEXT_NODE) {
        const renderedText = this.patchTemplates(vnodes.children[i].value, data);
        if (renderedText !== vnodes.children[i].$el.nodeValue) {
          vnodes.children[i].$el.nodeValue = renderedText;
        }
      } else {
        for (const attr in vnodes.children[i].attributes) {
          console.log('patch call');
          const attrValue = vnodes.children[i].attributes[attr];
          const el = document.querySelector(vnodes.children[i].$el);
          el.removeAttribute(attr);

          directives(attr.replace('l-', ''), el, attr, attrValue, data);
        }
        vnodes.children[i] = this.patch(vnodes.children[i], data, true);
      }
    }
    if (recurse) return vnodes;
  }
}

export default VDom;

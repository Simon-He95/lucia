import ViewNode from './viewNode';

export default class Directives {
  traverseDirectives(el: any, prefix: string, id: string): any[] {
    const directiveElements: any[] = [];
    const descendents = el.getElementsByTagName('*');

    for (let i = descendents.length - 1; i >= 0; --i) {
      let attr = descendents[i].getAttribute(`${prefix}${id}`);
      if (attr) {
        attr = attr.split(':');
        descendents[i].removeAttribute(`${prefix}${id}`);
        directiveElements.push(new ViewNode(descendents[i], attr[0], attr[1]));
      }
    }

    return directiveElements;
  }

  collateDirectives(el: string, prefix: string, ids: string[]) {
    const directives: any = {};
    for (const id of ids) {
      const directiveArray = this.traverseDirectives(el, prefix, id);
      if (directiveArray.length > 0) directives[id] = directiveArray;
    }
    return directives;
  }

  bindDirectives(directives: any, data: any) {
    for (const directive in directives) {
      for (const viewNode of directives[directive]) {
        switch (directive) {
          case 'if':
            if (data.has(viewNode.data)) {
              viewNode.el.hidden = data.get(viewNode.data) ? false : true;
            }
            break;
          case 'on':
            break;
          case 'bind':
            break;
          default:
            throw new Error('Unregistered directive found');
        }
      }
    }
  }
}

class HTMLElement {
  constructor(nameTag, isClosing, text) {
    this.nameTag = nameTag;
    this.isClosing = isClosing;
    this.text = text;
    this.attributes = [];
    this.styles = [];
    this.HTMLElements = [];
  }

  getHtml() {
    if (this.isClosing) {
      return `<${
        this.nameTag
      } style="${this.getStyle()}" ${this.getAttributes()}>
          ${this.text === null ? "" : this.text}
          ${this.getHTMLElements()}
        </${this.nameTag}>`;
    } else {
      return `<${
        this.nameTag
      } style="${this.getStyle()}" ${this.getAttributes()}>`;
    }
  }

  getAttributes() {
    let attribute = "";
    for (let key in this.attributes) {
      attribute += `${key}="${this.attributes[key]}"`;
    }
    return attribute;
  }

  getStyle() {
    let style = "";
    for (let key in this.styles) {
      style += `${key}: ${this.styles[key]};`;
    }
    return style;
  }

  getHTMLElements() {
    let tag = "";
    for (let item in this.HTMLElements) {
      console.log(this.HTMLElements[item].getHtml());
      tag += this.HTMLElements[item].getHtml();
    }
    return tag;
  }

  pushAttributes(nameAttributes, contentAttributes) {
    this.attributes[nameAttributes] = contentAttributes;
  }

  pushStyle(nameStyle, contentStyle) {
    this.styles[nameStyle] = contentStyle;
  }

  pushHTMLElement(newHTMLElement) {
    this.HTMLElements.push(newHTMLElement);
  }

  unshiftHTMLElement(newHTMLElement) {
    this.HTMLElements.unshift(newHTMLElement);
  }
}

////////////////////////////////////////////////////////////

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
`;

const wrapper = () => {
  const htmlElement_a = () => {
    const htmlElement = new HTMLElement("a", true, "More...");
    htmlElement.pushAttributes("href", "https://www.lipsum.com/");
    htmlElement.pushAttributes("target", "_blank");

    return htmlElement;
  };

  const htmlElement_h3 = () =>
    new HTMLElement("h3", true, "What is Lorem Ipsum");

  const htmlElement_img = () => {
    const htmlElement = new HTMLElement("img", false, null);

    htmlElement.pushStyle("width", "100%");
    htmlElement.pushAttributes("src", "images/lipsum.jpg");
    htmlElement.pushAttributes("alt", "Lorem Ipsum");

    return htmlElement;
  };

  const htmlElement_p = () => {
    const htmlElement = new HTMLElement("p", true, text);
    htmlElement.pushStyle("text-align", "justify");
    htmlElement.pushHTMLElement(htmlElement_a());

    return htmlElement;
  };

  const htmlElement_div = () => {
    const htmlElement = new HTMLElement("div", true, null);

    htmlElement.pushStyle("width", "300px");
    htmlElement.pushStyle("margin", "10px");
    htmlElement.pushHTMLElement(htmlElement_h3());
    htmlElement.pushHTMLElement(htmlElement_img());
    htmlElement.pushHTMLElement(htmlElement_p());

    return htmlElement;
  };

  const htmlElement_wrapper = () => {
    const htmlElement = new HTMLElement("div", true, null);

    htmlElement.pushAttributes("id", "wrapper");
    htmlElement.pushStyle("display", "flex");
    htmlElement.pushHTMLElement(htmlElement_div());
    htmlElement.pushHTMLElement(htmlElement_div());

    return htmlElement;
  };

  return htmlElement_wrapper();
};

document.write(wrapper().getHtml());

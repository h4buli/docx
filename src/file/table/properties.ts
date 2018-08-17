import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

export type WidthTypes = "dxa" | "pct" | "nil" | "auto";

export class TableProperties extends XmlComponent {
    constructor() {
        super("w:tblPr");
    }

    public setWidth(type: WidthTypes, w: number | string): TableProperties {
        this.root.push(new PreferredTableWidth(type, w));
        return this;
    }

    public fixedWidthLayout(): TableProperties {
        this.root.push(new TableLayout("fixed"));
        return this;
    }

    public setStyle(style: string) {
        this.root.push(new TableStyle(style));
        return this;
    }

    public setTableIndent(indent: number) {
        this.root.push(new TableIndent(indent));
        return this;
    }
}

interface ITableWidth {
    type: WidthTypes;
    w: number | string;
}

class TableWidthAttributes extends XmlAttributeComponent<ITableWidth> {
    protected xmlKeys = { type: "w:type", w: "w:w" };
}

class PreferredTableWidth extends XmlComponent {
    constructor(type: WidthTypes, w: number | string) {
        super("w:tblW");
        this.root.push(new TableWidthAttributes({ type, w }));
    }
}

type TableLayoutOptions = "autofit" | "fixed";

class TableLayoutAttributes extends XmlAttributeComponent<{ type: TableLayoutOptions }> {
    protected xmlKeys = { type: "w:type" };
}

class TableLayout extends XmlComponent {
    constructor(type: TableLayoutOptions) {
        super("w:tblLayout");
        this.root.push(new TableLayoutAttributes({ type }));
    }
}

class TableStyleAttributes extends XmlAttributeComponent<{}> {
    protected xmlKeys = { value: "w:val" };
}
class TableStyle extends XmlComponent {
    constructor(style: string) {
        super("w:tblStyle");
        this.root.push(new TableStyleAttributes({ value: style }));
    }
}

class TableIndentAttributes extends XmlAttributeComponent<{}> {
    protected xmlKeys = { value: "w:w", type: "w:type" };
}
class TableIndent extends XmlComponent {
    constructor(value: number) {
        super("w:tblInd");
        this.root.push(new TableIndentAttributes({ value: value, type: "dxa" }));
    }
}

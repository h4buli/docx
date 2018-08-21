import { XmlAttributeComponent, XmlComponent, IXmlableObject } from "file/xml-components";
import { WidthType } from ".";

export type WidthTypes = "dxa" | "pct" | "nil" | "auto";

export class TableProperties extends XmlComponent {
    private tableCellMargin: TableCellMargin;
    constructor() {
        super("w:tblPr");
        this.tableCellMargin = new TableCellMargin();
        this.root.push(this.tableCellMargin);
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

    get cellMargin() {
        return this.tableCellMargin;
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

class TableCellMarginAttributes extends XmlAttributeComponent<{ type: WidthType; value: number }> {
    protected xmlKeys = { value: "w:w", type: "w:sz" };
}

class BaseTableCellMargin extends XmlComponent {
    setProperties(value: number, type: WidthType = WidthType.DXA) {
        let attrs = new TableCellMarginAttributes({
            type: type,
            value: value,
        });
        this.root.push(attrs);
    }
}

export class TableCellMargin extends XmlComponent {
    constructor() {
        super("w:tblCellMar");
    }

    public prepForXml(): IXmlableObject {
        return this.root.length > 0 ? super.prepForXml() : "";
    }

    addTopMargin(value: number, type: WidthType = WidthType.DXA) {
        const top = new BaseTableCellMargin("w:top");
        top.setProperties(value, type);
        this.root.push(top);
    }

    addLeftMargin(value: number, type: WidthType = WidthType.DXA) {
        const left = new BaseTableCellMargin("w:left");
        left.setProperties(value, type);
        this.root.push(left);
    }

    addBottomMargin(value: number, type: WidthType = WidthType.DXA) {
        const bottom = new BaseTableCellMargin("w:bottom");
        bottom.setProperties(value, type);
        this.root.push(bottom);
    }

    addRightMargin(value: number, type: WidthType = WidthType.DXA) {
        const right = new BaseTableCellMargin("w:right");
        right.setProperties(value, type);
        this.root.push(right);
    }
}

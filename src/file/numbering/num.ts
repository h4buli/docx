import { Attributes, XmlAttributeComponent, XmlComponent } from "file/xml-components";
import { LevelForOverride } from "./level";

class AbstractNumId extends XmlComponent {
    constructor(value: number) {
        super("w:abstractNumId");
        this.root.push(
            new Attributes({
                val: value,
            }),
        );
    }
}

interface INumAttributesProperties {
    numId: number;
}

class NumAttributes extends XmlAttributeComponent<INumAttributesProperties> {
    protected xmlKeys = { numId: "w:numId" };
}

export class Num extends XmlComponent {
    public id: number;
    public levelOverrides: LevelOverride[] = [];

    constructor(numId: number, public abstractNumId: number) {
        super("w:num");
        this.root.push(
            new NumAttributes({
                numId: numId,
            }),
        );
        this.root.push(new AbstractNumId(abstractNumId));
        this.id = numId;
    }

    public overrideLevel(num: number, startOverride?: number, start?: number, numberFormat?: string, levelText?: string, lvlJc?: string): LevelOverride {
        const olvl = new LevelOverride(num, startOverride, start, numberFormat, levelText, lvlJc);
        this.root.push(olvl);
        this.levelOverrides.push(olvl);
        return olvl;
    }
}

class LevelOverrideAttributes extends XmlAttributeComponent<{ ilvl: number }> {
    protected xmlKeys = { ilvl: "w:ilvl" };
}

export class LevelOverride extends XmlComponent {
    private lvl?: LevelForOverride;

    constructor(private readonly levelNum: number, 
                startOverride?: number, 
                private start?: number, 
                private numberFormat?: string, 
                private levelText?: string, 
                private lvlJc?: string) {
        super("w:lvlOverride");
        this.root.push(new LevelOverrideAttributes({ ilvl: levelNum }));
        if (startOverride !== undefined) {
            this.root.push(new StartOverride(startOverride));
        }

        if (start !== undefined || numberFormat !== undefined || levelText !== undefined || lvlJc !== undefined) {
            this.lvl = new LevelForOverride(this.levelNum, this.start, this.numberFormat, this.levelText, this.lvlJc);
            this.root.push(this.lvl);
        }
    }

    get level(): LevelForOverride {
        let lvl: LevelForOverride;
        if (!this.lvl) {
            lvl = new LevelForOverride(this.levelNum);
            this.root.push(lvl);
            this.lvl = lvl;
        } else {
            lvl = this.lvl;
        }
        return lvl;
    }
}

class StartOverrideAttributes extends XmlAttributeComponent<{ val: number }> {
    protected xmlKeys = { val: "w:val" };
}

class StartOverride extends XmlComponent {
    constructor(start: number) {
        super("w:startOverride");
        this.root.push(new StartOverrideAttributes({ val: start }));
    }
}

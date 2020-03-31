// http://officeopenxml.com/WPtext.php
import { Break } from "./break";
import { Caps, SmallCaps } from "./caps";
import { Bold, Color, DoubleStrike, Italics, Size, Strike } from "./formatting";
import { RunProperties } from "./properties";
import { RunFonts } from "./run-fonts";
import { SubScript, SuperScript } from "./script";
import { Style } from "./style";
import { Tab } from "./tab";
import { Underline } from "./underline";

import { XmlComponent } from "file/xml-components";
import { Shading } from "./shading";

export class Run extends XmlComponent {
    private properties: RunProperties;

    constructor() {
        super("w:r");
        this.properties = new RunProperties();
        this.root.push(this.properties);
    }

    public bold(): Run {
        this.properties.push(new Bold());
        return this;
    }

    public italic(): Run {
        this.properties.push(new Italics());
        return this;
    }

    public underline(underlineType?: string, color?: string): Run {
        this.properties.push(new Underline(underlineType, color));
        return this;
    }

    public color(color: string): Run {
        this.properties.push(new Color(color));
        return this;
    }

    public size(size: number): Run {
        this.properties.push(new Size(size));
        return this;
    }

    public break(): Run {
        this.root.splice(1, 0, new Break());
        return this;
    }

    public tab(): Run {
        this.root.splice(1, 0, new Tab());
        return this;
    }

    public smallCaps(): Run {
        this.properties.push(new SmallCaps());
        return this;
    }

    public allCaps(): Run {
        this.properties.push(new Caps());
        return this;
    }

    public strike(): Run {
        this.properties.push(new Strike());
        return this;
    }

    public doubleStrike(): Run {
        this.properties.push(new DoubleStrike());
        return this;
    }

    public subScript(): Run {
        this.properties.push(new SubScript());
        return this;
    }

    public superScript(): Run {
        this.properties.push(new SuperScript());
        return this;
    }

    public font(fontName: string): Run {
        this.properties.push(new RunFonts(fontName));
        return this;
    }

    public style(styleId: string): Run {
        this.properties.push(new Style(styleId));
        return this;
    }

    /**
     * Creates a shading object. 
     * Shading consists of three components: background color, an optional foreground pattern, and an optional foreground pattern color. 
     * The resulting shading is applied by first setting the background color, then applying the foreground pattern and foreground pattern color.
     *
     * @param backgroundColor color in hex format without #
     * @param patternColor (optional) color in hex format without #. Defaults to 'auto'
     * @param pattern (optional) pattern. Defaults to 'clear' (no pattern)
     */
    public shading(backgroundColor: string, patternColor?: string, pattern?: string): Run {
        this.properties.push(new Shading(backgroundColor, patternColor, pattern));
        return this;
    }
}

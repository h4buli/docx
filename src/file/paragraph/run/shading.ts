// http://officeopenxml.com/WPtextShading.php

import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

interface IShadingAttributesProperties {
    fill: string;
    color: string;
    val: string;
}

class ShadingAttributes extends XmlAttributeComponent<IShadingAttributesProperties> {
    protected xmlKeys = {
        fill: "w:fill",
        color: "w:color",
        val: "w:val",
    };
}

export class Shading extends XmlComponent {
    constructor(fill: string, color: string = "auto", val: string = "clear") {
        super("w:shd");
        this.root.push(
            new ShadingAttributes({
                fill: fill,
                color: color,
                val: val,
            }),
        );
    }
}
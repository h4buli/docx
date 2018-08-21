import { expect } from "chai";

import { Formatter } from "../../export/formatter";
import { TableProperties } from "./properties";
import { WidthType } from ".";

describe("TableProperties", () => {
    describe("#constructor", () => {
        it("creates an initially empty property object", () => {
            const tp = new TableProperties();
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({ "w:tblPr": [] });
        });
    });

    describe("#setWidth", () => {
        it("adds a table width property", () => {
            const tp = new TableProperties().setWidth("dxa", 1234);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblW": [{ _attr: { "w:type": "dxa", "w:w": 1234 } }] }],
            });
        });
    });

    describe("#fixedWidthLayout", () => {
        it("sets the table to fixed width layout", () => {
            const tp = new TableProperties().fixedWidthLayout();
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblLayout": [{ _attr: { "w:type": "fixed" } }] }],
            });
        });
    });

    describe("#cellMargin", () => {
        it("adds a table cell top margin", () => {
            const tp = new TableProperties();
            tp.cellMargin.addTopMargin(1234, WidthType.DXA);
            const tree = new Formatter().format(tp);
            expect(tree).to.deep.equal({
                "w:tblPr": [{ "w:tblCellMar": [{ "w:top": [{ _attr: { "w:sz": "dxa", "w:w": 1234 } }] }] }],
            });
        });
    });
});

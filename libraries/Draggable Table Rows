// ==UserScript==
// @name                    TSLibrary - Draggable Table Rows
// @namespace               TimidScript
// @version                 1.0.8
// @description             Allows dragging of table rows
// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2016 TimidScript, Some Rights Reserved.
// @license                 Creative Commons BY-NC-SA + Read the License inside the script
// @exclude                 *
// ==/UserScript==

/* License + Copyright Notice
********************************************************************************************
Copyright © TimidScript, Some Rights Reserved.
GNU General Public License v3 (GPL-3) - http://www.gnu.org/licenses/gpl-3.0.en.html

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) GPL-3 License is met
2) This copyright must be included
3) Due credits and link to original author's homepage (included in copyright).
4) Notify the original author of redistribution
5) Clear clarification to end user of the GPL-3 license

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript
*/
/* Information
********************************************************************************************
 How to Use
----------------------------------------------
Use the function TSRegisterTable(table, rowSwapEvent) to register table.
Use the function TSUNRegisterTable(table) to un-register table.

----------------------------------------------
    Version History
----------------------------------------------
1.0.8 (2016-04-03)
 - Changed license to GPL-3
1.0.7 (2015/10/06)
 - Bug Fix: When swapping I didn't get the row element
1.0.6 (2014/12/12)
 - @exclude added
1.0.4 (2014-07-01)
 - rowSwapEvent(true) is fired when row swap has occurred only
1.0.3 (2014-07-31)
 - rowSwapEvent expects a value that is set to true when operation is complete.
 - A way to un-register table is added (TSUnRegisterTable)
1.0.2 (2014-07-31)
 - Changed to use addEventListener
 - Added a callback rowSwapEvent that gets fired when rows are swapped
1.0.1 (2014-07-30)
 - Initial Release
**********************************************************************************************/

var TableEvent =
{
    clickedRow: null,
    swapped: false,

    mouseMove: function (e, rowSwapEvent)
    {
        if (this.clickedRow && this.clickedRow != e.target.parentElement)
        {
            var row1 = this.clickedRow,
                row2 = TableEvent.getTableRow(e.target);

            if (row1.rowIndex < row2.rowIndex) row1.parentElement.insertBefore(row2, row1);
            else row1.parentElement.insertBefore(row1, row2);
            this.swapped = true;
            if (this.rowSwapEvent) this.rowSwapEvent();
        }
    },

    mouseDown: function (e)
    {
        this.clickedRow = TableEvent.getTableRow(e.target);
        this.clickedRow.style.cursor = "move";
        this.swapped = false;
    },

    mouseUp: function (e, rowSwapEvent)
    {
        this.clickedRow.style.cursor = null;
        this.clickedRow = null;
        if (this.rowSwapEvent && this.swapped) this.rowSwapEvent(true);
    },

    mouseLeave: function (e, rowSwapEvent)
    {
        this.clickedRow.style.cursor = null;
        this.clickedRow = null;
        if (this.rowSwapEvent && this.swapped) this.rowSwapEvent(true);
    },

    getTableRow: function (node)
    {
        while (node.tagName != "TR") node = node.parentElement;
        return node;
    }
};

/*
    Just call TSRegisterTable and pass the table you want to have draggable rows.
    <rowSwapEvent(complete)> is called when rows are moved. complete is a boolean
    value that is set to true when complete.
----------------------------------------------------------------------------------*/
function TSRegisterTable(table, rowSwapEvent)
{
    table.rowSwapEvent = rowSwapEvent;
    table.addEventListener("mousemove", TableEvent.mouseMove);
    table.addEventListener("mousedown", TableEvent.mouseDown);
    table.addEventListener("mouseup", TableEvent.mouseUp);
    table.addEventListener("mouseleave", TableEvent.mouseLeave);
}

/*
    Call TSUnRegisterTable to remove drag ability
----------------------------------------------------------------------------------*/
function TSUnRegisterTable(table)
{
    table.rowSwapEvent = null;
    table.removeEventListener("mousemove", TableEvent.mouseMove);
    table.removeEventListener("mousedown", TableEvent.mouseDown);
    table.removeEventListener("mouseup", TableEvent.mouseUp);
    table.removeEventListener("mouseleave", TableEvent.mouseLeave);
}

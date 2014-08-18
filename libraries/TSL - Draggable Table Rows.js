// ==UserScript==
// @name                    TSLibrary - Draggable Table Rows
// @namespace               TimidScript
// @description             Allows dragging of table rows

// @author                  TimidScript
// @homepageURL             https://openuserjs.org/users/TimidScript
// @copyright               © 2014 TimidScript, All Rights Reserved.
// @license                 GPLv3 Plus notifying me of usage :)

// @version                 1.0.4
// ==/UserScript==  

/* Information
********************************************************************************************
Copyright © 2014 TimidScript, All Rights Reserved.
Script's Homepage:              Check homepages below

TimidScript's Homepage:         https://openuserjs.org/users/TimidScript
                                https://greasyfork.org/users/1455-timidscript
                                https://monkeyguts.com/author.php?un=timidscript                                

                                http://userscripts.org/users/TimidScript
                                http://userscripts-mirror.org/users/100610/scripts

----------------------------------------------
 How to Use
----------------------------------------------
Use the function TSRegisterTable(table, rowSwapEvent) to register table. 
Use the function TSUNRegisterTable(table) to un-register table. 

----------------------------------------------
    Version History
----------------------------------------------
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
            var row1 = this.clickedRow;
            var row2 = e.target.parentElement;

            if (row1.rowIndex < row2.rowIndex) row1.parentElement.insertBefore(row2, row1);
            else row1.parentElement.insertBefore(row1, row2);
            this.swapped = true;
            if (this.rowSwapEvent) this.rowSwapEvent();
        }
    },

    mouseDown: function (e)
    {
        this.clickedRow = e.target.parentElement;
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

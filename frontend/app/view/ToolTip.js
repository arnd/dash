/*
 * Copyright (C) 2013 pingworks - Alexander Birk und Christoph Lukas
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define("Dash.view.ToolTip", {
    extend: 'Ext.tip.ToolTip',
    closable: true,
    autoHide: false,
    anchor: 'left',
    maxWidth: 1000,
    dismissDelay: 1000,
    
    onLoad: function(records, operation, success) {
        if (records && records.length > 0 && success) {
            this.updateTitleAndTextFromRecords(records, operation.params);
        }
        else {
            this.showErrorMsg();
        }
    },
    
    updateTitleAndTextFromRecords: function() {
    },
    
    showErrorMsg: function() {
        this.setTitle(Dash.config.error.title);
        this.update(Dash.config.error.msg);
        this.show();
    }
});
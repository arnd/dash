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
Ext.define('Dash.controller.Deployment', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.form.field.ComboBox', 'Ext.form.field.Hidden'],
    stores: ['Environments'],
    refs: [{
        selector: 'bundlegrid',
        ref: 'bundleGrid'
    }, {
        selector: 'deploymentwindow',
        ref: 'deploymentWindow'
    }],
    init: function() {
        this.control({
            'bundlegrid': {
                showDeployWindow: this.onShowDeployWindow
            }
        });
        this.control({
            'deploymentwindow': {
                deployment: this.onDeployment
            }
        });
    },
    deploymentAllowed: function(bundle) {
        if (bundle) {
	        var requiredFieldValue = bundle.get(Dash.config.bundlegrid.deployment.required.field);
	        return ( Dash.config.bundlegrid.deployment.enabled 
	            && Dash.config.bundlegrid.deployment.required.value == requiredFieldValue);
        }
    },
    onShowDeployWindow: function(bundle) {
        if (bundle && this.deploymentAllowed(bundle)) {
            this.getEnvironmentsStore().reload();
            window = Ext.create('Dash.view.DeploymentWindow', {
                bundle: bundle
            }).show();
        }
    },
    onDeployment: function(bundle, values) {
        console.log(bundle);
        console.log(values);
        var environment = this.getEnvironmentsStore().findRecord('id', values.environment);
        environment.set('locked', true);
        var now = new Date();
        var lockUntil = new Date(now.getTime() + (values.lock * 3600 * 1000));
        var dateFormat = Dash.config.environment.dateformat;
        environment.set('until', Ext.util.Format.date(lockUntil, dateFormat));
        environment.set('by', values.name);
        environment.set('bundle', bundle.get('id'));
        environment.save({
            success: this.onLockSaved,
            failure: this.onError,
            scope: this
        });
    },
    onLockSaved: function(environment, operation, success) {
        Ext.Ajax.request({
            url: Dash.config.deployment.url,
            params: environment.getData(),
            success: this.onDeploymentTriggered,
            failure: this.onError,
            scope: this
        });
    },
    onDeploymentTriggered: function() {
        this.getDeploymentWindow().destroy();
    },
    onError: function() {
        console.log('Error');
    }
});
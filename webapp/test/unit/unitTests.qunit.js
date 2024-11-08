/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"mentoriafiorika/zkaui5242ads/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

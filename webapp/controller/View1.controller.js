sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode"
],
function (Controller, Fragment, JSONModel, BindingMode) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.zkaui5242ads.controller.View1", {
        onInit: function () {
            var oModelJson = new JSONModel({
                name: 'Adalto',
                showSecondName: true
            })
            this.getView().setModel(oModelJson, "model1");
        },
        onOpenDialog: function(){
            var oView       = this.getView(),
                oDialogKids = this.getView().byId("dialogKids");
            if(!oDialogKids){
                Fragment.load({
                    id: oView.getId(),
                    name: "mentoria.fiori.ka.zkaui5242ads.view.fragments.DialogKids",
                    type: "XML",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            }else{
                oDialogKids.open();
            }
        },
        onClosePopup: function(){
            this.getView().byId("dialogKids").close();
        },
    });
});
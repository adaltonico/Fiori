sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
function (Controller, Fragment, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.zkaui5242ads.controller.View1", {
        onInit: function () {
            var oModelJson = new JSONModel({
                name: 'Adalto',
                showSecondName: true
            })
            this.getView().setModel(oModelJson, "model1");

            var oModelJson2 = new JSONModel({
                name: 'Pedro'
            })
            this.getView().setModel(oModelJson2, "model2");

            var oModelJson3 = new JSONModel();
            oModelJson3.loadData("model/Products.json")
            this.getView().setModel(oModelJson3, "model3");

            var oModelJson4 = new JSONModel();
            oModelJson4.loadData("model/Employees.json")
            this.getView().setModel(oModelJson4, "model4");

            var oBubdle = this.getOwnerComponent().getModel("i18n").getResourceBundle(),
                msg = oBubdle.getText("msgInit", ["com", "sucesso"]);

            MessageToast.show(msg);

        },

        onChangeLine: function (oEvent) {
            var value = oEvent.getParameter("value"),
                oModel = this.getOwnerComponent().getModel("UX_TRAVEL_SRV"),
                oInput = this.byId("carridName");

            // Chave: /UX_C_Carrier_TP('AA')
            oInput.setBusy(true);
            oModel.read("/UX_C_Carrier_TP('" + value + "')", {
                success: function (oData) {
                    MessageToast.show("OK")
                    oInput.setValue(oData.Carrname);
                    oInput.setBusy(false);
                },
                error: function (oError) {
                    MessageToast.show("ERRO!")
                }
            });

        },

        formatAlertStock: function (units) {
            if (units > 0) {
                return ""
            } else {
                return "Disponível em breve";
            }
        },

        onDataComboBoxChange: function (oEvent) {

            var oItem = oEvent.getParameter("selectedItem")
            var sPath = oItem.getBindingContext("model4").getPath();
            var oList = this.byId("listEmployees");
            oList.bindElement({ path: sPath, model: "model4" });
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
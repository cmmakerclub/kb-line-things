Blockly.Blocks["line_things_block"] = {
  init: function() {
    this.appendStatementInput("LINE_THINGS_BLOCK")
      .setCheck(null)
      .appendField(
        new Blockly.FieldImage(
          "https://image.flaticon.com/icons/svg/124/124027.svg",
          24,
          24,
          "*"
        )
      )
      .appendField("LINE THINGS");
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("", 24, 24, "*"))
      .appendField("DEVICE NAME")
      .appendField(
        new Blockly.FieldTextInput("LINE-THING-001"),
        "DEVICE_NAME"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["user_service_uuid_block"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("USER SERVICE UUID")
      .appendField(
        new Blockly.FieldTextInput("5fe8b0a0-3444-4805-8842-52c7a9b6d8a1"),
        "USER_SERVICE_UUID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["psdi_service_uuid_block"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("PSDI SERVICE UUID")
      .appendField(
        new Blockly.FieldTextInput("e625601e-9e55-4597-a598-76018a0d293d"),
        "PSDI_SERVICE_UUID"
      );
    this.appendDummyInput()
      .appendField("PSDI CHARACTERISTIC UUID")
      .appendField(
        new Blockly.FieldTextInput("26e2b12b-85f0-4f3f-9fdd-91d114270e6e"),
        "PSDI_CHARACTERISTIC_UUID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["setup_services_block"] = {
  init: function() {
    this.appendStatementInput("SETUP_SERVICES")
      .setCheck(null)
      .appendField("SETUP SERVICES");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["characteristic_blocks"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("GATT SERVICE")
      .appendField(new Blockly.FieldTextInput("0x181A"), "GATT_SERVICE");
    this.appendStatementInput("CHARACTERISTIC_BLOCKS")
      .setCheck(null)
      .appendField("CHARACTERISTIC BLOCKS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["create_characteristic_block"] = {
  init: function() {
    this.appendDummyInput().appendField("CREATE CHARACTERISTIC");
    this.appendDummyInput()
      .appendField("ASSIGNED NUMBER")
      .appendField(new Blockly.FieldTextInput("0x2A6E"), "ASSIGNED_NUMBER");
    this.appendDummyInput()
      .appendField("FORMAT")
      .appendField(new Blockly.FieldTextInput("UINT16_T"), "FORMAT");
    this.appendDummyInput()
      .appendField("NAME")
      .appendField(
        new Blockly.FieldTextInput("TEMPERATURE_CHARACTERISTIC"),
        "CHARACTERISTIC_NAME"
      );
    this.appendDummyInput()
      .appendField("VARIABLE")
      .appendField(new Blockly.FieldVariable("temperatureValue"), "VARIABLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["ble_characteristic_callbacks_block"] = {
  init: function() {
    this.appendStatementInput("BLE_CHARACTERISTIC_CALLBACKS")
      .setCheck(null)
      .appendField("BLE CHARACTERISTIC CALLBACKS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["ble_message_receive_block"] = {
  init: function() {
    this.appendStatementInput("BLE_MESSAGE_RECEIVE_BLOCK")
      .setCheck(null)
      .appendField("MESSAGE RECEIVE")
      .appendField(
        new Blockly.FieldVariable("BLE_MESSAGE_RECEIVE"),
        "BLE_MESSAGE_RECEIVE"
      );
    this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["ble_device_connection_block"] = {
  init: function() {
    this.appendDummyInput().appendField("BLE DEVICE CONNECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["ble_device_disconnection_block"] = {
  init: function() {
    this.appendDummyInput().appendField("BLE DEVICE DISCONNECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["start_advertising_block"] = {
  init: function() {
    this.appendDummyInput().appendField("START ADVERTISING");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["sync_data_characteristic_block"] = {
  init: function() {
    this.appendDummyInput().appendField("SYNC DATA");
    this.appendDummyInput()
      .appendField("CHARACTERISTIC NAME")
      .appendField(
        new Blockly.FieldTextInput("TEMPERATURE_CHARACTERISTIC"),
        "CHARACTERISTIC_NAME"
      );
    this.appendDummyInput()
      .appendField("FORMAT")
      .appendField(new Blockly.FieldTextInput("UINT16_T"), "FORMAT");
    this.appendDummyInput()
      .appendField("VARIABLE")
      .appendField(new Blockly.FieldVariable("temperatureValue"), "VARIABLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


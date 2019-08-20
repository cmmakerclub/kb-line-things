Blockly.JavaScript["line_things_block"] = function(block) {
  var statements_line_things_block = Blockly.JavaScript.statementToCode(
    block,
    "LINE_THINGS_BLOCK"
  );
  var text_device_name = block.getFieldValue("DEVICE_NAME");
  // TODO: Assemble JavaScript into code variable.

  var code = `
#EXTINC
	#include <BLEServer.h>
	#include <BLEDevice.h>
	#include <BLEUtils.h>
	#include <BLE2902.h>
	
	#define DEVICE_NAME "${text_device_name}"
	#define BUTTON 0
	#define LED1 16
	#define Number int

	BLEServer* thingsServer;
	BLESecurity *thingsSecurity;
	BLEService* userService;
	BLEService* psdiService;
	BLECharacteristic* psdiCharacteristic;
	BLECharacteristic* writeCharacteristic;
	BLECharacteristic* notifyCharacteristic;

	bool deviceConnected = false;
	bool oldDeviceConnected = false;

	volatile int btnAction = 0;

	// User service characteristics
	// #define WRITE_CHARACTERISTIC_UUID "E9062E71-9E62-4BC6-B0D3-35CDCD9B027B"
	// #define NOTIFY_CHARACTERISTIC_UUID "62FBD229-6EDD-4D1A-B554-5C4E1BB29169"
#END
#FUNCTION
	class serverCallbacks: public BLEServerCallbacks {
	  void onConnect(BLEServer* pServer) {
	   deviceConnected = true;
	  };

	  void onDisconnect(BLEServer* pServer) {
	    deviceConnected = false;
	  }
	};
#END

Serial.begin(115200);
pinMode(LED1, OUTPUT);
  digitalWrite(LED1, 0);
  pinMode(BUTTON, INPUT_PULLUP);
  attachInterrupt(BUTTON, buttonAction, CHANGE);

BLEDevice::init("");
BLEDevice::setEncryptionLevel(ESP_BLE_SEC_ENCRYPT_NO_MITM);

// Security Settings
BLESecurity *thingsSecurity = new BLESecurity();
thingsSecurity->setAuthenticationMode(ESP_LE_AUTH_BOND);
thingsSecurity->setCapability(ESP_IO_CAP_NONE);
thingsSecurity->setInitEncryptionKey(ESP_BLE_ENC_KEY_MASK | ESP_BLE_ID_KEY_MASK);

setupServices();
startAdvertising();
Serial.println("Ready to Connect");
${statements_line_things_block}
  `;
  return code;
};

Blockly.JavaScript["user_service_uuid_block"] = function(block) {
  var text_user_service_uuid = block.getFieldValue("USER_SERVICE_UUID");
  // TODO: Assemble JavaScript into code variable.
  var code = `
#EXTINC
	// User service UUID: Change this to your generated service UUID
	#define USER_SERVICE_UUID "${text_user_service_uuid}"
#END
  `;
  return code;
};

Blockly.JavaScript["psdi_service_uuid_block"] = function(block) {
  var text_psdi_service_uuid = block.getFieldValue("PSDI_SERVICE_UUID");
  var text_psdi_characteristic_uuid = block.getFieldValue(
    "PSDI_CHARACTERISTIC_UUID"
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `
#EXTINC
	// PSDI Service UUID: Fixed value for Developer Trial
	#define PSDI_SERVICE_UUID "${text_psdi_service_uuid}"
	#define PSDI_CHARACTERISTIC_UUID "${text_psdi_characteristic_uuid}"
#END
  `;
  return code;
};

Blockly.JavaScript["characteristic_blocks"] = function(block) {
  var text_gatt_service = block.getFieldValue("GATT_SERVICE");
  var statements_characteristic_blocks = Blockly.JavaScript.statementToCode(
    block,
    "CHARACTERISTIC_BLOCKS"
  );
  // TODO: Assemble JavaScript into code variable.

  var code = `
  #EXTINC
	#define SERVICE_UUID_${text_gatt_service} ${text_gatt_service}
  BLEService* envService_${text_gatt_service};
  #END
  ${statements_characteristic_blocks}
  envService_${text_gatt_service}->start();
  `;

  return code;
};

Blockly.JavaScript["create_characteristic_block"] = function(block) {
  var text_assigned_number = block.getFieldValue("ASSIGNED_NUMBER");
  var text_format = block.getFieldValue("FORMAT");
  var text_characteristic_name = block.getFieldValue("CHARACTERISTIC_NAME");
  var variable_variable = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("VARIABLE"),
    Blockly.Variables.NAME_TYPE
  );

  var code = ``;
  try {
    var GATT_SERVICE = block.getSurroundParent().getFieldValue("GATT_SERVICE");
    var envService = `envService_${GATT_SERVICE}`;
    // TODO: Assemble JavaScript into code variable.

    code = `
  #VARIABLE
  BLECharacteristic* ${text_characteristic_name};
  #END
  
  ${envService} = thingsServer->createService(BLEUUID((uint16_t) ${GATT_SERVICE}));
  ${text_characteristic_name} = ${envService}->createCharacteristic(BLEUUID((uint16_t) ${text_assigned_number}), BLECharacteristic::PROPERTY_READ);
  ${text_characteristic_name}->setAccessPermissions(ESP_GATT_PERM_READ_ENCRYPTED);
  `;
    // console.log(block.getSurroundParent().getFieldValue("GATT_SERVICE"));
  } catch (err) {
    console.log(err);
  }

  return code;
};

Blockly.JavaScript["ble_characteristic_callbacks_block"] = function(block) {
  var statements_ble_characteristic_callbacks = Blockly.JavaScript.statementToCode(
    block,
    "BLE_CHARACTERISTIC_CALLBACKS"
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `
#FUNCTION
	class writeCallback: public BLECharacteristicCallbacks {
		${statements_ble_characteristic_callbacks}
	};
#END
  `;
  return code;
};

Blockly.JavaScript["ble_message_receive_block"] = function(block) {
  var variable_ble_message_receive = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("BLE_MESSAGE_RECEIVE"),
    Blockly.Variables.NAME_TYPE
  );
  var statements_ble_message_receive_block = Blockly.JavaScript.statementToCode(
    block,
    "BLE_MESSAGE_RECEIVE_BLOCK"
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `
  void onWrite(BLECharacteristic *bleWriteCharacteristic) {
    std::string value = bleWriteCharacteristic->getValue();
    char ${variable_ble_message_receive} = (char)value[0];
    ${statements_ble_message_receive_block}
  }
  `;
  return code;
};

Blockly.JavaScript["ble_device_connection_block"] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `
  // Connection
  if (deviceConnected && !oldDeviceConnected) {
    oldDeviceConnected = deviceConnected;
  }

  uint8_t btnValue;

  while (btnAction > 0 && deviceConnected) {
    btnValue = !digitalRead(BUTTON);
    btnAction = 0;
    notifyCharacteristic->setValue(&btnValue, 1);
    notifyCharacteristic->notify();
    delay(20);
  }
  `;
  return code;
};

Blockly.JavaScript["ble_device_disconnection_block"] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `
  // Disconnection
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // Wait for BLE Stack to be ready
    thingsServer->startAdvertising(); // Restart advertising
    oldDeviceConnected = deviceConnected;
  }
  `;
  return code;
};

Blockly.JavaScript["setup_services_block"] = function(block) {
  var statements_setup_services = Blockly.JavaScript.statementToCode(
    block,
    "SETUP_SERVICES"
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `
#FUNCTION
	void setupServices(void) {
	  // Create BLE Server
	  thingsServer = BLEDevice::createServer();
	  thingsServer->setCallbacks(new serverCallbacks());

	  // Setup User Service
	  userService = thingsServer->createService(USER_SERVICE_UUID);

    // Setup PSDI Service
    psdiService = thingsServer->createService(PSDI_SERVICE_UUID);
    psdiCharacteristic = psdiService->createCharacteristic(PSDI_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ);
    psdiCharacteristic->setAccessPermissions(ESP_GATT_PERM_READ_ENCRYPTED | ESP_GATT_PERM_WRITE_ENCRYPTED);

    // Set PSDI (Product Specific Device ID) value
    uint64_t macAddress = ESP.getEfuseMac();
    psdiCharacteristic->setValue((uint8_t*) &macAddress, sizeof(macAddress));

    // Start BLE Services
    userService->start();
    psdiService->start();

	  ${statements_setup_services}
	}
#END
  `;
  return code;
};

Blockly.JavaScript["start_advertising_block"] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `
#FUNCTION
	void startAdvertising(void) {
	  // Start Advertising
	  BLEAdvertisementData scanResponseData = BLEAdvertisementData();
	  scanResponseData.setFlags(0x06); // GENERAL_DISC_MODE 0x02 | BR_EDR_NOT_SUPPORTED 0x04
	  scanResponseData.setName(DEVICE_NAME);

	  thingsServer->getAdvertising()->addServiceUUID(userService->getUUID());
	  thingsServer->getAdvertising()->setScanResponseData(scanResponseData);
	  thingsServer->getAdvertising()->start();
	}

	void buttonAction() {
	  btnAction++;
	}
#END
  `;
  return code;
};

Blockly.JavaScript["sync_data_characteristic_block"] = function(block) {
  var text_characteristic_name = block.getFieldValue("CHARACTERISTIC_NAME");
  var text_format = block.getFieldValue("FORMAT");
  var variable_variable = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue("VARIABLE"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble JavaScript into code variable.
  var format = "";
  if (text_format == "UINT16_T") {
    format = "uint16_t";
  }

  var code = `
  ${text_characteristic_name}->setValue((${format}&) ${variable_variable});
  `;

  return code;
};

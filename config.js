module.exports = {
  initial_blocks: `<xml>
                            <block type="arduino_init" deletable="false" x="-100" y="-50">
                            </block><block type="arduino_loop" deletable="false" x="100" y="-50"></block>
                      </xml>`,
  base_blocks: [
    // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
    {
      name: "LINE THINGS",
      color: "230",
      icon: "https://image.flaticon.com/icons/svg/124/124027.svg",
      blocks: [
        "line_things_block",
        "user_service_uuid_block",
        "psdi_service_uuid_block",
        "setup_services_block",
        "characteristic_blocks",
        "create_characteristic_block",
        "ble_characteristic_callbacks_block",
        "ble_message_receive_block",
        "ble_device_connection_block",
        "ble_device_disconnection_block",
        "start_advertising_block",
        "sync_data_characteristic_block"
      ]
    },
  ]
};

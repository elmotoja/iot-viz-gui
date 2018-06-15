package iot.viz.api.iotvizapi.models;

public class IotDevice {

    int deviceId;
    String name;
    int posX;
    int posY;
    String type;
    String serialNumber;
    String model;
    String manufacturer;
    String description;

    public IotDevice() {
    }

    public IotDevice(int deviceId, String name, int posX, int posY, String type, String serialNumber, String model, String manufacturer, String description) {
        this.deviceId = deviceId;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.serialNumber = serialNumber;
        this.model = model;
        this.manufacturer = manufacturer;
        this.description = description;
    }

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPosX() {
        return posX;
    }

    public void setPosX(int posX) {
        this.posX = posX;
    }

    public int getPosY() {
        return posY;
    }

    public void setPosY(int posY) {
        this.posY = posY;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

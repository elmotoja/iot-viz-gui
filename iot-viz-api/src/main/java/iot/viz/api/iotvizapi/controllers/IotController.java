package iot.viz.api.iotvizapi.controllers;

import iot.viz.api.iotvizapi.models.IotDevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
@RestController
public class IotController {

    @Autowired
    private DataSource dataSource;

    private int currentVersion;

    @RequestMapping(value = "", method = RequestMethod.GET)
    ResponseEntity<String> homePage() {
        String body = "<body style=\"position: absolute;height: 120;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align: center;background-color: #e7f0f7;\"><h1>IoT-VIZ API</h1> <p>Więcej informacji <a href=\"/swagger-ui.html\">pod tym linkiem.</a></p></body>";
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @RequestMapping(value = "iot-devices", method = RequestMethod.PUT)
    ResponseEntity<List<IotDevice>> addIotDevices(@RequestBody List<IotDevice> iotDevices) throws SQLException {
        Connection conn = dataSource.getConnection();
        PreparedStatement psIotDevice = conn.prepareStatement("INSERT INTO IotDevice VALUES (?,?,?,?,?,?)");
        PreparedStatement psDeviceInfo = conn.prepareStatement("INSERT INTO DeviceInfo (version, posx, posy, deviceid, description) VALUES (?,?,?,?,?)");

        ResultSet rs = conn.createStatement().
                executeQuery("SELECT iot.deviceid, info.version " +
                        "FROM iotdevice AS iot " +
                        "INNER JOIN (SELECT deviceid, MAX(version) AS maxVer FROM deviceinfo GROUP BY deviceid) AS maxVersion ON maxVersion.deviceid = iot.deviceid " +
                        "INNER JOIN deviceinfo AS info ON iot.deviceid = info.deviceid WHERE info.deviceid = maxVersion.deviceid AND info.version = maxVersion.maxVer");

        for (IotDevice device : iotDevices) {
            if (!contains(device.getDeviceId(), rs)) {
                psIotDevice.setInt(1, device.getDeviceId());
                psIotDevice.setString(2, device.getName());
                psIotDevice.setString(3, device.getSerialNumber());
                psIotDevice.setString(4, device.getType());
                psIotDevice.setString(5, device.getModel());
                psIotDevice.setString(6, device.getManufacturer());
                psIotDevice.executeUpdate();

                psDeviceInfo.setInt(1, 1);
            } else {
                psDeviceInfo.setInt(1, currentVersion);
            }
            psDeviceInfo.setInt(2, device.getPosX());
            psDeviceInfo.setInt(3, device.getPosY());
            psDeviceInfo.setInt(4, device.getDeviceId());
            psDeviceInfo.setString(5, device.getDescription());
            psDeviceInfo.executeUpdate();
        }
        psIotDevice.close();
        psDeviceInfo.close();

        conn.close();
        return new ResponseEntity<>(iotDevices, HttpStatus.OK);
    }

    private boolean contains(int deviceId, ResultSet rs) throws SQLException {
        while (rs.next()) {
            if (deviceId == rs.getInt("deviceid")) {
                currentVersion = rs.getInt("version") + 1;
                return true;
            }
        }
        return false;
    }

    @RequestMapping(value = "iot-devices", method = RequestMethod.DELETE)
    ResponseEntity<List<IotDevice>> deleteIotDevices() throws SQLException {
        List<IotDevice> iotDevices = createIotDevices("");
        return new ResponseEntity<>(iotDevices, HttpStatus.OK);
    }

    @RequestMapping(value = "iot-devices", method = RequestMethod.GET)
    ResponseEntity<List<IotDevice>> getIotDevices() throws SQLException {
        List<IotDevice> iotDevices = createIotDevices("SELECT iot.deviceid, iot.name, info.posx, info.posy,  iot.type, iot.serialnumber,iot.model, iot.manufacturer, info.description " +
                "FROM iotdevice AS iot " +
                "INNER JOIN (SELECT deviceid, MAX(version) AS maxVer FROM deviceinfo GROUP BY deviceid) AS maxVersion ON maxVersion.deviceid = iot.deviceid " +
                "INNER JOIN deviceinfo AS info ON iot.deviceid = info.deviceid WHERE info.deviceid = maxVersion.deviceid AND info.version = maxVersion.maxVer");

        return new ResponseEntity<>(iotDevices, HttpStatus.OK);
    }


    @RequestMapping(value = "iot-devices-history", method = RequestMethod.GET)
    ResponseEntity<List<IotDevice>> getHistoryIotDevices() throws SQLException {
        List<IotDevice> iotDevices = createIotDevices("SELECT iot.deviceid, iot.name, info.posx, info.posy,  iot.type, iot.serialnumber,iot.model, iot.manufacturer, info.description " +
                "FROM iotdevice AS iot " +
                "INNER JOIN deviceinfo AS info ON iot.deviceid = info.deviceid WHERE info.deviceid = iot.deviceid");
        return new ResponseEntity<>(iotDevices, HttpStatus.OK);
    }

    private List<IotDevice> createIotDevices(String s) throws SQLException {
        Connection conn = dataSource.getConnection();
        List<IotDevice> iotDevices = new ArrayList<>();

        ResultSet rs = conn.createStatement().executeQuery(s);

        while (rs.next()) {
            iotDevices.add(new IotDevice(rs.getInt(1), rs.getString(2),
                    rs.getInt(3), rs.getInt(4), rs.getString(5),
                    rs.getString(6), rs.getString(7), rs.getString(8),
                    rs.getString(9)));
        }
        conn.close();
        return iotDevices;
    }
}
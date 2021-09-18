// @ts-nocheck
import Telemetry from '../models/telemetry.model';

class TelemetryList {
  /**
   * Handles the various APIs for displaying and managing telemetry data
   * @param {Telemetry} telemetryDataItem
   */
  constructor(telemetryDataItem) {
    this.telemetryDataItem = telemetryDataItem;
  }
  async showTelemetryData(req, res) {
    const querySpec = {
      query: 'SELECT * from c'
    };

    const items = await this.telemetryDataItem.find(querySpec);
    res.json({
      telemetryData: items
    });
  }
}

export default TelemetryList;

import { TelemetryItemProps, TelemetryItemsResponseProps } from '../types';
import { Request, Response } from 'express';

/**
 * Handles the various APIs for displaying and managing telemetry data
 * @param {Telemetry} telemetryDataItem
 */
class TelemetryList {
  telemetryDataItemOfTheList: TelemetryItemProps;

  constructor(telemetryDataItem: TelemetryItemProps) {
    this.telemetryDataItemOfTheList = telemetryDataItem;
  }
  async showTelemetryData(req: Request, res: Response) {
    const querySpec = {
      query: 'SELECT * from c'
    };

    const items: TelemetryItemsResponseProps =
    // @ts-nocheck
      await this.telemetryDataItemOfTheList.find(querySpec);
    res.json({
      telemetryData: items
    });
  }
  async showTelemetryDataByDay(req, res) {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.EventProcessedUtcTime BETWEEN "${req.query.day}T00:00" and "${req.query.day}T23:59"`
    }
     // @ts-nocheck
     const items: TelemetryItemsResponseProps = await this.telemetryDataItemOfTheList.find(querySpec);
     res.json({
       telemetryData: items
     });
  }
}

export default TelemetryList;

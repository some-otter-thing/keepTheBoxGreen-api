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
}

export default TelemetryList;

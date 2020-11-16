import { Body, Controller, Post } from '@nestjs/common';
import { AlgService } from './alg.service';

@Controller('alg')
export class AlgController {

  constructor(
    private algService: AlgService
  ) { }

  @Post('get-token')
  getToken(@Body() body) {
    return this.algService.getToken(body.object, body.randomStr, body.appSecret);
  }

  @Post('get-organization-tree')
  getOrganizationTree(@Body() body) {
    return this.algService.getAllGroupTree(body.object, body.randomStr, body.token);
  }

  @Post('get-device-list')
  getDeviceList(@Body() body) {
    return this.algService.getDeviceList(body.object, body.randomStr, body.token);
  }

  @Post('get-realtime-data-device')
  getRealTimeDataOfTheDevice(@Body() body) {
    return this.algService.getRealTimeDataOfTheDevice(body.object, body.randomStr, body.token);
  }

  @Post('get-variables-device-history')
  getHistoryList(@Body() body) {
    return this.algService.getVariablesOfTheDeviceHistory(body.object, body.randomStr, body.token);
  }

  @Post('get-historical-data-device')
  getHistoricalDataOfTheDevice(@Body() body) {
    return this.algService.getHistoricalDataOfTheDevice(body.object, body.randomStr, body.token);
  }

  @Post('get-historical-alarm-device')
  getHistoricalAlarmOfTHeDevice(@Body() body) {
    return this.algService.getHistoricalAlarmOfTHeDevice(body.object, body.randomStr, body.token);
  }

  @Post('get-internal-info')
  getInternationalizationInformation(@Body() body) {
    return this.algService.getInternalInfo(body.object, body.randomStr, body.token);
  }

}

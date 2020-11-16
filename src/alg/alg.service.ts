import { HttpService, Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5/dist/md5';

var crypto = require('crypto');
var md5 = crypto.createHash('md5');

@Injectable()
export class AlgService {

  appId = "154901677851943631995";//Put your appId
  appSecret = "c612eb28APSZ";//Put your appSecret

  // randomStr = "9bfqepb5qcai2qnmrnxasit65knqkew";//Put your randomStr
  // accessToken = "HKWJNLQQPGDNXOL";//Put your token(Token needs to be refreshed regularly)
  // sign = this.getSignByTokenWithMd5(null, this.randomStr, this.accessToken);//Put your sign


  apiUriHead = "https://open.algiot.com";

  getTokenUri = "/api/open/token/get_token";

  //-------------organization API-----------------------------
  //Get organization tree//tested - success
  getAllGroupTreeUri = "/api/login/group/list_all_group_tree";

  //-------------equipment API--------------------------------
  //Get device list//tested - success
  getDeviceListUri = "/api/udevice/device/list_deviceInfo";
  //Get real-time data of the device//tested - success
  getRealTimeDataOfTheDeviceUri = "/api/udevice/realtime/find_real_time";
  //Get the variables of the device's history//tested - failed
  getVariablesOfTheDeviceHistoryUri = "/api/udevice/history/list_history_device";
  //Get historical data of the device
  getHistoricalDataOfTheDeviceUri = "/api/udevice/history/list_getHistory";
  //Get the historical alarm of the device
  getHistoricalAlarmOfTHeDeviceUri = "/api/udevice/alarm_history/list_alarm_history";

  //-------------globalization API-----------------------------
  //Get internationalization information - success
  getInternalInfoUri = "/api/login/i18n/get_internal_info";

  // options = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
  //     "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${this.sign}","randomStr":"${this.randomStr}"}`
  //   },
  // };

  constructor(
    private httpService: HttpService
  ) { }


  callback(error, response, data) {
    console.log(response.body);
    if (!error && response.statusCode == 200) {
      console.log('------Interface data------', data);
    }
  }

  async getToken(objects, randomStr, appSecret) {
    var AlgOpenParam: { [k: string]: any; } = {};

    if (objects != null) {
      AlgOpenParam.object = objects;
    }
    if (randomStr != null) {
      AlgOpenParam.randomStr = randomStr;
    }
    if (appSecret != null) {
      AlgOpenParam.appSecret = appSecret;
    }

    var jsonStr = JSON.stringify(AlgOpenParam).toString();
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('SIGN: ', sign);

    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getTokenUri, null, {
        headers: {
          "Content-Type": "application/json",
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response.statusText);

            console.log('Http Status: ', error.response.status);

            console.log('Message: ', error.response.data.retMsg);

            return rejects(error.response.data);
          }
        );
    });
  }

  async getAllGroupTree(param, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (param != null) {
      OpenObjOri.object = param;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getAllGroupTreeUri, null, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response.statusText);

            console.log('Http Status: ', error.response.status);

            console.log('Message: ', error.response.data.retMsg);

            return rejects(error.response.data);
          }
        );
    });
  }

  async getDeviceList(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    var body = {
      groupIds: object.groupIds
    };

    console.log('device list BODY: ', body);


    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getDeviceListUri, body, {
        headers: {
          "Content-Type": "application/json",
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response.statusText);

            console.log('Http Status: ', error.response.status);

            console.log('Message: ', error.response.data.retMsg);

            return rejects(error.response.data);
          }
        );
    });
  }


  async getRealTimeDataOfTheDevice(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    var body = {
      groupIds: object.groupIds
    };

    console.log('get real time device BODY: ', body);


    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getRealTimeDataOfTheDeviceUri, body, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response.statusText);

            console.log('Http Status: ', error.response.status);

            console.log('Message: ', error.response.data.retMsg);

            return rejects(error.response.data);
          }
        );
    });
  }


  async getVariablesOfTheDeviceHistory(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    var body = object;
    console.log('BODY: ', body);

    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getVariablesOfTheDeviceHistoryUri, body, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response.statusText);

            console.log('Http Status: ', error.response.status);

            console.log('Message: ', error.response.data.retMsg);

            return rejects(error.response.data);
          }
        );
    });
  }

  async getHistoricalDataOfTheDevice(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    var body = {
      deviceId: object.deviceId,
      positionId: object.positionId,
      startDate: object.startDate,
      endDate: object.endDate,
      number: object.number
    };

    console.log('BODY: ', body);


    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getHistoricalDataOfTheDeviceUri, body, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response?.statusText);

            console.log('Http Status: ', error.response?.status);

            console.log('Message: ', error);

            return rejects(error);
          }
        );
    });
  }

  async getHistoricalAlarmOfTHeDevice(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    var body = {
      startDate: object.startDate,
      endDate: object?.endDate,
      groupIds: object.groupIds,
      currentPage: object?.currentPage,
      searchStr: object?.searchStr,
      showCount: object?.showCount,
      langType: object?.langType,
    };

    console.log('BODY: ', body);


    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getHistoricalAlarmOfTHeDeviceUri, body, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {
            console.log('Status Text: ', error.response?.statusText);

            console.log('Http Status: ', error.response?.status);

            console.log('Message: ', error);

            return rejects(error);
          }
        );
    });
  }

  async getInternalInfo(object, randomStr, token) {

    var OpenObjOri: { [k: string]: any; } = {};
    if (object != null) {
      OpenObjOri.object = object;
    }

    if (randomStr != null) {
      OpenObjOri.randomStr = randomStr;
    }

    if (token != null) {
      OpenObjOri.token = token;
    }

    var jsonStr = JSON.stringify(OpenObjOri);
    console.log('JSON STRING: ', jsonStr);

    var sign = Md5.hashStr(jsonStr);
    console.log('STR: ', sign);

    return new Promise((resolve, rejects) => {
      this.httpService.post(this.apiUriHead + this.getInternalInfoUri, null, {
        headers: {
          "Content-Type": "application/json",
          // "Alg-OpenParam": "{\"appId\":" + this.appId + ",\"sign\":" + this.sign + ",\"randomStr\":" + this.randomStr + "}"
          "Alg-OpenParam": `{"appId":"${this.appId}","sign":"${sign}","randomStr":"${randomStr}"}`
        },
      })
        .subscribe(
          res => {
            console.log('DATA: ', res.data);
            return resolve(res.data);
          },
          error => {

            console.log('Error: ', error.response.data);

            return rejects(error.response.data);
          }
        );
    });
  }


}


export interface IDeviceDetail {
    partsPerMinute: string,
    status: string,
    deviceId: string,
    order: string,
    timestamp: string
  }

export interface IConfig {
    availableLanguages: string[],
    environment: string,
    environmentColour: string,
    environmentName: string,
    endpoints: unknown
  }

  export interface IOrderDetails {
    productionTarget: number,
    productionState: number
  }
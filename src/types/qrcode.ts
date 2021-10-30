import { JsonConvert, JsonObject, JsonProperty } from 'json2typescript'
import { v4 as uuidv4 } from 'uuid'

export enum QrCodeType {
  URL = 'url',
  SMS = 'sms',
  Email = 'email',
  Call = 'call',
  Contact = 'contact',
}

@JsonObject('QrCode')
export class QrCode {

  @JsonProperty('id', String)
  id: string = uuidv4()

  @JsonProperty('name', String)
  name: string = 'New Code'

  @JsonProperty('type', String)
  type: QrCodeType = QrCodeType.URL
  
  @JsonProperty('url', String, true)
  url?: string = undefined

  @JsonProperty('createdAt', Number)
  createdAt: number = new Date().getTime()

  @JsonProperty('lastSyncOn', Number, true)
  lastSyncOn?: number = undefined

  constructor(obj?: Partial<QrCode>) {
    if (obj) {
      Object.assign(this, obj)
    }
  }

  toJson(): string {
    const jsonConvert: JsonConvert = new JsonConvert();
    return jsonConvert.serialize(this, QrCode)
  }

  get content() {
    if (this.type === QrCodeType.URL) {
      return `https://qrcoder-api.tonylin0826.workers.dev/url-uuid/${this.id}`;
    }

    return ''
  }

  static fromJson(json: object): QrCode {
    const jsonConvert: JsonConvert = new JsonConvert();
    return jsonConvert.deserializeObject<QrCode>(json, QrCode)
  }
}

export interface QrCodeDetailUrlProps {
  code: QrCode
  setCode: React.Dispatch<React.SetStateAction<QrCode>>
}
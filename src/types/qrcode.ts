import { JsonConvert, JsonObject, JsonProperty } from 'json2typescript'
import { v4 as uuidv4 } from 'uuid'

export enum QrCodeType {
  URL = 'url',
  SMS = 'sms',
  Email = 'email',
  Call = 'call',
  // Contact = 'contact',
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

  @JsonProperty('smsMessage', String, true)
  smsMessage?: string = undefined

  @JsonProperty('smsPhone', String, true)
  smsPhone?: string = undefined

  @JsonProperty('callPhone', String, true)
  callPhone?: string = undefined

  @JsonProperty('emailRecipient', String, true)
  emailRecipient?: string = undefined

  @JsonProperty('emailSubject', String, true)
  emailSubject?: string = undefined

  @JsonProperty('emailText', String, true)
  emailText?: string = undefined

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

    if (this.type === QrCodeType.SMS) {
      return `SMSTO:${this.smsPhone}:${this.smsMessage}`
    }

    if (this.type === QrCodeType.Call) {
      return `tel:${this.callPhone}`
    }

    if (this.type === QrCodeType.Email) {
      return `mailto:${this.emailRecipient},?subject=${this.emailSubject}&body=${this.emailText}`
    }


    return 'tests'
  }

  static fromJson(json: object): QrCode {
    const jsonConvert: JsonConvert = new JsonConvert();
    return jsonConvert.deserializeObject<QrCode>(json, QrCode)
  }
}

export interface QrCodeDetailProps {
  code: QrCode
  setCode: React.Dispatch<React.SetStateAction<QrCode>>
}
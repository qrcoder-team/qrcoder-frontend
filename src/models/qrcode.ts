import { createModel } from '@rematch/core'
import { RootModel } from './'
import { QrCode } from '../types/qrcode'

export const qrCode = createModel<RootModel>()({
  state: [] as QrCode[],
  reducers: {
    onQrCodeSuccess(state, payload: QrCode[]) {
      console.log(payload)
      return [...payload]
    },
  },
  effects: (dispatch) => ({
    getQrCodes() {
      const localstorageString = localStorage.getItem('codes') ?? '[]'
      const codes = JSON.parse(localstorageString)
      dispatch.qrCode.onQrCodeSuccess(
        codes.map((c: object) => QrCode.fromJson(c))
      )
      return codes
    },
    saveQrCodes(codes: QrCode[]) {
      const tobeStored = JSON.stringify(codes.map((c) => c.toJson()))
      localStorage.setItem('codes', tobeStored)
    }
  }),
})

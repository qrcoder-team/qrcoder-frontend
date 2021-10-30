import { Button, Container, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RootModel } from '../models'
import { Dispatch } from '../store'
import { QrCode } from '../types/qrcode'
import QrCodeComponent from './qrcode'

const QrCodeList = (): React.ReactElement => {
  const qrCodes = useSelector(
    (state: RootModel) => state.qrCode
  ) as unknown as QrCode[]
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  useEffect(() => {
    dispatch.qrCode.getQrCodes()
  }, [dispatch])

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Grid container spacing={0}>
        <Button
          variant="outlined"
          onClick={() => {
            const newCode = new QrCode({ url: 'https://example.com' })
            dispatch.qrCode.saveQrCodes([...qrCodes, newCode])

            history.push(`/qrcodes/${newCode.id}`)
          }}
        >
          Create a new QRCode
        </Button>
      </Grid>

      <Grid container spacing={4} sx={{ paddingTop: 4 }}>
        {qrCodes.map((code, idx) => (
          <Grid key={`code${idx}`} item xs={12} sm={12} md={6}>
            <QrCodeComponent {...code}></QrCodeComponent>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default QrCodeList

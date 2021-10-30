import { Button, Container, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RootModel } from '../models'
import { Dispatch } from '../store'
import { QrCode } from '../types/qrcode'
import QrCodeComponent from './qrcode'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import QrCodeIcon from '@mui/icons-material/QrCode'

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
      {qrCodes.length > 0 && (
        <>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                QR Codes
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  const newCode = new QrCode({ url: 'https://example.com' })
                  dispatch.qrCode.saveQrCodes([...qrCodes, newCode])

                  history.push(`/qrcodes/${newCode.id}`)
                }}
              >
                <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                Create a new QRCode
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ paddingTop: 4 }}>
            {qrCodes.map((code, idx) => (
              <Grid key={`code${idx}`} item xs={12} sm={12} md={6}>
                <QrCodeComponent code={code}></QrCodeComponent>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {qrCodes.length === 0 && (
        <Grid
          container
          spacing={4}
          sx={{ paddingTop: 4, width: '100%', marginTop: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item container xs={12} justifyContent="center">
            <QrCodeIcon sx={{ width: 320, height: 320, opacity: 0.5 }} />
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              Create your first QR Code
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            sx={{ paddingTop: '16px !important' }}
          >
            <Typography
              variant="body1"
              sx={{
                maxWidth: 324,
                textAlign: 'center',
                opacity: 0.5,
              }}
            >
              Almost there! Try create a dynamical URL QR Code and play around
              with it
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                const newCode = new QrCode({ url: 'https://example.com' })
                dispatch.qrCode.saveQrCodes([...qrCodes, newCode])

                history.push(`/qrcodes/${newCode.id}`)
              }}
            >
              <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
              Create a new QRCode
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default QrCodeList

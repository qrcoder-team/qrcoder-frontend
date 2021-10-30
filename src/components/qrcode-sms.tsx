import { Grid, Link, styled, TextField, Typography } from '@mui/material'
import { QrCode, QrCodeDetailProps } from '../types/qrcode'
import QrCodeWithLogo from 'qrcode-with-logos'
import { useEffect } from 'react'

const Img = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  border: 'solid 1px rgb(227, 238, 255)',
  borderRadius: 10,
})

const QrCodeSms = ({
  code,
  setCode,
}: QrCodeDetailProps): React.ReactElement => {
  const updateQrCodeImage = () => {
    const ncode = new QrCode(code)
    const qrcodeImage = new QrCodeWithLogo({
      content: ncode.content,
      width: 384,
      image: document.getElementById(`img-${ncode.id}`) as HTMLImageElement,
      // logo: {
      //   src: "https://avatars1.githubusercontent.com/u/28730619?s=460&v=4"
      // }
    })

    qrcodeImage.toImage()
  }

  useEffect(() => {
    updateQrCodeImage()
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          value={code.name}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                name: e.target.value,
              })
            )
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Recipient Phone Number"
          value={code.smsPhone}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                smsPhone: e.target.value,
              })
            )
          }}
          onBlur={() => {
            updateQrCodeImage()
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ marginTop: [2, 2, 0] }}>
        <TextField
          label="Text Message"
          value={code.smsMessage}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                smsMessage: e.target.value,
              })
            )
          }}
          onBlur={() => {
            updateQrCodeImage()
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <Typography variant="body1">
          This QRCode will be direct to <Link href={code.url}>{code.url}</Link>
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          marginTop: 4,
          background: '#',
          display: 'flex',
          justifyContent: ['center', 'center', 'flex-start'],
        }}
      >
        <Img
          id={`img-${code.id}`}
          alt="complex"
          sx={{ width: 384, height: 384 }}
        />
      </Grid>
    </Grid>
  )
}

export default QrCodeSms

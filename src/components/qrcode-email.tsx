import { Grid, styled, TextField } from '@mui/material'
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

const QrCodeEmail = ({
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
      <Grid item xs={12} md={4}>
        <TextField
          label="Send To"
          value={code.emailRecipient}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                emailRecipient: e.target.value,
              })
            )
          }}
          onBlur={() => {
            updateQrCodeImage()
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          label="Email Subject"
          value={code.emailSubject}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                emailSubject: e.target.value,
              })
            )
          }}
          onBlur={() => {
            updateQrCodeImage()
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email Text"
          multiline
          rows={10}
          value={code.emailText}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                emailText: e.target.value,
              })
            )
          }}
          onBlur={() => {
            updateQrCodeImage()
          }}
        />
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

export default QrCodeEmail

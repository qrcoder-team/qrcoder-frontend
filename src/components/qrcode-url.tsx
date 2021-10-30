import { Grid, Link, styled, TextField, Typography } from '@mui/material'
import { QrCode, QrCodeDetailUrlProps } from '../types/qrcode'

const Img = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const QrCodeUrl = ({
  code,
  setCode,
}: QrCodeDetailUrlProps): React.ReactElement => {
  return (
    <Grid container>
      <Grid item xs={12} justifyContent="flex-start">
        <Img
          alt="complex"
          src="https://mui.com/static/images/grid/complex.jpg"
          sx={{ width: 128, height: 128 }}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <TextField
          label="URL"
          value={code.url}
          sx={{ width: '100%' }}
          onChange={(e) => {
            setCode(
              new QrCode({
                ...code,
                url: e.target.value,
              })
            )

            console.log(code)
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <Typography variant="body1">
          This QRCode will be direct to <Link href={code.url}>{code.url}</Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default QrCodeUrl

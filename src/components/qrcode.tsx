import {
  Button,
  ButtonBase,
  Card,
  Chip,
  Grid,
  styled,
  Typography,
} from '@mui/material'
import { useHistory } from 'react-router'
import QrCodeWithLogo from 'qrcode-with-logos'
import { useEffect } from 'react'
import { QrCode as QrCodeClass } from '../types/qrcode'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const QrCode = ({ code }: QrCodeProps): React.ReactElement => {
  const history = useHistory()
  const { id, type, createdAt, lastSyncOn, name } = code

  // const qrCodeImageState, setQrCodeImageState = useState()

  let qrcodeImage: QrCodeWithLogo | undefined = undefined

  const updateQrCodeImage = () => {
    qrcodeImage = new QrCodeWithLogo({
      content: new QrCodeClass(code).content,
      width: 128,
      image: document.getElementById(`img-${id}`) as HTMLImageElement,
      // logo: {
      //   src: "https://avatars1.githubusercontent.com/u/28730619?s=460&v=4"
      // }
    })

    qrcodeImage.toImage()
  }

  useEffect(() => {
    updateQrCodeImage()
  })

  console.log(document.getElementById(`img-${id}`))
  return (
    <Card
      sx={{
        padding: 4,
        boxShadow: 'rgb(0 0 0 / 6%) 0px 4px 24px;',
        '&:hover': {
          boxShadow: 'rgb(0 0 0 / 15%) 0px 4px 24px;',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              id={`img-${id}`}
              alt="complex"
              sx={{ width: 128, height: 128 }}
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={8} flexDirection="column" container>
          <Grid item container spacing={1}>
            <Grid item xs="auto">
              <Chip
                label={type.toUpperCase()}
                sx={{ background: 'rgb(196, 255, 195)', minWidth: 80 }}
              />
            </Grid>
            <Grid
              item
              xs="auto"
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12} sx={{ paddingTop: '16px !important' }}>
              <Typography variant="caption">
                Created At: {new Date(createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '0 !important' }}>
              <Typography variant="caption">
                Last Sync On:{' '}
                {lastSyncOn ? new Date(lastSyncOn).toLocaleString() : 'Never'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
        <Grid item xs="auto">
          <Button
            sx={{ width: 128 }}
            variant="outlined"
            onClick={() => {
              if (qrcodeImage) {
                qrcodeImage.downloadImage(`${code.name.replaceAll(' ', '')}`)
              }
            }}
          >
            Download
          </Button>
        </Grid>

        <Grid item xs={8} sx={{ flex: 1 }}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            onClick={() => {
              history.push(`/qrcodes/${id}`)
            }}
          >
            <ModeEditOutlineIcon sx={{ marginRight: 1 }} />
            Modify
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export interface QrCodeProps {
  code: QrCodeClass
}

export default QrCode

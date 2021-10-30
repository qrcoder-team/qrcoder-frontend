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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const QrCode = ({
  id,
  name,
  type,
  createdAt,
  lastSyncOn,
}: QrCodeProps): React.ReactElement => {
  const history = useHistory()

  return (
    <Card sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              alt="complex"
              src="https://mui.com/static/images/grid/complex.jpg"
              sx={{ width: 128, height: 128 }}
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={8} flexDirection="column" container>
          <Grid item container spacing={1}>
            <Grid item xs="auto">
              <Chip label={type.toUpperCase()} />
            </Grid>
            <Grid
              item
              xs="auto"
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography variant="body2">{name}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="caption">
                Created At: {new Date(createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
          <Button sx={{ width: 128 }} variant="outlined">
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
            Modify
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export interface QrCodeProps {
  id: string
  name: string
  type: string
  createdAt: number
  lastSyncOn?: number
}

export default QrCode

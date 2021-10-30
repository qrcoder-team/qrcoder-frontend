import { AppBar, Toolbar, Typography } from '@mui/material'
import QrCode2Icon from '@mui/icons-material/QrCode2'

const Header = (): React.ReactElement => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <QrCode2Icon sx={{ marginRight: 1 }} />
          <Typography variant="h6" component="div">
            QRCoder
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header

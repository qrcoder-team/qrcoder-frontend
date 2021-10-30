import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = (): React.ReactElement => {
  return (
    <>
      <AppBar>
        <Toolbar>
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

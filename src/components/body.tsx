import { Redirect, Route, Switch } from 'react-router-dom'
import QrCodeDetail from './qrcode-detail'
import QrCodeList from './qrcode-list'

const Body = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/qrcodes/:id">
        <QrCodeDetail />
      </Route>
      <Route path="/qrcodes">
        <QrCodeList />
      </Route>
      <Route path="/">
        <Redirect to={{ pathname: '/qrcodes' }} />
      </Route>
    </Switch>
  )
}

export default Body

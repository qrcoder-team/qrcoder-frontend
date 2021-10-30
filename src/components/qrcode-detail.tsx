import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import QrCodeUrl from './qrcode-url'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import axios from 'axios'
import { QrCode, QrCodeType } from '../types/qrcode'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '../store'
import { RootModel } from '../models'

const QrCodeDetail = (): React.ReactElement => {
  const { id }: { id: string } = useParams()
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

  const qrCodes = useSelector(
    (state: RootModel) => state.qrCode
  ) as unknown as QrCode[]

  const [code, setCode] = useState<QrCode>(new QrCode({ id: '' }))
  const [message, setMessage] = useState<{ message: string; open: boolean }>({
    message: '',
    open: false,
  })

  const save = () => {
    console.log(code)
    axios.put(
      'https://qrcoder-api.tonylin0826.workers.dev/api/qrcode',
      new QrCode(code).toJson(),
      { headers: { 'Content-Type': 'application/json' } }
    ) 

    const idx = qrCodes.findIndex(q => q.id === id)
    if (idx >= 0) {
      qrCodes[idx] = new QrCode({
        ...code,
        lastSyncOn: new Date().getTime()
      })

      dispatch.qrCode.saveQrCodes(qrCodes)
      console.log('save')
    }

    setMessage({
      message: 'Save success',
      open: true
    })
  }

  const qrCodeTypeOptions = () => {
    return (Object.keys(QrCodeType) as Array<keyof typeof QrCodeType>).map(
      (k) => (
        <MenuItem key={k} value={QrCodeType[k]}>
          {k}
        </MenuItem>
      )
    )
  }

  const qrCodeDetails = () => {
    const typeMap = new Map<QrCodeType, any>([[QrCodeType.URL, QrCodeUrl]])

    return (Object.keys(QrCodeType) as Array<keyof typeof QrCodeType>).map(
      (k, index: number) => {
        const Component = typeMap.get(QrCodeType[k])

        if (!Component || code.type !== QrCodeType[k]) {
          return <Fragment key={`cpt${index}`} />
        }

        return <Component key={`cpt${index}`} code={code} setCode={setCode} />
      }
    )
  }

  useEffect(() => {
    if (!code.id) {
      const codes: QrCode[] = dispatch.qrCode.getQrCodes()
      const foundCode = codes.find((c) => c.id === id)
      if (foundCode) {
        setCode(foundCode)
      }
    }
  }, [code, dispatch, id])

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Grid container spacing={0}>
        <Grid item container spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={save}>
              Save {id}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error">
              <DeleteForeverOutlinedIcon />
              Delete
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">QRCode Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={code.type}
              label="QRCode Type"
              onChange={(event: SelectChangeEvent) => {
                setCode(
                  new QrCode({
                    ...code,
                    type: event.target.value as QrCodeType,
                  })
                )
                console.log(code)
              }}
            >
              {qrCodeTypeOptions()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {code.id && <Box sx={{ marginTop: 4 }}>{qrCodeDetails()}</Box>}
      <Snackbar
        open={message.open}
        autoHideDuration={1000}
        onClose={() => {
          setMessage({
            ...message,
            open: false,
          })

          history.push('/qrcodes') 
        }}
        message={message.message}
      />
    </Container>
  )
}

export default QrCodeDetail

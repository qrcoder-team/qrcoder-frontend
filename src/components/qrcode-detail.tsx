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
import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import QrCodeUrl from './qrcode-url'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import { QrCode, QrCodeType } from '../types/qrcode'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '../store'
import { RootModel } from '../models'
import QrCodeSms from './qrcode-sms'
import QrCodeCall from './qrcode-call'
import QrCodeEmail from './qrcode-email'
import PublicIcon from '@mui/icons-material/Public'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import SmsIcon from '@mui/icons-material/Sms'
import EmailIcon from '@mui/icons-material/Email'

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

    const idx = qrCodes.findIndex((q) => q.id === id)
    if (idx >= 0) {
      qrCodes[idx] = new QrCode({
        ...code,
        lastSyncOn: new Date().getTime(),
      })

      dispatch.qrCode.saveQrCodes(qrCodes)
      console.log('save')
    }

    setMessage({
      message: 'Save success',
      open: true,
    })
  }

  const qrCodeTypeOptions = () => {
    const displayMap = new Map<QrCodeType, string>([
      [QrCodeType.URL, 'Dynamic URL'],
      [QrCodeType.SMS, 'Send an SMS'],
      [QrCodeType.Call, 'Make a phone call'],
      [QrCodeType.Email, 'Send and email'],
    ])

    const iconMap = new Map<QrCodeType, ReactElement>([
      [QrCodeType.URL, <PublicIcon sx={{ marginRight: 1 }} />],
      [QrCodeType.SMS, <SmsIcon sx={{ marginRight: 1 }} />],
      [QrCodeType.Call, <PhoneEnabledIcon sx={{ marginRight: 1 }} />],
      [QrCodeType.Email, <EmailIcon sx={{ marginRight: 1 }} />],
    ])

    return (Object.keys(QrCodeType) as Array<keyof typeof QrCodeType>).map(
      (k) => (
        <MenuItem key={k} value={QrCodeType[k]}>
          <Grid container>
            {iconMap.get(QrCodeType[k])}
            <span>{displayMap.get(QrCodeType[k])}</span>
          </Grid>
        </MenuItem>
      )
    )
  }

  const qrCodeDetails = () => {
    const typeMap = new Map<QrCodeType, any>([
      [QrCodeType.URL, QrCodeUrl],
      [QrCodeType.SMS, QrCodeSms],
      [QrCodeType.Call, QrCodeCall],
      [QrCodeType.Email, QrCodeEmail],
    ])

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
        <Grid item container spacing={1} justifyContent="space-between">
          <Grid item container spacing={1} xs="auto">
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  history.push('/qrcodes')
                }}
              >
                <ArrowBackIcon />
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={save}>
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                const index = qrCodes.findIndex((c) => c.id === id)
                if (index >= 0) {
                  qrCodes.splice(index, 1)
                }

                dispatch.qrCode.saveQrCodes(qrCodes)
                history.push('/qrcodes')
              }}
            >
              <DeleteForeverOutlinedIcon sx={{ marginRight: 1 }} />
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
                    ...(event.target.value === QrCodeType.SMS
                      ? { smsPhone: '', smsMessage: '' }
                      : {}),
                    ...(event.target.value === QrCodeType.Call
                      ? { callPhone: '' }
                      : {}),
                    ...(event.target.value === QrCodeType.Email
                      ? { emailRecipient: '', emailSubject: '', emailText: '' }
                      : {}),
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
        }}
        message={message.message}
      />
    </Container>
  )
}

export default QrCodeDetail

import {FieldValues, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import LoginIcon from '@mui/icons-material/Login'
import {Box, Button, Stack, Typography as MuiP} from '@mui/material'
import {grey} from '@mui/material/colors'
import {object, string} from 'yup'

import {useActions} from 'src/hooks'
import {licensed} from 'src/assets'
import {InputField} from 'src/components'
import {UserLoginRequestDto, UserLoginResponseModel} from 'src/models'
import {userMeAction} from 'src/store'
import {Path, request, setToken} from 'src/utils'

export const LoginPage = () => {
  const {getMe} = useActions({getMe: userMeAction})
  const form = useForm({resolver: yupResolver(schema)})
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = form

  const onSubmit = async (formData: FieldValues) => {
    const res = await request<UserLoginResponseModel, UserLoginRequestDto>(
      'POST',
      Path.Auth.signIn,
      {body: {inn: formData.inn, password: formData.password}},
      false,
    )

    if (res?.authenticationToken) {
      setToken(res.authenticationToken || '', 'accessToken')
      setToken(res.refreshToken || '', 'refreshToken')
      getMe()
    }
  }

  return (
    <Box sx={style.stack}>
      <Stack direction='row' sx={{height: '100vh'}}>
        <Box sx={[style.box, style.image]}>
          <Box sx={style.hoverPage}></Box>
        </Box>
        <Box sx={[style.box, style.center]}>
          <Box
            component='main'
            sx={{marginBottom: '200px', marginTop: '100px'}}
          >
            <Stack
              component={'form'}
              spacing={2}
              onSubmit={handleSubmit(onSubmit)}
              sx={{width: '400px'}}
            >
              <MuiP
                sx={{textAlign: 'center', color: grey[600], fontSize: '28px'}}
              >
                Пожалуйста, авторизуйтесь!
              </MuiP>
              <InputField
                name='inn'
                control={control}
                label='inn'
                error={!!errors.inn}
                helperText={errors.inn && errors.inn.message}
              />
              <InputField
                name='password'
                control={control}
                label='password'
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant='contained'
                  type='submit'
                  endIcon={<LoginIcon />}
                >
                  submit
                </Button>
              </Box>
            </Stack>
          </Box>
          <MuiP component='footer' sx={{color: grey[500]}}>
            Генеральная прокуратура Кыргызской Республики
          </MuiP>
        </Box>
      </Stack>
    </Box>
  )
}

const style = {
  box: {
    width: '50%',
  },
  stack: {
    minHeight: '100%',
    backgroundColor: grey[100],
  },
  image: {
    backgroundImage: `url(${licensed})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  hoverPage: {
    backgroundColor: "rgba(0, 0, 0, 0.375)",
    width: '100%',
    height: '100%'
  }
}

const schema = object().shape({
  inn: string().required('Это обязательное поле!'),
  password: string().required('Это обязательное поле!').min(3),
})

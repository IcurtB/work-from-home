import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import MuiP from '@mui/material/Typography'

import {kyrgyzstan, russia} from 'src/assets'

export const ChangeLang = () => {
  const [lang, setLang] = useState('kg')
  const {i18n} = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])
  console.log(lang)
  return (
    <Box>
      <FormControl variant='outlined'>
        <Select
          onChange={(event) => setLang(event.target.value)}
          value={lang}
          sx={select}
        >
          {options.map((i) => (
            <MenuItem key={i.alt} value={i.value}>
              <Box sx={style}>
                <MuiP
                  sx={{fontSize: '14px', fontWeight: 'bold', width: '80px'}}
                >
                  {i.label}
                </MuiP>
                <Box
                  component={'img'}
                  sx={{width: '30px', borderRadius: '3px'}}
                  src={i.src}
                  alt={i.alt}
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
const options = [
  {
    alt: 'icon-kg',
    label: 'kyrgyzstan',
    src: kyrgyzstan,
    value: 'kg',
  },
  {
    alt: 'icon-ru',
    label: 'russia',
    src: russia,
    value: 'ru',
  },
]
const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const select = {
  '& .MuiSelect-select': {
    padding: '5px 15px',
  },
  color: 'white',
  '& fieldset': {
    borderColor: 'white',
  },
  '& svg': {
    color: 'white',
  },
}

import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";

export const ChangeLang = () => {
    const [lang, setLang] = useState("kg");
    const {i18n} = useTranslation();
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n])

  return (
    <FormControl >
        <Select
            onChange={(event) => setLang(event.target.value)}
            value={lang}
            size='small'
            sx={{color: "black", outline: "none"}}
        >
            <MenuItem
                sx={{display: "flex", alignItems: "center", gap: 1}}
                value='kg'
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography sx={{ fontSize: '16px'}}>Кыргызча</Typography>
                    <img style={{width: '30px', borderRadius: '3px'}} src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg' alt='kg-icon' />
                </Box>
            </MenuItem>
            <MenuItem value='ru'>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <Typography sx={{ fontSize: '16px'}}>Русский</Typography>
                    <img style={{width: '30px', borderRadius: '3px'}} src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png' alt='icon-ru' />
                </Box>
            </MenuItem>
        </Select>
    </FormControl>
  )
}

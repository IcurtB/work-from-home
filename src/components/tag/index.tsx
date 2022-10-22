import {Chip} from '@mui/material';

export type colorType = 'primary' | 'success' | 'error'
export type fontWeightType = 'bold' | 'medium' | 'light' | 'normal'

type Props = {
  color?: colorType
  label?: string | number
  fontWeight?: fontWeightType
}

export const Tag = ({fontWeight = 'normal', color, label}: Props) => {
  return <Chip label={label} color={color} sx={{fontWeight}} />
}

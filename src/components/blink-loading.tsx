import colors from 'tailwindcss/colors';
import { BlinkBlur } from 'react-loading-indicators';

export function BlinkLoading() {
  return <BlinkBlur
    color={[colors.blue[500], colors.green[500], colors.red[500], colors.yellow[500]]}
    size="medium"
    text="Word Quest"
  />
}
import { cn } from "@/lib/cn"
import { useTheme } from "next-themes"
import { gray } from 'tailwindcss/colors'

interface WordQuestLogoProps {
  width?: string | "512"
  height?: string | "512"
  className?: string
}

export function WordQuestLogo({ width, height, className }: WordQuestLogoProps) {
  const { theme } = useTheme();
  return <svg
    width={width}
    height={height}
    viewBox="0 0 1456 1456"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={cn(className)}
      d="M576.333 182V500.5H879.667V182H576.333ZM500.5 576.333H182V879.667H500.5V576.333ZM576.333 879.667V576.333H879.667V879.667H576.333ZM500.5 955.5H182V1084.42C182 1134.7 201.974 1182.92 237.528 1218.47C273.081 1254.03 321.303 1274 371.583 1274H500.5V955.5ZM576.333 1274H879.667V955.5H576.333V1274ZM955.5 1274V955.5H1274V1084.42C1274 1134.7 1254.03 1182.92 1218.47 1218.47C1182.92 1254.03 1134.7 1274 1084.42 1274H955.5ZM1274 576.333V879.667H955.5V576.333H1274ZM1274 500.5V371.583C1274 321.303 1254.03 273.081 1218.47 237.528C1182.92 201.974 1134.7 182 1084.42 182H955.5V500.5H1274Z"
      fill={theme === 'dark' ? gray[900] : gray[50]}
    />
  </svg>


}
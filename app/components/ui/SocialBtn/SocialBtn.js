import { RiBehanceFill } from "@remixicon/react"
import style from "./style.module.css"
export default function SocialBtn( {Icon = RiBehanceFill, href = ""} ) {
  return (
    <a href={href} target="_blank" className={style.socialBtn}>
      <div className={style.socialBtnIcon}>
        <Icon />
      </div>
      <div className={style.socialBtnIcon}>
        <Icon />
      </div>
    </a>
  )
}
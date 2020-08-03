import enLocale from 'element-ui/lib/locale/lang/en'//element-ui的语言包
import titleLa from './en/title'//标题
import buttonLa from './en/buttons'//按钮
const en = {
    ...titleLa,
    ...enLocale,
    ...buttonLa
}
export default en;
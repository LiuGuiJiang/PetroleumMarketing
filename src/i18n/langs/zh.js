import zhLocale from 'element-ui/lib/locale/lang/zh-CN'//element-ui的语言包
import titleLa from './zh/title'//标题
import buttonLa from './zh/buttons'//按钮
// 这里需要使用ES6中的扩展运算符写法对对象进行深克隆。
const zh = {
    ...titleLa,
    ...zhLocale,
    ...buttonLa
}
export default zh;

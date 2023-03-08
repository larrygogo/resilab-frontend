export type LanguageType = {
  id: string
  title: string
  key: string
}


const languages: LanguageType[] = [
  {
    id: 'en_US',
    title: 'English',
    key: 'enUS',
  },
  {
    id: 'zh_CN',
    title: '简体中文',
    key: 'zhCN',
  }
]

export default languages;

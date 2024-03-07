import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { IDataType } from '../models'
import { webApiService } from '../../../services'
import { INCLUDES_URL } from '../../../constants'
import { validateEmail } from '../../../helpers/validateEmail/ValidateEmail'

export const PageContextAgenda = createContext<any | null>(null)

export const PageContextProviderAgenda = ({ children }: {children: ReactNode}) => {
  const { dataAgenda, setDataAgenda, openDrawer, setOpenDreawer, formValue, setFormValue } = useProviderStoreAgenda()
  const [isData, setIsData] = useState<number>(-1)

  // primer llamado de los registro
  const loadData = () => {
    setIsData(1)
    setDataAgenda({ ...dataAgenda, loading: true })
    webApiService.getList().then((respose) => respose).then((data) => {
      if (data.length > 0) {
        setDataAgenda({ ...dataAgenda, data, loading: false })
      }
    }).catch((err: unknown) => {
      const error = err as Error
      console.error('Error ', error.message)
      setDataAgenda({ ...dataAgenda, loading: false, data: null })
    })
  }
  useEffect(() => {
    isData === -1 && loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // OPEN/CLOSE DRAWER
  const handleOpenDrawer = () => {
    setOpenDreawer(!openDrawer)
  }
  // VALIDATE FORM
  const validateForm = () => {
    if (!formValue.avatar || !formValue.avatar.includes(INCLUDES_URL)) {
      setFormValue({ ...formValue, isError: true })
      return false
    }
    if (formValue.fullName === undefined || formValue.fullName === '') {
      setFormValue({ ...formValue, isError: true })
      return false
    }
    if (formValue.email === undefined || formValue.fullName === '' || (!validateEmail(formValue.email))) {
      setFormValue({ ...formValue, isError: true })
      return false
    }

    if (formValue.phone === undefined || formValue.phone === '') {
      setFormValue({ ...formValue, isError: true })
      return false
    }

    setFormValue({ ...formValue, isError: false })
    return true
  }

  return (
    <PageContextAgenda.Provider
      value={{
        loadData,
        dataAgenda,
        setDataAgenda,
        openDrawer,
        setOpenDreawer,
        handleOpenDrawer,
        formValue,
        setFormValue,
        validateForm // form Validate
      }}
    >
      {isData === 1 ? children : <span>Obteniendo información...</span>}
    </PageContextAgenda.Provider>
  )
}

export const useProviderStoreAgenda = () => {
  const [dataAgenda, setDataAgenda] = useState<{loading: boolean, data: IDataType[] | null}>({
    loading: false,
    data: null
  })

  // Drawer
  const [openDrawer, setOpenDreawer] = useState<boolean>(false)

  // formulario
  const [formValue, setFormValue] = useState<{
    loading: boolean
    isError: boolean
    id?: string | number | null
    fullName: string
    descriptions: string
    email: string
    phone: number | string
    avatar: string}>({
      loading: false,
      isError: false,
      id: '',
      fullName: '',
      descriptions: '',
      email: '',
      phone: '',
      avatar: ''

    })

  return {
    dataAgenda,
    setDataAgenda,
    openDrawer,
    setOpenDreawer,
    formValue,
    setFormValue
  }
}

export const usePageContextAgenda = () => {
  const pageContext = useContext(PageContextAgenda)

  if (pageContext === undefined) {
    throw new Error('PageContext must be use within Agenda')
  }
  return pageContext
}

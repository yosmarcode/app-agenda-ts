import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { IDataType } from '../models'
import { webApiService } from '../../../services'

export const PageContextAgenda = createContext<any | null>(null)

export const PageContextProviderAgenda = ({ children }: {children: ReactNode}) => {
  const { dataAgenda, setDataAgenda, openDrawer, setOpenDreawer } = useProviderStoreAgenda()
  const [isData, setIsData] = useState<number>(-1)

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

  return (
    <PageContextAgenda.Provider
      value={{
        dataAgenda,
        setDataAgenda,
        openDrawer,
        setOpenDreawer,
        handleOpenDrawer
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
  const [openDrawer, setOpenDreawer] = useState<boolean>(false)

  return {
    dataAgenda,
    setDataAgenda,
    openDrawer,
    setOpenDreawer
  }
}

export const usePageContextAgenda = () => {
  const pageContext = useContext(PageContextAgenda)

  if (pageContext === undefined) {
    throw new Error('PageContext must be use within Agenda')
  }
  return pageContext
}

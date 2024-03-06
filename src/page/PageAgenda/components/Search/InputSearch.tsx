import { Input } from 'antd'
import React from 'react'
import { usePageContextAgenda } from '../../context/PageContextAgenda'
import { webApiService } from '../../../../services'

export const InputSearch = () => {
  const { dataAgenda, setDataAgenda } = usePageContextAgenda()

  const handleloadDataBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value ?? '' as string
    setDataAgenda({ ...dataAgenda, loading: true })
    webApiService.getUserBySearch(search).then((respose) => respose).then((data) => {
      if (data.length > 0) {
        setDataAgenda({ ...dataAgenda, data, loading: false })
      }
    }).catch((err: unknown) => {
      const error = err as Error
      console.error('Error ', error.message)
      setDataAgenda({ ...dataAgenda, loading: false, data: null })
    })
  }

  return (
    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <Input
        placeholder='Buscar Contacto Agenda...'
        onBlur={(e) => handleloadDataBySearch(e)}
      />
    </div>
  )
}

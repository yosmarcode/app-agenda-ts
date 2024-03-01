import { AiTwotoneDelete } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import TitleComponents from '../../components/TitleComponents/TitleComponents'
import BtnNewRecord from './components/Bottom/BtnNewRecord'
import { TblList } from './components/Table/TblList'
import { Avatar, Space, TableProps } from 'antd'
import { InputSearch } from './components/Search/InputSearch'
import { webApiService } from '../../services'

export interface IDataType {
    key: string;
    id: number;
    fullName: string;
    descriptions: string;
    email: string;
    phone: string;
    avatar: string
  }

export const dataColumns: TableProps<IDataType>['columns'] = [
  {
    title: 'Nombres',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_, x) => (
      <Space size='middle'>
        <Avatar size={64} icon={x.avatar ? (<FaUserAlt />) : ''} src={x.avatar} />
        <span>{x.fullName}</span>
      </Space>
    )
  },
  {
    title: 'Descripción',
    dataIndex: 'descriptions',
    key: 'descriptions'
  },
  {
    title: 'Correo',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Acciones',
    key: 'action',
    render: (_, x) => (
      <Space size='middle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AiTwotoneDelete style={{ fontSize: '20px' }} />

      </Space>
    )
  }

]

const PageAgenda = () => {
  const [data, setData] = useState(null)
  const loadData = () => {
    webApiService.getList().then((respose) => respose).then((data) => {
      if (data.length > 0) {
        setData(data)
        console.log(data)
      }
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>

      <TitleComponents title='Agenda Contacto' />
      <BtnNewRecord />
      <InputSearch />
      <TblList dataSource={data ?? []} columns={dataColumns} />
    </div>
  )
}

export default PageAgenda

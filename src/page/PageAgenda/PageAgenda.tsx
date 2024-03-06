/* eslint-disable jsx-a11y/anchor-is-valid */
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import React from 'react'
import TitleComponents from '../../components/TitleComponents/TitleComponents'
import BtnNewRecord from './components/Bottom/BtnNewRecord'
import { TblList } from './components/Table/TblList'
import { Avatar, Space, TableProps } from 'antd'
import { InputSearch } from './components/Search/InputSearch'

import { IDataType } from './models'
import { usePageContextAgenda } from './context/PageContextAgenda'

export const dataColumns: TableProps<IDataType>['columns'] = [
  {
    title: 'Nombres',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_, x) => (
      <Space size='middle'>
        <Avatar size={36} icon={x.avatar ? (<FaUserAlt />) : ''} src={x.avatar} />
        <a>{x.fullName}</a>
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
  const { dataAgenda } = usePageContextAgenda()
  return (
    <div>
      <TitleComponents title='Agenda Contacto' />
      <BtnNewRecord />
      <InputSearch />
      <TblList dataSource={dataAgenda ?? []} columns={dataColumns} />
    </div>
  )
}

export default PageAgenda

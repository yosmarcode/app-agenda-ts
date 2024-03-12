/* eslint-disable jsx-a11y/anchor-is-valid */
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import React from 'react'
import TitleComponents from '../../components/TitleComponents/TitleComponents'
import BtnNewRecord from './components/Bottom/BtnNewRecord'
import { TblList } from './components/Table/TblList'
import { Avatar, Space, Spin, TableProps } from 'antd'
import { InputSearch } from './components/Search/InputSearch'

import { IDataType } from './models'
import { usePageContextAgenda } from './context/PageContextAgenda'
import { webApiService } from '../../services'
import DrawerComponents from '../../components/Drawer/DrawerComponents'
import Swal from 'sweetalert2'

const PageAgenda = () => {
  const { dataAgenda, setFormValue, formValue, openDrawer, handleOpenDrawer, loadData, resetForm } = usePageContextAgenda()

  const dataColumns: TableProps<IDataType>['columns'] = [
    {
      title: 'Nombres',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, x) => (
        <Space size='middle'>
          <Avatar size={36} icon={x.avatar ? (<FaUserAlt />) : ''} src={x.avatar} />
          <a onClick={() => handleUserSearchId(x.id)}>{x.fullName}</a>
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
        <Space size='middle' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AiTwotoneDelete style={{ fontSize: '20px' }} onClick={() => handleDeleteById(x.id)} />
        </Space>
      )
    }

  ]

  const handleUserSearchId = (id: string | number) => {
    resetForm() // limpiar datos
    setFormValue({ ...formValue, loading: true })
    webApiService.getUserId(id).then((response) => response).then((data) => {
      if (data) {
        const {
          id,
          fullName,
          descriptions,
          email,
          phone,
          avatar
        } = data

        setTimeout(() => {
          handleOpenDrawer()
          setFormValue({
            ...formValue,
            id,
            fullName,
            descriptions,
            email,
            phone,
            avatar,
            loadign: false
          })
        }, 1000)
      }
    }).catch((error: unknown) => {
      const err = error as Error
      console.log('Errror ', err.message)
      setFormValue({ ...formValue, Loading: false })
    })
  }

  const handleDeleteById = (id: string | number) => {
    Swal.fire({
      title: 'Quieres eliminar el contacto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
      // denyButtonText: 'Don\'t save'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        webApiService.deleteUserService(id).then((response) => response).then((data) => {
          if (data) {
            Swal.fire('Usuario eliminado con exito', '', 'success')
          }
          setTimeout(() => { loadData() }, 1500)
        }).catch((error: unknown) => {
          const err = error as Error
          console.log('Errror ', err.message)
          Swal.fire(err.message, '', 'info')
          setFormValue({ ...formValue, Loading: false })
        })
      } else if (result.isDenied) {
        Swal.fire('No Eliminado', '', 'info')
      }
    })
  }

  return (
    <div>

      <Spin tip='Loading' spinning={formValue.loading} size='small'>
        <div className='content' />

        <TitleComponents title='Agenda Contacto' />
        <BtnNewRecord />
        <InputSearch />
        <TblList dataSource={dataAgenda ?? []} columns={dataColumns} />

        {/** dreawer editar contacto */}
        <DrawerComponents openDrawer={openDrawer} handleDreawer={handleOpenDrawer} />
      </Spin>
    </div>

  )
}

export default PageAgenda

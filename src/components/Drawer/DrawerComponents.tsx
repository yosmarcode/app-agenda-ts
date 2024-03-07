import { Button, Drawer, Space } from 'antd'
import React from 'react'
import FormAgenda from '../../page/PageAgenda/components/Form/FormAgenda'
import { usePageContextAgenda } from '../../page/PageAgenda/context/PageContextAgenda'
import { webApiService } from '../../services'
import { IDataType } from '../../page/PageAgenda/models'
import Swal from 'sweetalert2'

import { INCLUDES_URL } from '../../constants'

const DrawerComponents = ({ openDrawer, handleDreawer } : {openDrawer: boolean, handleDreawer: any}) => {
  const { formValue, loadData, validateForm } = usePageContextAgenda()
  const { fullName, descriptions, avatar, phone, email } = formValue

  const handleSaveUser = () => {
    if (validateForm()) {
      const bodyUser = {
        fullName,
        descriptions,
        avatar,
        phone,
        email

      } as unknown as IDataType

      webApiService.saveUserService(bodyUser).then((resp) => {
        if (resp === 201) {
          Swal.fire({
            title: 'Excelente',
            text: 'Se ha registrado correctamente',
            icon: 'success'
          })
          setTimeout(() => {
            loadData()
          }, 1000)
        }
      })
    }
  }

  return (
    <div>
      <Drawer
        title='Crear Registro'
        placement='right'
        onClose={handleDreawer}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={handleDreawer}>Cancelar</Button>
            <Button
              type='primary'
              onClick={handleSaveUser}
            >
              Guardar
            </Button>
          </Space>
}
      >
        {JSON.stringify(!formValue.avatar.includes(INCLUDES_URL))}
        <FormAgenda />
      </Drawer>
    </div>
  )
}

export default DrawerComponents

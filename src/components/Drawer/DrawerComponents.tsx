import { Button, Drawer, Space } from 'antd'
import React from 'react'
import FormAgenda from '../../page/PageAgenda/components/Form/FormAgenda'

const DrawerComponents = ({ openDrawer, handleDreawer } : {openDrawer: boolean, handleDreawer: any}) => {
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
            >
              Guardar
            </Button>
          </Space>
}
      >
        <FormAgenda />
      </Drawer>
    </div>
  )
}

export default DrawerComponents

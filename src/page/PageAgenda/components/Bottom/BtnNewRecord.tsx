import { Button } from 'antd'
import React from 'react'
import DrawerComponents from '../../../../components/Drawer/DrawerComponents'
import { usePageContextAgenda } from '../../context/PageContextAgenda'

const BtnNewRecord = () => {
  const { openDrawer, handleOpenDrawer } = usePageContextAgenda()
  return (
    <div style={{ paddingTop: '20px' }}>
      <Button
        type='primary'
        onClick={handleOpenDrawer}
      >Nuevo Contacto +
      </Button>

      <DrawerComponents openDrawer={openDrawer} handleDreawer={handleOpenDrawer} />

    </div>
  )
}

export default BtnNewRecord

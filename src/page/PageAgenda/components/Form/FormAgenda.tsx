import { Flex, Input, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography

const FormAgenda = () => {
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
  return (
    <div>
      {JSON.stringify(formValue)}
      <Flex vertical gap={1}>
        <Title level={5}>Url Imagen Perfil</Title>
        <Input
          type='text'
          placeholder='Indique Url'
          value={formValue.avatar}
          onChange={(e) => {
            setFormValue({ ...formValue, avatar: e.target.value })
          }}
        />
        <Title level={5}>Nombre</Title>
        <Input
          type='text'
          placeholder='Indique Nombre Contacto'
          value={formValue.fullName}
          onChange={(e) => {
            setFormValue({ ...formValue, fullName: e.target.value })
          }}
        />
        <Title level={5}>Correo Electronico</Title>
        <Input
          type='text'
          placeholder='Indique Email'
          value={formValue.email}
          onChange={(e) => {
            setFormValue({ ...formValue, email: e.target.value })
          }}
        />
        <Title level={5}>Teléfono</Title>
        <Input
          type='text'
          placeholder='Indique Email'
          value={formValue.phone}
          onChange={(e) => {
            setFormValue({ ...formValue, phone: e.target.value })
          }}
        />
        <Title level={5}>Descripción Contacto</Title>
        <Input
          type='text'
          placeholder='Indique Email'
          value={formValue.descriptions}
          onChange={(e) => {
            setFormValue({ ...formValue, descriptions: e.target.value })
          }}
        />
      </Flex>
    </div>
  )
}

export default FormAgenda

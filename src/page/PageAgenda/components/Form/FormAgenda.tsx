import { Flex, Input, Typography } from 'antd'
import React from 'react'
import { usePageContextAgenda } from '../../context/PageContextAgenda'
import { COLOR_ERROR, INCLUDES_URL } from '../../../../constants'
import { validateEmail } from '../../../../helpers/validateEmail/ValidateEmail'

const { Title } = Typography

const FormAgenda = () => {
  const { formValue, setFormValue } = usePageContextAgenda()
  return (
    <div>

      <Flex vertical gap={1}>
        <Title level={5}>Url Imagen Perfil</Title>
        <Input
          type='text'
          placeholder='Indique Url'
          value={formValue.avatar}
          onChange={(e) => {
            setFormValue({ ...formValue, avatar: e.target.value })
          }}
          status={formValue.isError && (formValue.avatar?.length === 0) ? 'error' : (formValue.avatar?.length > 0 && !formValue.avatar.includes(INCLUDES_URL)) ? 'error' : ''}
        />
        {formValue.isError && ((formValue.avatar?.length === 0) || (formValue.avatar?.length > 0 && !formValue.avatar?.includes(INCLUDES_URL))) && (
          <span style={{ margin: 5, color: COLOR_ERROR }}>{formValue.avatar?.length > 0 && !formValue.avatar?.includes(INCLUDES_URL) ? 'Formato URL no valido' : 'Indique URL'}</span>
        )}

        <Title level={5}>Nombre</Title>
        <Input
          type='text'
          placeholder='Indique Nombre Contacto'
          value={formValue.fullName}
          onChange={(e) => {
            setFormValue({ ...formValue, fullName: e.target.value })
          }}
          status={formValue.isError && formValue.fullName?.length === 0 ? 'error' : ''}
        />
        {formValue.isError && formValue.fullName?.length === 0 && (
          <span style={{ margin: 5, color: COLOR_ERROR }}>Indique Nombre</span>
        )}
        <Title level={5}>Correo Electronico</Title>
        <Input
          type='text'
          placeholder='Indique Email'
          value={formValue.email}
          onChange={(e) => {
            setFormValue({ ...formValue, email: e.target.value })
          }}
          onBlur={(e) => formValue.email?.length > 0 && validateEmail(formValue.email)}
          status={formValue.isError && (formValue.email?.length === 0 || !validateEmail(formValue.email)) ? 'error' : ''}
        />
        {formValue.isError && (formValue.email?.length === 0 || !validateEmail(formValue.email)) && (
          <span style={{ margin: 5, color: COLOR_ERROR }}>Correo no valido!</span>
        )}

        <Title level={5}>Teléfono</Title>
        <Input
          type='text'
          placeholder='Indique N° Teléfono'
          value={formValue.phone}
          onChange={(e) => {
            setFormValue({ ...formValue, phone: e.target.value })
          }}
          status={formValue.isError && formValue.phone?.length === 0 ? 'error' : ''}
        />

        {formValue.isError && formValue.phone?.length === 0 && (
          <span style={{ margin: 5, color: COLOR_ERROR }}>Indique Número de contacto</span>
        )}

        <Title level={5}>Descripción Contacto</Title>
        <Input
          type='text'
          placeholder='Indique descripción'
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

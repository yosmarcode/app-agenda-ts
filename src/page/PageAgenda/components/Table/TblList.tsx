import { Table } from 'antd'
import React from 'react'

export const TblList = ({ dataSource, columns }: { dataSource: Object | any, columns: Object | any }) => {
  return (
    <div style={{ paddingTop: '25px' }}>

      <Table dataSource={dataSource} columns={columns} />

    </div>
  )
}

import React, {
  useEffect, useState, useMemo, memo,
} from 'react'
import {
  Col, Row, Table, Space, Button, message, Popconfirm,
} from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import api from '../../api'
import './list-medications.scss'
import { ModalAddDrug } from './ModalAddDrug/ModalAddDrug'
import { ModalInformationMedication } from './ModalInformationMedication/ModalInformationMedication'

const MemoModalInformationMedication = memo(ModalInformationMedication)

export const MedicationList = () => {
  const [listMedications, setListMedications] = useState([])
  const [informationMedication, setInformationMedication] = useState({})
  const [isShowModalInformationMedication, setIsShowModalInformationMedication] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDrug, setIsAddDrug] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const getListMedications = async ({ page, limit }) => {
    setIsLoading(true)
    try {
      const result = await api.medication.listMedications({
        page,
        limit,
      })

      setListMedications(result.data.list.rows)
      setPagination({ current: page, pageSize: limit, total: result.data.list.count })
    } catch (err) {
      message.error('Data could not be updated, please refresh the page!')
      setListMedications([])
    }
    setIsLoading(false)
  }

  const columns = useMemo(() => ([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      width: 60,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={async (event) => {
              event.stopPropagation()

              try {
                await api.medication.decrement(record.id)
                message.success('The drug was successfully update!')
                getListMedications({ limit: pagination.pageSize, page: pagination.current })
              } catch (e) {
                message.error('Couldn\'t update, try again')
              }
            }}
            shape="circle"
            icon={<MinusOutlined />}
          />
          <Button
            onClick={async (event) => {
              event.stopPropagation()

              try {
                await api.medication.increment(record.id)
                message.success('The drug was successfully update!')
                getListMedications({ limit: pagination.pageSize, page: pagination.current })
              } catch (e) {
                message.error('Couldn\'t update, try again')
              }
            }}
            shape="circle"
            icon={<PlusOutlined />}
          />
        </Space>
      ),
    },
    {
      title: '',
      key: 'delete',
      width: 20,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topLeft"
            title="Remove the drug?"
            onConfirm={async (event) => {
              event.stopPropagation()
              try {
                await api.medication.deleteDrug(record.id)
                message.success('The drug was successfully removed!')
                getListMedications({ limit: pagination.pageSize, page: pagination.current })
              } catch (e) {
                message.error('Couldn\'t delete, try again')
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              onClick={(event) => {
                event.stopPropagation()
              }}
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]), [pagination])

  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  }

  useEffect(() => {
    if (!isAddDrug) {
      getListMedications({ page: pagination.current, limit: pagination.pageSize })
    }
    // eslint-disable-next-line
  }, [isAddDrug, pagination.pageSize, pagination.current, isShowModalInformationMedication])

  return (
    <div className="listMedications__container">
      {isAddDrug && <ModalAddDrug onClose={() => setIsAddDrug(false)} />}
      {isShowModalInformationMedication && (
      <MemoModalInformationMedication
        onClose={() => {
          setIsShowModalInformationMedication(false)
          setInformationMedication({})
        }}
        name={informationMedication.name}
        description={informationMedication.description}
        destinationCount={informationMedication.destinationCount}
        id={informationMedication.id}
      />
      )}

      <Row>
        <Col span={12} offset={6}>
          <Button
            disabled={isLoading}
            onClick={() => setIsAddDrug(true)}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a drug
          </Button>

          <Table
            onRow={(record, rowIndex) => ({
              onClick: () => {
                setIsShowModalInformationMedication(true)
                setInformationMedication(record)
              },
            })}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={listMedications}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
    </div>
  )
}

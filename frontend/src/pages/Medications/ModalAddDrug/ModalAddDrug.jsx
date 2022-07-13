import React, { useCallback, useMemo, useState } from 'react'
import {
  Modal, Button, Input, InputNumber, Space, Typography, Result,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import api from '../../../api'

const { Text } = Typography

export const ModalAddDrug = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [destinationCountValue, setDestinationCountValue] = useState(1)
  const [objError, setObjectError] = useState({})

  const onSave = useCallback(async () => {
    const newObjError = {}

    if (!nameValue) {
      newObjError.name = true
    }
    if (destinationCountValue < 1) {
      newObjError.destination = true
    }

    setObjectError(newObjError)
    if (Object.keys(newObjError).length === 0) {
      setIsLoading(true)
      try {
        await api.medication.saveDrug({
          name: nameValue,
          description: descriptionValue,
          destinationCount: destinationCountValue,
        })

        setIsSuccess(true)
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }
  }, [descriptionValue, destinationCountValue, nameValue])

  const renderBody = useMemo(() => {
    if (isSuccess) {
      return (
        <Result
          status="success"
          title="Successfully save!"
          subTitle="You can close the window"
        />
      )
    }

    return (
      <Space direction="vertical">
        <div>
          <Text>Name</Text>

          <Input
            status={objError.name && 'error'}
            value={nameValue}
            onChange={(e) => {
              setObjectError({ ...objError, name: false })
              setNameValue(e.target.value)
            }}
            showCount
            maxLength={20}
          />

          {objError.name && <Text type="danger">Input name</Text>}
        </div>

        <div>
          <Text>Destination count</Text>
          <br />
          <InputNumber
            status={objError.destination && 'error'}
            value={destinationCountValue}
            onChange={(e) => {
              setObjectError({ ...objError, destination: false })
              setDestinationCountValue(e)
            }}
            min={1}
          />
          <br />
          {objError.destination && <Text type="danger">Min count 1</Text>}
        </div>

        <div>
          <Text>Description</Text>
          <TextArea
            status={objError.description && 'error'}
            value={descriptionValue}
            onChange={(e) => {
              setObjectError({ ...objError, description: false })
              setDescriptionValue(e.target.value)
            }}
            showCount
            maxLength={100}
          />
        </div>
      </Space>
    )
  }, [descriptionValue, destinationCountValue, isSuccess, nameValue, objError])

  const renderFooter = useMemo(() => {
    const footer = [
      <Button
        key="cancel"
        onClick={onClose}
      >
        Cancel
      </Button>,
    ]

    if (!isSuccess) {
      footer.push((
        <Button
          loading={isLoading}
          key="submit"
          type="primary"
          onClick={onSave}
        >
          Save
        </Button>
      ))
    }

    return footer
  }, [onClose, isSuccess, isLoading, onSave])

  return (
    <Modal
      visible
      title="Add a Drug"
      onCancel={onClose}
      footer={renderFooter}
    >
      {renderBody}
    </Modal>
  )
}

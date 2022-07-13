import React, {
  useCallback, useMemo, useState,
} from 'react'
import {
  Modal, Button, Input, InputNumber, Space, Typography, Result, message,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import * as PropTypes from 'prop-types'
import api from '../../../api'

const { Text } = Typography

export const ModalInformationMedication = ({
  name, description, destinationCount, onClose, id,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [newNameValue, setNameValue] = useState(name)
  const [newDescriptionValue, setDescriptionValue] = useState(description)
  const [newDestinationCountValue, setDestinationCountValue] = useState(destinationCount)
  const [objError, setObjectError] = useState({})
  const [isDisabledSave, setIsDisabledSave] = useState(true)

  const onSave = useCallback(async () => {
    const newObjError = {}

    if (!newNameValue) {
      newObjError.name = true
    }
    if (newDestinationCountValue < 1) {
      newObjError.destination = true
    }

    if (Object.keys(newObjError).length === 0) {
      setIsLoading(true)
      try {
        await api.medication.edit({
          name: newNameValue,
          description: newDescriptionValue,
          destinationCount: newDestinationCountValue,
          id,
        })

        setIsSuccess(true)
      } catch (err) {
        if (err.response.data.destinationCount) {
          newObjError.destination = true
        }
        if (err.response.data.name) {
          newObjError.name = true
        }
        message.error('Please, try again')
        console.error(err)
      }
      setIsLoading(false)
    }

    setObjectError(newObjError)
  }, [id, newDescriptionValue, newDestinationCountValue, newNameValue])

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
            value={newNameValue}
            onChange={(e) => {
              setIsDisabledSave(false)
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
            value={newDestinationCountValue}
            onChange={(e) => {
              setIsDisabledSave(false)
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
            value={newDescriptionValue}
            onChange={(e) => {
              setIsDisabledSave(false)
              setObjectError({ ...objError, description: false })
              setDescriptionValue(e.target.value)
            }}
            showCount
            maxLength={100}
          />
        </div>
      </Space>
    )
  }, [isSuccess, objError, newNameValue, newDestinationCountValue, newDescriptionValue])

  return (
    <Modal
      visible
      title="Information"
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button loading={isLoading} disabled={isDisabledSave} onClick={onSave} key="save" type="primary">
          Save
        </Button>,
      ]}
    >
      {renderBody}
    </Modal>
  )
}

ModalInformationMedication.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  destinationCount: PropTypes.number,
  onClose: PropTypes.func,
  id: PropTypes.number,
}

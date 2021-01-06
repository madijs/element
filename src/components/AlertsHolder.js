import React from "react"
import { Transition, Icon, List, Segment } from "semantic-ui-react"
import { useTranslation } from "react-i18next"

const alertStyles = {
  error: { icon: "warning sign", color: "red" },
  success: { icon: "checkmark", color: "green" },
  warning: { icon: "info", color: "orange" },
}

const AlertsHolder = (props) => {
  const { t } = useTranslation()
  const onClick = (other, { data }) => {
    const { onAlertClick } = props
    onAlertClick(data)
  }

  const { alerts, top } = props
  const topStyle = {}
  if (top) {
    topStyle.top = "0"
  }

  return (
    <Transition.Group
      as={List}
      duration={500}
      verticalAlign="middle"
      className="alerts-holder"
      style={topStyle}
    >
      {alerts.map((item) => {
        return (
          <List.Item
            className="alert"
            key={item.id}
            data={item.id}
            onClick={onClick}
          >
            <Segment inverted color={alertStyles[item.type].color}>
              <Icon name={alertStyles[item.type].icon} />
              {t(item.message)}
            </Segment>
          </List.Item>
        )
      })}
    </Transition.Group>
  )
}

export default AlertsHolder

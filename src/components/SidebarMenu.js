import React from "react"
import { Icon, Sidebar, Menu } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"

const SidebarMenu = (props) => {
  const history = useHistory()
  const onItemSelected = (other, { name, data }) => {
    const {
      location: { pathname },
      toggleSidebar,
    } = props
    let toggle = false

    if (name !== pathname) {
      if (name) {
        history.push(`/${name}`)
        toggle = true
      } else {
        toggle = true
      }
    }
    if (data) {
      data()
      toggle = true
    }
    if (toggle) {
      toggleSidebar()
    }
  }

  const { t } = useTranslation()
  const {
    location: { pathname },
    menuItems,
    visible,
  } = props

  return (
    <Sidebar as={Menu} animation="overlay" visible={visible} vertical inverted>
      {menuItems.map((item, i) => {
        if (item.route) {
          return (
            <Menu.Item
              key={i}
              onClick={onItemSelected}
              name={item.route.path}
              active={pathname === `/${item.route.path}`}
            >
              <span>{!!item.icon && <Icon name={item.icon} />}</span>
              {t(item.title)}
            </Menu.Item>
          )
        }
        return (
          <Menu.Item
            key={i}
            onClick={item.onSelect}
            active={false}
          >
            {!!item.icon && <Icon name={item.icon} />}
            {item.title}
          </Menu.Item>
        )
      })}
    </Sidebar>
  )
}

export default SidebarMenu

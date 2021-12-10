import React, { useEffect, useState } from "react"
import { Navbar,UncontrolledButtonDropdown,DropdownToggle,DropdownItem,DropdownMenu } from "reactstrap"
import { connect } from "react-redux"
import classnames from "classnames"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import {
  logoutWithJWT,
  logoutWithFirebase
} from "../../../redux/actions/auth/loginActions"
import oblastAction from '../../../redux/actions/others'
import NavbarBookmarks from "./NavbarBookmarks"
import NavbarUser from "./NavbarUser"
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import { ChevronDown } from 'react-feather'
import DashboardService from "../../../services/dashboard.service"
const UserName = props => {
  let username = ""
  if (props.userdata !== undefined) {
    username = props.userdata.name
  } else if (props.user.login.values !== undefined) {
    username = props.user.login.values.name
    if (
      props.user.login.values.loggedInWith !== undefined &&
      props.user.login.values.loggedInWith === "jwt"
    ) {
      username = props.user.login.values.loggedInUser.name
    }
  } else {
    username = "John Doe"
  }

  return username
}
const ThemeNavbar = props => {
  const { user } = useAuth0()
  const colorsArr = [ "primary", "danger", "success", "info", "warning", "dark"]
  const navbarTypes = ["floating" , "static" , "sticky" , "hidden"]
  const [oblastlist,setOblastlist] = useState([])
  const [oblastid,setOblastid] = useState('1')
  const setOblast = (item) => {
    setOblastid(item.id)
    console.log(props)
    oblastAction(item.id)
  }
  useEffect(() => {
    DashboardService.OblastList().then(res => {
      setOblastlist(res.data.data)
    })
    
    
  },[])
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light": props.navbarColor === "default" || !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) || (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            "scrolling": props.horizontal && props.scrolling

          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                {/* <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                /> */}
                <UncontrolledButtonDropdown style={{ cursor : 'pointer' }}>
                    <DropdownToggle
                        color="flat-primary"
                        caret
                    >
                        { oblastlist.length > 0 ? oblastlist.filter(item => item.id == oblastid)[0].fullname_latn : "" }
                        <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        oblastlist.length > 0 ?
                        oblastlist.map((item,index) => (
                          <DropdownItem active={item.id == oblastid} tag="a" onClick={() => { setOblast(item) }}> { item.fullname_latn } </DropdownItem>
                        ))
                        : <DropdownItem tag="span"> Not found </DropdownItem>
                      }
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">Vuexy</h2>
                </div>
              ) : null}
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={<UserName userdata={user} {...props} />}
                userImg={
                  props.user.login.values !== undefined &&
                  props.user.login.values.loggedInWith !== "jwt" &&
                  props.user.login.values.photoUrl
                    ? props.user.login.values.photoUrl 
                    : user !== undefined && user.picture ? user.picture
                    : userImg
                }
                loggedInWith={
                  props.user !== undefined &&
                  props.user.login.values !== undefined
                    ? props.user.login.values.loggedInWith
                    : null
                }
                logoutWithJWT={props.logoutWithJWT}
                logoutWithFirebase={props.logoutWithFirebase}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    oblastid : '1'
  }
}
const mapDispatchToProps = dispatch => ({
  oblastAction: (payload) => dispatch(oblastAction(payload))
});
export default connect(mapStateToProps, {
  logoutWithJWT,
  logoutWithFirebase,
  useAuth0,
  mapDispatchToProps
})(ThemeNavbar)

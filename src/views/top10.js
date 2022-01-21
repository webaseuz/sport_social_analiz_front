import React from 'react'
import { Row,Col,Modal,Card,CardBody,Table,Badge,Button,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import { ChevronDown,Filter,Printer } from 'react-feather'
import SpecService from '../services/spesservice.service'
import { toast } from "react-toastify"
import {
    Translate,
    Permission,
    Numbers
  } from "../components/Webase/functions/index.js";
import { injectIntl } from "react-intl";
import Top10Service from '../services/top10.service'
const { t2 } = Translate
class  Top10 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter : {
                fromDate : '',
                toDate : ""
            },
            RateModal : "",
            RateList : [],
            selectedRate : '',
            top10List : []
        }
    }
    componentDidMount(){
        this.Refresh()
        SpecService.levelName().then(res => {
            this.setState({ RateList : res.data })
        })
    }
    Refresh = () => {
        var { filter } = this.state
        
        Top10Service.top10().then(res => {
            this.setState({ top10List : res.data.top10 })
        })
    }
    Rate = (item) => {
        const { selectedRate,RateList,RateModal } = this.state
        SpecService.LevelOrganizationViews(selectedRate,item.organization_id).then(res => {
            toast.success("Успешно !!")
            this.setState({ RateModal : false })
        })
    }
    render(){
        const { RateModal,selectedRate,RateList,top10List } = this.state
        const { intl } = this.props
        return(
            <div>
                <Card>
                    <CardBody>
                        {/* <Row>
                            <Col>
                                <UncontrolledButtonDropdown style={{ cursor : 'pointer' }}>
                                    <DropdownToggle
                                        color="flat-primary"
                                        caret
                                    >
                                        Primary
                                        <ChevronDown size={15} />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag="a">Option 1</DropdownItem>
                                        <DropdownItem tag="a">Option 2</DropdownItem>
                                        <DropdownItem tag="a">Option 3</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <Filter  style={{ cursor : 'pointer'}} className="mr-1 text-primary" size={20} />
                                
                                
                                <Printer style={{ cursor : 'pointer'}} className="text-primary" size={20} />
                            </Col>
                        </Row> */}
                        <Row className="mt-3">
                            <Col>
                                <Table striped responsive borderless>
                                    <thead>
                                        <tr>
                                            {/* <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> № </th> */}
                                            <th style={{ verticalAlign:'middle' }}  rowSpan="2" className="bg-primary text-white"> SpesService </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Web-sayt </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Telegram </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Facebook </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Instagram </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Youtube </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Twitter </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Tiktok </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Teletype </th>
                                            {/* <th colSpan="2" className="text-center bg-primary text-white"> Others </th> */}
                                            <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> Rate </th>
                                            <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> Actions </th>
                                        </tr>
                                        <tr className="bg-primary text-white">
                                            <th className="bg-primary text-white"> Post </th>
                                            <th> comments </th>
                                            <th> Post </th>
                                            <th> Prosmotr </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Prosmotr </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Prosmotr </th>
                                            <th> Post </th>
                                            <th> Prosmotr </th>
                                            {/* <th> Post </th>
                                            <th> Prosmotr </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            top10List?.map((item,index) => (
                                                <tr key={index}>
                                                    {/* <th>1</th> */}
                                                    <th> { item.name } </th>
                                                    <th>{ item.web_site_posts }</th>
                                                    <th>{ item.web_site_comments }</th>
                                                    <th>{ item.telegram_posts }</th>
                                                    <th>{ item.telegram_views }</th>
                                                    <th>{ item.facebook_posts }</th>
                                                    <th>{ item.facebook_like }</th>
                                                    <th>{ item.instagram_posts }</th>
                                                    <th>{ item.instagram_like }</th>
                                                    <th>{ item.youtobe_posts }</th>
                                                    <th>{ item.youtobe_views }</th>
                                                    <th>{ item.twitter_posts }</th>
                                                    <th>{ item.twitter_like }</th>
                                                    <th>{ item.tik_tok_posts }</th>
                                                    <th>{ item.tik_tok_views }</th>
                                                    <th>{ item.teletype_posts }</th>
                                                    <th>{ item.teletype_views }</th>
                                                    {/* <th>{ item.name }</th>
                                                    <th>{ item.name }</th> */}
                                                    <th><Badge color="light-primary"> { item.rate } </Badge></th>
                                                    <th> <Button size='sm' onClick={() => this.setState({ RateModal : "RateModal" + item.organization_id })} color="primary"> Оценить </Button> </th>
                                                    <Modal isOpen={RateModal == "RateModal" + item.organization_id}>
                                                        <ModalHeader toggle={() => this.setState({ RateModal : "RateModal" })}>
                                                        {t2("Rate", intl)}
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <Row>
                                                                {
                                                                    RateList.map((item,index) => (
                                                                        <Col sm="12" md="4" key={index}>
                                                                            <Button.Ripple block outline={selectedRate != item.id} color={item.id == 1 ? 'success' : item.id == 2 ? 'warning' : 'danger'} onClick={() => this.setState({ selectedRate : item.id })} className="roundedcursor-pointer w-100"> { item.name_cryl } </Button.Ripple>
                                                                        </Col>
                                                                    ))
                                                                }
                                                                
                                                                {/* <Col sm="12" md="4">
                                                                    <Button.Ripple block outline={selectedRate != 2} color="warning" onClick={() => this.setState({ selectedRate : 2 })} className="rounded cursor-pointer w-100"> нормально </Button.Ripple>
                                                                </Col>
                                                                <Col sm="12" md="4">
                                                                    <Button.Ripple block outline={selectedRate != 3} color="success" onClick={() => this.setState({ selectedRate : 3 })} className="rounded cursor-pointer w-100"> отличьно </Button.Ripple>
                                                                </Col> */}
                                                            </Row>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                        <Button
                                                            color="danger"
                                                            onClick={() => this.setState({ RateModal : "RateModal" })}
                                                        >
                                                            {t2("no", intl)}
                                                        </Button>{" "}
                                                        <Button color="success" onClick={() => this.Rate(item)}>
                                                            {t2("yes", intl)}
                                                        </Button>{" "}
                                                        </ModalFooter>
                                                    </Modal>
                                                </tr>
                                                
                                            ))
                                        }
                                        
                                        
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                    {/* <Sidebar
                        style={{ zIndex : 1 }}
                        sidebar={<b>Sidebar content</b>}
                        open={openSidebar}
                        pullRight
                        onSetOpen={(open) => setOpenSidebar(open)}
                        styles={{ sidebar: { background: "white" } }}
                    >
                    </Sidebar> */}
                </Card>
                
                
            </div>
        )
    }
    
    
}
export default injectIntl(Top10)
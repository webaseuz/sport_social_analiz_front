import React from 'react'
import { Row,Col,Modal,Card,CardBody,Table,Badge,Button,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import { ChevronDown,Filter,Printer } from 'react-feather'
import SpecService from '../services/spesservice.service'
import { toast } from "react-toastify"
import Overlay from '../components/Webase/components/Overlay'
import {
    Translate,
    Permission,
    Numbers
  } from "../components/Webase/functions/index.js";
import { injectIntl } from "react-intl";
const { t1,t2 } = Translate
class  SpesService extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            serviceList : [],
            filter : {
                fromDate : '',
                toDate : ""
            },
            RateModal : "",
            RateList : [],
            selectedRate : '',
            loading : false
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
        this.setState({ loading : true })
        SpecService.AllOrganizationStatsData(filter.fromDate,filter.toDate).then(res => {
            this.setState({ serviceList : res.data.data,loading : false })
        })
    }
    Rate = (item) => {
        const { selectedRate,RateList,RateModal } = this.state
        SpecService.LevelOrganizationViews({ level : selectedRate,organization : item.organization_id }).then(res => {
            toast.success("Успешно !!")
            this.setState({ RateModal : false })
            this.Refresh()
        })
        
    }
    render(){
        const { serviceList,RateModal,selectedRate,RateList,loading } = this.state
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
                                <Overlay show={loading}>
                                    <Table striped responsive borderless>
                                        <thead>
                                            <tr>
                                                {/* <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> № </th> */}
                                                <th style={{ verticalAlign:'middle' }}  rowSpan="2" className="bg-primary text-white"> { t1('SpecService') } </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Web-sayt </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Telegram </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Facebook </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Instagram </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Youtube </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Twitter </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Tiktok </th>
                                                <th colSpan="2" className="text-center bg-primary text-white"> Teletype </th>
                                                {/* <th colSpan="2" className="text-center bg-primary text-white"> Others </th> */}
                                                <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> { t1('Rate') } </th>
                                                <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> Действия </th>
                                            </tr>
                                            <tr className="bg-primary text-white">
                                                <th className="bg-primary text-white"> Пост </th>
                                                <th> Комментария </th>
                                                <th> Пост </th>
                                                <th> Просмотр </th>
                                                <th> Пост </th>
                                                <th> Лайк </th>
                                                <th> Пост </th>
                                                <th> Лайк </th>
                                                <th> Пост </th>
                                                <th> Просмотр </th>
                                                <th> Пост </th>
                                                <th> Лайк </th>
                                                <th> Пост </th>
                                                <th> Просмотр </th>
                                                <th> Пост </th>
                                                <th> Просмотр </th>
                                                {/* <th> Post </th>
                                                <th> Prosmotr </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                serviceList?.map((item,index) => (
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
                                                        <th><Badge color={item.rate == 'нормально' ? "light-warning" : item.rate == 'отлично' ? "light-success" : "light-danger"}> { item.rate } </Badge></th>
                                                        <th> <Button size='sm' onClick={() => this.setState({ RateModal : "RateModal" + item.organization_id,selectedRate : '' })} color="primary"> Оценить </Button> </th>
                                                        <Modal isOpen={RateModal == "RateModal" + item.organization_id}>
                                                            <ModalHeader toggle={() => this.setState({ RateModal : "RateModal" })}>
                                                            {t2("Rate", intl)}
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <Row>
                                                                    {
                                                                        RateList.map((item,index) => (
                                                                            <Col sm="12" md="4" key={index}>
                                                                                <Button.Ripple block outline={selectedRate != item.id} color={item.id == 1 ? 'success' : item.id == 3 ? 'warning' : 'danger'} onClick={() => this.setState({ selectedRate : item.id })} className="roundedcursor-pointer w-100"> { item.name_ru } </Button.Ripple>
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
                                </Overlay>
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
export default injectIntl(SpesService)
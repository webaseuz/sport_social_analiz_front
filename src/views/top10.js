import React from 'react'
import { Row,Col,Modal,Card,CardBody,Table,Badge,Button,ModalHeader,ModalBody,ModalFooter,ButtonGroup } from 'reactstrap'
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
import Overlay from '../components/Webase/components/Overlay'
const { t2 } = Translate
class  Top10 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter : {
                fromDate : '',
                toDate : "",
                date : 'week',
                organ : 1
            },
            RateModal : "",
            RateList : [],
            selectedRate : '',
            top10List : [],
            top10Col : [],
            top10Cel : [],
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
        Top10Service.top10(filter.organ,filter.date).then(res => {
            this.setState({ top10List : res.data.data,top10Col : res.data.cols,top10Cel : res.data.cells,loading : false })
        })
    }
    ChangeTime = (type) => {
        var { filter } = this.state
        filter.date = type
        this.setState({ filter : filter })
        this.Refresh()
    }
    render(){
        const { RateModal,selectedRate,RateList,top10List,top10Col,top10Cel,loading,filter } = this.state
        const { intl } = this.props
        return(
            <div>
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                {/* <UncontrolledButtonDropdown style={{ cursor : 'pointer' }}>
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
                                </UncontrolledButtonDropdown> */}
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                {/* <Filter  style={{ cursor : 'pointer'}} className="mr-1 text-primary" size={20} />
                                
                                
                                <Printer style={{ cursor : 'pointer'}} className="text-primary" size={20} /> */}
                                <ButtonGroup >
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('day')} outline={filter.date != 'day'} color="primary"> День </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('week')} outline={filter.date != 'week'} color="primary"> Неделя </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('month')} outline={filter.date != 'month'} color="primary"> Месяц </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('year')} outline={filter.date != 'year'} color="primary"> Год </Button.Ripple>{" "}
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Overlay show={loading}>
                                <Table striped responsive borderless>
                                    <thead className='text-center'>
                                        <tr>
                                            {/* <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> № </th> */}
                                            <th style={{ verticalAlign:'middle' }}  rowSpan="2" className="bg-primary text-white"> Дата </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Web-sayt </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Telegram </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Facebook </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Instagram </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Youtube </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Twitter </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Tiktok </th>
                                            <th colSpan="2" className="text-center bg-primary text-white"> Teletype </th>
                                        </tr>
                                        <tr className="bg-primary text-white">
                                            <th className="bg-primary text-white"> Post </th>
                                            <th> Просмотр </th>
                                            <th> Post </th>
                                            <th> Просмотр </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Просмотр </th>
                                            <th> Post </th>
                                            <th> Likes </th>
                                            <th> Post </th>
                                            <th> Просмотр </th>
                                            <th> Post </th>
                                            <th> Просмотр </th>
                                            {/* <th> Post </th>
                                            <th> Prosmotr </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {
                                            top10List?.map((item,index) => (
                                                <tr key={index}>
                                                    <th> { item.date } </th>
                                                    <th>{ item.web_site_url }</th>
                                                    <th>{ item.web_site_views }</th>
                                                    <th>{ item.telegram_url_url }</th>
                                                    <th>{ item.telegram_url_views }</th>
                                                    <th > <a href={item.fb_page_url} target='_blank'> { item.fb_page_url } </a> </th>
                                                    <th>{ item.fb_page_reactions }</th>
                                                    <th>{ item.instagram_new_url }</th>
                                                    <th>{ item.instagram_new_views }</th>
                                                    <th > <a href={item.youtobe_url} target='_blank'> { item.youtobe_url } </a> </th>
                                                    <th>{ item.youtobe_views }</th>
                                                    <th>{ item.twitter_url }</th>
                                                    <th>{ item.twitter_views }</th>
                                                    <th>{ item.tiktok_url }</th>
                                                    <th>{ item.tiktok_views }</th>
                                                    <th>{ item.teletype_url }</th>
                                                    <th>{ item.teletype_views }</th>
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
export default injectIntl(Top10)
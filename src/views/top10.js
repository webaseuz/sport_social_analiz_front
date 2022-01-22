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
            top10List : [],
            top10Col : [],
            top10Cel : []
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
            this.setState({ top10List : res.data.data,top10Col : res.data.cols,top10Cel : res.data.cells })
        })
    }
    render(){
        const { RateModal,selectedRate,RateList,top10List,top10Col,top10Cel } = this.state
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
                                            <th> comments </th>
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
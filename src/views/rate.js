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
import RateService from '../services/rate.service'
const { t2 } = Translate
class  Rate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter : {
                fromDate : '',
                toDate : ""
            },
            RateList : [],
            RateColList : [],
            RateCellList : [],
            RateMiddle : []
        }
    }
    componentDidMount(){
        this.Refresh()
    }
    Refresh = () => {
        var { filter } = this.state
        
        RateService.levelOrg('day').then(res => {
            this.setState({ RateList : res.data.rows,RateColList : res.data.cols,RateCellList : res.data.cells,RateMiddle : res.data.middle })
        })
    }
    render(){
        const { RateList,RateColList,RateCellList,RateMiddle } = this.state
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
                                            {   
                                                RateColList?.map((item,index) => (
                                                    <th key={index + 'col1'} className="text-center bg-primary text-white"> { item.name } </th>
                                                ))
                                            }
                                            
                                            <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> O'rtacha </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            RateList?.map((item,index) => (
                                                <tr key={index + 'rows'}>
                                                    {/* <th>1</th> */}
                                                    <th> { item.name } </th>
                                                    {   
                                                        RateColList?.map((el,i) => (
                                                            <th key={i + 'col2'} className="text-center"> <Badge color="light-primary"> { RateCellList[item.id][el.id] || '-' } </Badge>  </th>
                                                        ))
                                                    }
                                                    <th> <Badge color="light-primary"> { RateMiddle[item.id] || '-'} </Badge>  </th>
                                                </tr>
                                                
                                            ))
                                        }
                                        
                                        
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                
                
            </div>
        )
    }
    
    
}
export default injectIntl(Rate)
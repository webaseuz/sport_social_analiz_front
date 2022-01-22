import React from 'react'
import { Row,Col,Modal,Card,CardBody,Table,Badge,Button,ModalHeader,ModalBody,ModalFooter,ButtonGroup } from 'reactstrap'
import { ChevronDown,Filter,Printer } from 'react-feather'
import SpecService from '../services/spesservice.service'
import { toast } from "react-toastify"
import { Doughnut } from "react-chartjs-2"
import {
    Translate,
    Permission,
    Numbers
  } from "../components/Webase/functions/index.js";
import { injectIntl } from "react-intl";
import RateService from '../services/rate.service'
import Overlay from '../components/Webase/components/Overlay'
import SpesService from '../services/spesservice.service'
const { t1,t2 } = Translate

class  Rate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter : {
                fromDate : '',
                toDate : "",
                timetype : 'week'
            },
            RateList : [],
            RateColList : [],
            RateCellList : [],
            RateMiddle : [],
            loading : false,
            data : {
                labels: [],
                datasets: [
                  {
                    label: "My First dataset",
                    data: [],
                    backgroundColor: ['red','yellow','green']
                  }
                ]
            },
            options : {
                maintainAspectRatio: false,
                responsive: true,
                responsiveAnimationDuration: 500,
                title: {
                    display: true,
                    text: "Статистика"
                }
            },
            LevelList : []
        }
    }
    componentDidMount(){
        this.Refresh()
        SpesService.levelName().then(res => {
            this.setState({ LevelList : res.data })
            const { data,LevelList } = this.state
            data.labels = LevelList.map(item => item.name_ru)
            data.datasets[0].data = [0,1,5]
        })
    }
    Refresh = () => {
        var { filter } = this.state
        this.setState({ loading : true })
        RateService.levelOrg(filter.timetype).then(res => {
            this.setState({ RateList : res.data.rows,RateColList : res.data.cols,RateCellList : res.data.cells,RateMiddle : res.data.middle,loading : false })
        })
    }
    ChangeTime = (type) => {
        var { filter } = this.state
        filter.timetype = type
        this.setState({ filter : filter })
        this.Refresh()
    }
    render(){
        const { RateList,RateColList,RateCellList,RateMiddle,filter,loading,data,options } = this.state
        const { intl } = this.props
        return(
            <div>
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                
                            </Col>
                            <Col className="d-flex align-items-center justify-content-end">
                                <ButtonGroup >
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('day')} outline={filter.timetype != 'day'} color="primary"> День </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('week')} outline={filter.timetype != 'week'} color="primary"> Неделя </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('month')} outline={filter.timetype != 'month'} color="primary"> Месяц </Button.Ripple>{" "}
                                    <Button.Ripple size='sm' onClick={() => this.ChangeTime('year')} outline={filter.timetype != 'year'} color="primary"> Год </Button.Ripple>{" "}
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Overlay show={loading}>
                                    <Table striped responsive borderless>
                                        <thead>
                                            <tr>
                                                {/* <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> № </th> */}
                                                <th style={{ verticalAlign:'middle' }}  rowSpan="2" className="bg-primary text-white"> { t1('SpecService') } </th>
                                                {   
                                                    RateColList?.map((item,index) => (
                                                        <th key={index + 'col1'} className="text-center bg-primary text-white"> { item.name } </th>
                                                    ))
                                                }
                                                
                                                <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> За неделю (средный) </th>
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
                                </Overlay>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={4}>
                                <Doughnut data={data} options={options} height={300} />
                            </Col>
                            <Col sm={12} md={6}>
                                
                            </Col>
                            <Col sm={12} md={2}>
                                
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                
                
            </div>
        )
    }
    
    
}
export default injectIntl(Rate)
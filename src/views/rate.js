import React from 'react'
import { Row,Col,Modal,Card,CardBody,Table,Badge,Button,ModalHeader,ModalBody,ModalFooter,ButtonGroup,ListGroup,ListGroupItem } from 'reactstrap'
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
                    backgroundColor: ['green','red','yellow']
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
            LevelList : [],
            MiddleCountList : []
        }
    }
    componentDidMount(){
        this.Refresh()
        SpesService.levelName().then(res => {
            this.setState({ LevelList : res.data })
            const { data,LevelList,MiddleCountList } = this.state
            data.labels = LevelList.map(item => item.name_ru)
            
            console.log(data,MiddleCountList)
        })
        
    }
    Refresh = () => {
        var { filter,MiddleCountList,data } = this.state
        this.setState({ loading : true })
        RateService.levelOrg(filter.timetype).then(res => {
            data.datasets[0].data = [
                res.data.middle_count.filter(el => el.name == 'отлично')[0]?.rows.length || 0,
                res.data.middle_count.filter(el => el.name == 'плохо')[0]?.rows.length || 0,
                res.data.middle_count.filter(el => el.name == 'нормально')[0]?.rows.length || 0
            ]
            this.setState({ 
                RateList : res.data.rows,
                RateColList : res.data.cols,
                RateCellList : res.data.cells,
                RateMiddle : res.data.middle,
                MiddleCountList : res.data.middle_count,
                loading : false 
            })
        })
        console.log(MiddleCountList)
    }
    ChangeTime = (type) => {
        var { filter } = this.state
        filter.timetype = type
        this.setState({ filter : filter })
        this.Refresh()
    }
    render(){
        const { RateList,RateColList,RateCellList,RateMiddle,filter,loading,data,options,LevelList,MiddleCountList } = this.state
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
                                                                <th key={i + 'col2'} className="text-center"> 
                                                                    <Badge color={RateCellList[item.id][el.id] == 'отлично' ? "light-success" : RateCellList[item.id][el.id] == 'нормально' ? 'light-warning' : 'light-danger'}> { RateCellList[item.id][el.id] || '-' } </Badge>  
                                                                </th>
                                                            ))
                                                        }
                                                        <th> <Badge color={RateMiddle[item.id] == 'отлично' ? "light-success" : RateMiddle[item.id] == 'нормально' ? 'light-warning' : 'light-danger'}> { RateMiddle[item.id] || '-'} </Badge>  </th>
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
                            <Col sm={12} md={8}>
                                <Row>
                                    {
                                        LevelList.map((item,index) => (
                                            <Col sm={12} md={6} lg={3} className='mt-2 text-center' key={'col' + index}>
                                                <Badge size="lg" color={item.name_ru == 'отличьно' ? "light-success" : item.name_ru == 'нормально' ? 'light-warning' : 'light-danger'} > { item.name_ru } </Badge>
                                                <ListGroup className='mt-2'>
                                                    {
                                                        MiddleCountList.filter(i => i.name == item.name_ru)[0]?.rows.map((element,ele) => (
                                                            <ListGroupItem key={'ListGroupItem' + ele}> { element } </ListGroupItem>
                                                        ))
                                                    }
                                                </ListGroup>
                                            </Col>
                                        ))
                                    }
                                    
                                </Row>
                            </Col>
                            {/* <Col sm={12} md={2}>
                                
                            </Col> */}
                        </Row>
                    </CardBody>
                </Card>
                
                
            </div>
        )
    }
    
    
}
export default injectIntl(Rate)
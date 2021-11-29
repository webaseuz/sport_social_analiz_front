import React from 'react'
import { Row,Col,Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import StatisticsCard from "../components/@vuexy/statisticsCard/StatisticsCard"
import UzbMap from './uzbMap'
import { 
    Eye,
    MessageSquare,
    Heart,
    Smile,
    Edit,
    Repeat
} from 'react-feather'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts"

const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
]
const spesService = () => {
    return(
        <div>
            <Row>
                <Col xl="4" lg="6" sm="12">
                    <Card>
                        <CardBody>
                            <p style={{ cursor : 'pointer' }}> 1. Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1. Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1. Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }} className="mb-0 font-weight-bolder"> 1. Madaniy meros agentligi </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" lg="6" sm="12">
                    <Card>
                        <CardBody>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }} className="mb-0"> 1.Madaniy meros agentligi </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" lg="6" sm="12">
                    <Card>
                        <CardBody>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }}> 1.Madaniy meros agentligi </p>
                            <p style={{ cursor : 'pointer' }} className="mb-0"> 1.Madaniy meros agentligi </p>
                        </CardBody> 
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Edit className="warning" size={22} />}
                        stat="2"
                        statTitle="Posts"
                    />
                </Col>
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="primary"
                        icon={<Eye className="primary" size={22} />}
                        stat="36.9k"
                        statTitle="Views"
                    />
                </Col>
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="danger"
                        icon={<Heart className="danger" size={22} />}
                        stat="26.7k"
                        statTitle="Favourited"
                    />
                </Col>
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Repeat className="warning" size={22} />}
                        stat="978"
                        statTitle="Repost"
                    />
                </Col>
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<MessageSquare className="success" size={22} />}
                        stat="12k"
                        statTitle="Comments"
                    />
                </Col>
               
                
                <Col xl="2" lg="4" sm="6">
                    <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Smile className="success" size={22} />}
                        stat="689"
                        statTitle="Followers"
                    />
                </Col>

                
            </Row>
            <Row>
                <Col lg="6" xl="6" sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Line Chart</CardTitle>
                        </CardHeader>
                        <CardBody style={{ width : '100%',height : '300px !important' }}>
                            <div className="recharts-wrapper" style={{ height : '300px' }}>
                                <ResponsiveContainer >
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="pv"
                                            stroke="#7367F0"
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="uv"
                                            stroke="#28C76F"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" xl="6" sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Line Chart</CardTitle>
                        </CardHeader>
                        <CardBody style={{ width : '100%',height : '300px !important' }}>
                            <UzbMap height={300} style={{ width:100,height:300 }} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}
export default spesService
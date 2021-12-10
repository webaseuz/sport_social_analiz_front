import React from 'react'
import { Card,Row,Col,UncontrolledTooltip,CardHeader, CardTitle, CardBody } from 'reactstrap'
import StatisticsCard from "../components/@vuexy/statisticsCard/StatisticsCard"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import UzbMap from './uzbMap'
import Overlay from '../components/Webase/components/Overlay';
import NumbertoThousand from '../components/Webase/functions/Numbers';
import { 
    Eye,
    MessageSquare,
    Heart,
    Smile,
    Edit,
    Repeat,
    Globe,
    Navigation,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    Users
} from 'react-feather'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,PieChart, Pie,Cell
} from "recharts"
import DashboardService from '../services/dashboard.service';
import { toast } from "react-toastify"

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
const subscribersGained = {
    chart: {
      id: "subscribers",
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      show: false
    },
    colors: ["#7367F0"],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2.5
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },
  
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
}
const data1 = [
    { name: "Group A", value: 500 },
    { name: "Group B", value: 100 },
]
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
const subscribersGainedSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 52, 38, 60, 55]
    }
]
class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            basicPicker : new Date(),
            posts : {},
            loading : false
        }
    }
    componentDidMount(){
        this.Refresh()
        console.log(this.props)
    }
    Refresh = () => {
        this.setState({ loading : true })
        DashboardService.Posts().then(res => {
            this.setState({ posts : res.data })
            this.setState({ loading : false })
        }).catch(error => {
            toast.error(error.response.data.error)
            this.setState({ loading : false })
        })
    }
    render(){
        const { basicPicker,posts,loading } = this.state
        const { parseNumber } = NumbertoThousand
        return(
                <Overlay show={loading}>
                    <Card>
                    <Row>
                        <Col className="py-3 px-3">
                            <span onClick={() => this.Refresh()} className="p-2 bg-gradient-success text-white rounded mr-2 cursor-pointer" id="Globe"> <Globe  size={22} /> </span>
                            <span className="p-2 bg-gradient-info text-white rounded mr-2 cursor-pointer"> <Navigation size={22} /> </span>
                            <span className="p-2 bg-gradient-primary text-white rounded mr-2 cursor-pointer"> <Facebook size={22} /> </span>
                            <span className="p-2 bg-gradient-danger text-white rounded mr-2 cursor-pointer"> <Instagram size={22} /> </span>
                            <span className="p-2 bg-gradient-danger text-white rounded mr-2 cursor-pointer"> <Youtube size={22} /> </span>
                            <span className="p-2 bg-gradient-info text-white rounded mr-2 cursor-pointer"> <Twitter size={22} /> </span>
                            <span className="p-2 bg-gradient-dark text-white rounded mr-2 cursor-pointer"> <Twitter size={22} /> </span>
                            <span className="p-2 bg-gradient-dark text-white rounded cursor-pointer"> <Twitter size={22} /> </span> 
                            <UncontrolledTooltip
                                placement="top"
                                target="Globe"
                            >
                                Hello World !
                            </UncontrolledTooltip>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <Flatpickr
                                className="form-control w-25 mr-2"
                                options={{  mode: "range"  }}
                                value={basicPicker}
                                onChange={date => {
                                    this.setState({ basicPicker : date })
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="warning"
                            icon={<Edit className="warning" size={22} />}
                            stat={parseNumber(posts.posts,0)}
                            statTitle="Posts"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="primary"
                            icon={<Eye className="primary" size={22} />}
                            stat={parseNumber(posts.views)}
                            statTitle="Views"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="danger"
                            icon={<Heart className="danger" size={22} />}
                            stat={parseNumber(posts.likes)}
                            statTitle="Favourited"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="warning"
                            icon={<Repeat className="warning" size={22} />}
                            stat={parseNumber(posts.reposts)}
                            statTitle="Repost"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="success"
                            icon={<MessageSquare className="success" size={22} />}
                            stat={parseNumber(posts.comments)}
                            statTitle="Comments"
                        />
                    </Col>
                
                    
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                            hideChart
                            iconBg="success"
                            icon={<Smile className="success" size={22} />}
                            stat={parseNumber(posts.fallowers)}
                            statTitle="Followers"
                        />
                    </Col>

                    
                </Row>
                <Row>
                    <Col sm="12" md="4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Line Chart</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <UzbMap height={300} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="8">
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
                </Row>
                <Row>
                    <Col sm="12" md="6" lg="3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Line Chart</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="recharts-wrapper" style={{ width:'100%',height : '200px' }}>
                                    <ResponsiveContainer>
                                        <PieChart  height={100}>
                                            <Pie
                                            data={data1}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={100}
                                            fill="#28C76F"
                                            dataKey="value"
                                            >
                                                <Cell
                                                    fill="#28C76F"
                                                />
                                                <Cell
                                                    fill="#ea5455"
                                                />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                        <Card className="pt-1" style={{ paddingBottom : '9px' }}>
                            <StatisticsCard
                                icon={<Users className="primary" size={22} />}
                                stat="92.6k"
                                statTitle="Subscribers Gained"
                                options={subscribersGained}
                                series={subscribersGainedSeries}
                                type="area"
                            />
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Line Chart</CardTitle>
                            </CardHeader>
                            <CardBody>
                                3
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Line Chart</CardTitle>
                            </CardHeader>
                            <CardBody>
                                4
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </Overlay>
        )
    }
}
export default Dashboard
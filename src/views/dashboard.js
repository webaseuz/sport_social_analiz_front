import React from 'react'
import { Card,Row,Col,UncontrolledTooltip,CardHeader, CardTitle, CardBody, Button } from 'reactstrap'
import StatisticsCard from "../components/@vuexy/statisticsCard/StatisticsCard"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import UzbMap from './uzbMap'
import Overlay from '../components/Webase/components/Overlay';
import { connect } from "react-redux"
import { UzbekLatin } from "flatpickr/dist/l10n/uz_latn";
import { Russian } from "flatpickr/dist/l10n/ru";
import { Uzbek } from "flatpickr/dist/l10n/uz";
import moment from "moment";
import {
    Translate,
    Permission,
    Numbers
  } from "../components/Webase/functions/index.js";
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
    Users,
    Grid
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
import { injectIntl } from "react-intl";
const { parseNumber } = Numbers
const { t2 } = Translate

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
            posts : {},
            loading : false,
            filter : {
                sotsialset : '',
                from_date : '2021-12-13',
                to_date : '2021-12-30',
            },
            data : [
                {
                  date: "Page A",
                  views: 4000,
                  pv: 2400,
                  amt: 2400
                },
                {
                  date: "Page B",
                  views: 3000,
                  pv: 1398,
                  amt: 2210
                },
                {
                  date: "Page C",
                  views: 2000,
                  pv: 9800,
                  amt: 2290
                },
                {
                  date: "Page D",
                  views: 2780,
                  pv: 3908,
                  amt: 2000
                },
                {
                  date: "Page E",
                  views: 1890,
                  pv: 4800,
                  amt: 2181
                },
                {
                  date: "Page F",
                  views: 2390,
                  pv: 3800,
                  amt: 2500
                },
                {
                  date: "Page G",
                  views: 3490,
                  pv: 4300,
                  amt: 2100
                }
            ],
            FollowersList : [],
            CommentList : [],
            Likes : [],
            data1 : [
                { name: "Group A", value: 500 },
                { name: "Group B", value: 100 },
            ]
        }
    }
    componentDidMount(){
        this.Refresh(this.props.oblastid)
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.oblastid != this.props.oblastid){
            this.Refresh(nextProps.oblastid)
        }
    }
    Refresh = (id) => {
        const { filter } = this.state
        this.setState({ loading : true })
        DashboardService.Posts(id,filter.sotsialset,filter.from_date,filter.to_date || '').then(res => {
            this.setState({ posts : res.data })
            this.setState({ loading : false })
        }).catch(error => {
            toast.error(error.response.data.error)
            this.setState({ loading : false })
        })
        this.setState({ loading : true })
        DashboardService.StaticListData(id,filter.sotsialset,filter.from_date,filter.to_date || '').then(res => {
            
            var commentlist = [
                {
                    name : 'Comments',
                    data : res.data.data.map(item => item.comments)
                }
            ]
            var followers = [
                {
                    name : 'Followers',
                    data : res.data.data.map(item => item.fallowers)
                }
            ]
            var likes = [
                {
                    name : 'Likes',
                    data : res.data.data.map(item => item.likes)
                }
            ]
            this.setState({ data : res.data.data,FollowersList : followers,CommentList : commentlist,Likes : likes })
            this.setState({ loading : false })
        }).catch(error => {
            toast.error(error.response.data.error)
            this.setState({ loading : false })
        })
    }
    NewPost = () => {
        const { filter } = this.state
        this.setState({ loading : true })
        DashboardService.StaticOrganPostData(filter.sotsialset,filter.from_date,filter.to_date || '').then(res => {
            var data1 = [
                { name : 'Posted',value : res.data.posted },
                { name : 'Noposted',value : res.data.noposted }
            ]
            this.setState({ data1 : data1 })
        }).catch(error => {
            toast.error(error.response.data.error)
            this.setState({ loading : false })
        })
    }
    SocialRefresh = (param) => {
        const { filter } = this.state
        filter.sotsialset = param
        this.setState({ filter : filter },() => {
            this.Refresh(this.props.oblastid)
            this.NewPost()
        })
    }
    ChangeDate = (date) => {
        var { filter } = this.state
        filter.from_date = moment(date[0]).format("YYYY-MM-DD")
        filter.to_date = moment(new Date(date[1])).format("YYYY-MM-DD")
        this.setState({ filter : filter },() => this.Refresh(this.props.oblastid))
    }
    render(){
        const { posts,loading,filter,data,CommentList,FollowersList,Likes,data1 } = this.state
        const { intl } = this.props
        return(
                <Overlay show={loading}>
                    <Card>
                    <Row>
                        <Col className="py-3 px-3">
                            <Button.Ripple outline={filter.sotsialset != ''} color="primary" onClick={() => this.SocialRefresh('')} className="p-2 rounded mr-2 cursor-pointer" id="Grid"> <Grid  size={22} /> </Button.Ripple>
                            <Button.Ripple outline color="primary" onClick={() => this.Refresh(this.props.oblastid)} className="p-2 rounded mr-2 cursor-pointer" id="Globe"> <Globe  size={22} /> </Button.Ripple>
                            <Button.Ripple outline color="primary" className="p-2 rounded mr-2 cursor-pointer"> <Navigation size={22} /> </Button.Ripple>
                            <Button.Ripple outline={filter.sotsialset != 'fb_page'} color="primary" onClick={() => this.SocialRefresh('fb_page')} className="p-2  rounded mr-2 cursor-pointer"> <Facebook size={22} /> </Button.Ripple>
                            <Button.Ripple outline={filter.sotsialset != 'instagram_new'} color="primary" onClick={() => this.SocialRefresh('instagram_new')} className="p-2  rounded mr-2 cursor-pointer"> <Instagram size={22} /> </Button.Ripple>
                            <Button.Ripple outline color="primary" className="p-2 rounded mr-2 cursor-pointer"> <Youtube size={22} /> </Button.Ripple>
                            <Button.Ripple outline color="primary" className="p-2 rounded mr-2 cursor-pointer"> <Twitter size={22} /> </Button.Ripple>
                            {/* <span className="p-2 bg-gradient-dark text-white rounded mr-2 cursor-pointer"> <Twitter size={22} /> </span>
                            <span className="p-2 bg-gradient-dark text-white rounded cursor-pointer"> <Twitter size={22} /> </span>  */}
                            <UncontrolledTooltip
                                placement="top"
                                target="Globe"
                            >
                                Hello World !
                            </UncontrolledTooltip>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            {/* <Flatpickr
                                className="form-control w-25 mr-2"
                                options={{  mode: "range"  }}
                                value={basicPicker}
                                onChange={date => {
                                    this.setState({ basicPicker : date })
                                }}
                            /> */}
                            <Flatpickr
                                className="form-control w-25 mr-2"
                                value={[filter.from_date,filter.to_date]}
                                placeholder={t2("filterdate", intl)}
                                options={{
                                dateFormat: "Y.m.d",
                                mode: "range",
                                locale:
                                    intl.locale == "ru"
                                    ? Russian
                                    : intl.locale == "cl"
                                    ? Uzbek
                                    : UzbekLatin,
                                }}
                                onChange={(date) => {
                                    this.ChangeDate(date)
                                    this.NewPost()
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
                            stat={parseNumber(posts.views,0)}
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
                                <UzbMap oblastid={this.props.oblastid} height={300} />
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
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="views"
                                                stroke="#7367F0"
                                                activeDot={{ r: 8 }}
                                            />
                                            {/* <Line
                                                type="monotone"
                                                dataKey="uv"
                                                stroke="#28C76F"
                                            /> */}
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
                                stat={parseNumber(posts.fallowers)}
                                statTitle="Users"
                                options={subscribersGained}
                                series={FollowersList}
                                type="area"
                            />
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                        <Card className="pt-1" style={{ paddingBottom : '9px' }}>
                            <StatisticsCard
                                icon={<MessageSquare className="primary" size={22} />}
                                stat={parseNumber(posts.comments)}
                                statTitle="Comments"
                                options={subscribersGained}
                                series={CommentList}
                                type="area"
                            />
                        </Card>
                    </Col>
                    <Col sm="12" md="6" lg="3">
                        <Card className="pt-1" style={{ paddingBottom : '9px' }}>
                            <StatisticsCard
                                icon={<Heart className="primary" size={22} />}
                                stat={parseNumber(posts.likes)}
                                statTitle="Likes"
                                options={subscribersGained}
                                series={Likes}
                                type="area"
                            />
                        </Card>
                    </Col>
                </Row>
                </Overlay>
        )
    }
}
const mapStateToProps = state => {
    return {
      oblastid : state.oblastAction.oblastid
    }
}
export default injectIntl(connect(mapStateToProps)(Dashboard))
import React, { useState } from 'react'
import { Row,Col,UncontrolledButtonDropdown,DropdownToggle,DropdownItem,DropdownMenu,Card,CardBody,Table } from 'reactstrap'
import { ChevronDown,Filter,Printer } from 'react-feather'

const SpesService = () => {
    var [openSidebar, setOpenSidebar] = useState(false);
    return(
        <div>
            <Card>
                <CardBody>
                    <Row>
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
                            <Filter onClick={() => setOpenSidebar(true)} style={{ cursor : 'pointer'}} className="mr-1 text-primary" size={20} />
                            
                            
                            <Printer style={{ cursor : 'pointer'}} className="text-primary" size={20} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Table striped responsive bordered>
                                <thead>
                                    <tr>
                                        <th style={{ verticalAlign:'middle' }} rowSpan="2" className="bg-primary text-white"> № </th>
                                        <th style={{ verticalAlign:'middle' }}  rowSpan="2"> SpesService </th>
                                        <th colSpan="2" className="text-center"> Web-sayt </th>
                                        <th colSpan="2" className="text-center"> Telegram </th>
                                        <th colSpan="2" className="text-center"> Facebook </th>
                                        <th colSpan="2" className="text-center"> Instagram </th>
                                        <th colSpan="2" className="text-center"> Youtube </th>
                                        <th colSpan="2" className="text-center"> Twitter </th>
                                        <th colSpan="2" className="text-center"> Tiktok </th>
                                        <th colSpan="2" className="text-center"> Teletype </th>
                                        <th colSpan="2" className="text-center"> Others </th>
                                        <th style={{ verticalAlign:'middle' }} rowSpan="2"> Rate </th>
                                        <th style={{ verticalAlign:'middle' }} rowSpan="2"> Actions </th>
                                    </tr>
                                    <tr>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                        <th> Post </th>
                                        <th> Prosmotr </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                        <th>11</th>
                                        <th>12</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>

                                    </tr>
                                    <tr>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                        <th>11</th>
                                        <th>12</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                        <th>13</th>
                                    </tr> 
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
export default SpesService
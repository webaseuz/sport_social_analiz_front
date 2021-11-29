import React, { useState } from 'react'
import Sidebar from "react-sidebar";
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
                            <Table striped responsive >
                                <thead>
                                    <tr>
                                        <th> № </th>
                                        <th> SpesService </th>
                                        <th> Web-sayt </th>
                                        <th> Telegram </th>
                                        <th> Facebook </th>
                                        <th> Instagram </th>
                                        <th> Youtube </th>
                                        <th> Twitter </th>
                                        <th> Tiktok </th>
                                        <th> Teletype </th>
                                        <th> Others </th>
                                        <th> Rate </th>
                                        <th> Actions </th>
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
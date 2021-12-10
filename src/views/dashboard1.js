import React from 'react'
import { Card,Row,Col,Table } from 'reactstrap'
import Select from "react-select"
const sortOptions = [
    {
      value: "featured",
      label: "Featured"
    },
    {
      value: "lowest",
      label: "Lowest"
    },
    {
      value: "highest",
      label: "Highest"
    }
]
const Dashboard = () => {
    return(
        <div>
            <Row>
                <Col className="view-options d-flex">
                    <Select
                        className="React-Select w-25"
                        classNamePrefix="select"
                        defaultValue={sortOptions[0]}
                        name="sort"
                        options={sortOptions}
                    />
                </Col>
                <Col>
                    
                </Col>
            </Row>
            <Card className="mt-2">
                <Row className="mt-2 mx-1">
                    <Col>
                        <Table striped responsive bordered style={{ borderRadius  : '10px' }}>
                            <thead className="bg-primary text-white text-center">
                                <tr>
                                    <th > № </th>
                                    <th > SpesService </th>
                                    <th > Web-sayt </th>
                                    <th > Telegram </th>
                                    <th > Facebook </th>
                                    <th > Instagram </th>
                                    <th > Youtube </th>
                                    <th > Twitter </th>
                                    <th > Tiktok </th>
                                    <th > Teletype </th>
                                    <th > Others </th>
                                    <th > Rate </th>
                                    <th > Actions </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
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
            </Card>
        </div>
    )
}
export default Dashboard
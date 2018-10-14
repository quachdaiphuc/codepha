import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

class Chart extends Component {

    renderLineDesc = (data) => (
        data.map(item =>
            <Line type='monotone' key={item.name} dataKey={item.name} stroke={item.color} />
        )
    )

    render() {
        return (
            <ResponsiveContainer height={300}>
                <LineChart height={300} data={this.props.data}
                    margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                    <XAxis dataKey='name' padding={{ left: 10 }} />
                    <YAxis />
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    {this.renderLineDesc(this.props.desc)}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default Chart

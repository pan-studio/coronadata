import React, { useContext } from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { getGrays, getPosition, themeColors } from '../../helpers/utils';
import AppContext from '../../context/Context';
import { any } from 'prop-types';
const gray = getGrays(false);

class AutomataChart extends React.Component {

    constructor(props) {
        super(props);
        this.state.positive = this.props.positive;
        this.state.days = this.props.days;
        this.state.totalPopulation = this.props.totalPopulation;
        this.state.grays = gray;

    }

    state = {
        positive: [0],
        days: 0,
        totalPopulation: 0,
        dataBackground: [0],
        grays: gray,
    };

    //const dataBackground = data.map(() => yMax);

    getOption = (grays) => {

        //  this.state.dataBackground = this.state.positive.map(() => this.props.totalPopulation);

        return {
            tooltip: {
                trigger: 'axis',
                padding: [7, 10],
                formatter: '{b1}: {c1}',
                backgroundColor: grays.white,
                borderColor: grays['300'],
                borderWidth: 1,
                textStyle: { color: themeColors.dark },
                transitionDuration: 0,
                position(pos, params, dom, rect, size) {
                    return getPosition(pos, params, dom, rect, size);
                }
            },
            xAxis: {
                type: 'category',
                data: this.state.days,
                boundaryGap: false,
                axisLine: { show: false },
                axisLabel: { show: false },
                axisTick: { show: false },
                axisPointer: { type: 'none' }
            },
            yAxis: {
                type: 'value',
                splitLine: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false },
                axisTick: { show: false },
                axisPointer: { type: 'none' }
            },
            series: [
                {
                    type: 'bar',
                    barWidth: '5px',
                    barGap: '-100%',
                    itemStyle: {
                        color: grays['200'],
                        barBorderRadius: 10
                    },
                    data: this.state.positive,
                    animation: false,
                    emphasis: { itemStyle: { color: grays['200'] } }
                },
                {
                    type: 'bar',
                    barWidth: '5px',
                    itemStyle: {
                        color: themeColors.primary,
                        barBorderRadius: 10
                    },
                    data: this.state.positive,
                    emphasis: { itemStyle: { color: themeColors.primary } },
                    z: 10
                }
            ],
            grid: { right: 5, left: 10, top: 0, bottom: 0 }
        };
    };

    render() {


        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption(this.state.positive, this.state.dataBackground, this.state.grays)}
                style={{ width: '90%', height: '10rem' }}
            />
        )
    }
}

export default AutomataChart;

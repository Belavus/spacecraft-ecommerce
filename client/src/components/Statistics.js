import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ProductContext } from '../contexts/ProductContext';
import { useTheme } from '@mui/material/styles';

const Statistics = () => {
    const { products } = useContext(ProductContext);
    const theme = useTheme();
    const svgRef = useRef();

    const data = products.map(product => ({
        name: product.name,
        value: product.orderCount
    }));

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 50, left: 60 };

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        const yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        // Использование цвета из темы
        const barColor = theme.palette.primary.main;
        const axisColor = theme.palette.text.primary;

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .attr('fill', barColor); // Установка цвета столбцов

        svg.append('g')
            .call(xAxis)
            .selectAll('text')
            .attr('fill', axisColor); // Установка цвета текста оси X

        svg.append('g')
            .call(yAxis)
            .selectAll('text')
            .attr('fill', axisColor); // Установка цвета текста оси Y

        // Добавление подписей осей
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr('fill', axisColor) // Цвет подписи
            .text("Product Name");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr('fill', axisColor) // Цвет подписи
            .text("Order Count");

    }, [data, theme, products]);

    return (
        <svg ref={svgRef} width={500} height={300}></svg>
    );
};

export default Statistics;

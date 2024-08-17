import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const Statistics = ({ products, attributes }) => {
    const theme = useTheme();
    const svgRefs = useRef([]);

    useEffect(() => {
        attributes.forEach((attribute, index) => {
            const data = products.map(product => ({
                name: product.name,
                value: product[attribute]
            }));

            const svg = d3.select(svgRefs.current[index]);
            svg.selectAll('*').remove();

            const width = 500
            const height = 250;
            const margin = { top: 20, right: 0, bottom: 30, left: 40 };

            const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)]).nice()
                .range([height - margin.bottom, margin.top]);

            const xAxis = g => g
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))
                .selectAll('text')
                .attr('fill', theme.palette.text.primary)
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', 'rotate(-45)');

            const yAxis = g => g
                .attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .selectAll('text')
                .attr('fill', theme.palette.text.primary);

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
                .attr('fill', barColor);

            svg.append('g').call(xAxis);
            svg.append('g').call(yAxis);

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height+50)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr('fill', axisColor)
                .text("Product Name");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", 10)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr('fill', axisColor)
                .text(attribute.replace(/([A-Z])/g, ' $1').trim());
        });
    }, [products, attributes, theme]);

    return (
        <Box>
            {attributes.map((attribute, index) => (
                <Box key={attribute} sx={{ marginBottom: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        {attribute.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <svg ref={el => svgRefs.current[index] = el} width="100%" height={300}></svg>
                </Box>
            ))}
        </Box>
    );
};

export default Statistics;
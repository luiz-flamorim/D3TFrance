let margin = {
    top: 30,
    right: 30,
    bottom: 150,
    left: 30,
}
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let svg = d3.select('#viz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1)

let y = d3.scaleLinear()
    .range([height, 0])

d3.csv('sales.csv', (d) => {
        d.sales = +d.sales;
        return d
    })
    .then((results) => {
        x.domain(results.map(d => d.flavors))
        y.domain([0, d3.max(results, d => d.sales)])
            .nice()// rounds up the value for the axis

        svg.append('g')// y axis
            .call(d3.axisLeft(y))

        svg.append('g')// x axis
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('x', x.bandwidth()/2)
            .attr('y', 0)
            .attr('dy', '0.35em')
            .attr('transform', 'rotate(90)')
            .attr('text-anchor', 'start')

    })
    .catch((error) => {
        throw error;
    })
let margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
}
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let svg = d3.select('#viz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transofrm', `translate(${margin.left}, ${margin.top})`);

let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1)

d3.csv('sales.csv', (d) => {
        d.sales = +d.sales;
        return d
    })
    .then((results) => {
        x.domain(results.map(d => d.flavours))

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(results, d => d.sales)])
            .nice()

        svg.append('g')
            .call(d3.axisLeft(y))

    })
    .catch((error) => {
        throw error;
    })
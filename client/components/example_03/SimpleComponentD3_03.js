import d3 from 'd3';

export default class SimpleComponentD3 {
  constructor(el, props = {}) {
    this.svg = d3.select(el).append('svg')
      .attr('class', 'bubble-chart-d3')
      .style('overflow', 'visible');
    this.update(el, props);
  }

  adjustSize(el) {
    this.diameter = Math.min(el.offsetWidth, el.offsetHeight);
    const top  = Math.max((el.offsetHeight - this.diameter)/2, 0);
    // center some stuff vertically
    this.svg.attr('width', this.diameter)
      .attr('height', this.diameter)
      .style('position', 'relative')
      .style('top', top + 'px');   // center vertically

    // create the bubble layout that we will use to position our bubbles\
    this.bubble = d3.layout.pack()
      .sort(null)
      .size([this.diameter, this.diameter])
      .padding(3);
  }

  update(el, props) {
    this.adjustSize(el);
    const duration = 500;
    const delay = 0;
    const { data, colorLegend } = props;
    
    // define a color scale for our colorValues
    const color = d3.scale.quantize()
      .domain([
        d3.min(data, d => d.colorValue),
        d3.max(data, d => d.colorValue)
      ])
      .range(colorLegend);

    // get our layout data
    const nodes = this.bubble.nodes(data.length ? {children: data} : data)
      .filter(d => d.depth); // filter out the outer bubble

    // link our nodes to d3
    const circles = this.svg.selectAll('circle')
      .data(nodes, d => 'g' + d._id);

    // move any existing nodes to their new location
    circles.transition()
      .duration(duration)
      .delay((d, i) => i * 7)
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', d => d.r)
      .style('opacity', 1)
      .style('fill', d => color(d.colorValue));
    // create any new nodes and postion them
    circles.enter().append('circle')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', 0)
      .style('fill', d => color(d.colorValue))
      .transition()
      .duration(duration * 1.2)
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', d => d.r)
      .style('opacity', 1);
    // remove any nodes that ain't there
    circles.exit()
      .transition()
      .duration(duration)
      .attr('transform', d => {
        const dy = d.y - this.diameter/2;
        const dx = d.x - this.diameter/2;
        const theta = Math.atan2(dy,dx);
        const destX = this.diameter * (1 + Math.cos(theta) )/ 2;
        const destY = this.diameter * (1 + Math.sin(theta) )/ 2; 
        return 'translate(' + destX + ',' + destY + ')'; })
      .attr('r', 0)
      .remove();
  }

  /** Any necessary cleanup */
  destroy(el) { }
}

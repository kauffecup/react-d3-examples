import d3 from 'd3';

export default class ReactBubbleChartD3 {
  constructor(el, props = {}) {
    this.svg = d3.select(el).append('svg')
      .attr('class', 'bubble-chart-d3')
      .style('overflow', 'visible');
    this.html = d3.select(el).append('div')
      .attr('class', 'bubble-chart-text')
      .style('position', 'absolute')
      .style('left', 0)           // center horizontally
      .style('right', 0)
      .style('margin-left', 'auto')
      .style('margin-right', 'auto');
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
    this.html.style('width', this.diameter + 'px')
      .style('height', this.diameter + 'px')
      .style('top', top + 'px');   // center vertically;
    // create the bubble layout that we will use to position our bubbles\
    this.bubble = d3.layout.pack()
      .sort(null)
      .size([this.diameter, this.diameter])
      .padding(3);
  }

  update(el, props) {
    this.adjustSize(el);
    var duration = 500;
    var delay = 0;
    const { data, colorLegend } = props;
    
    // define a color scale for our colorValues
    const color = d3.scale.quantize()
      .domain([
        d3.min(data, d => d.colorValue),
        d3.max(data, d => d.colorValue)
      ])
      .range(colorLegend);

    // get our layout data
    var nodes = this.bubble.nodes(data.length ? {children: data} : data)
      .filter(d => d.depth); // filter out the outer bubble

    // link our nodes to d3
    var circles = this.svg.selectAll('circle')
      .data(nodes, (d) => 'g' + d._id);
    var labels = this.html.selectAll('.bubble-label')
      .data(nodes, (d) => 'g' + d._id);

    // move any existing nodes to their new location
    circles.transition()
      .duration(duration)
      .delay((d, i) => {delay = i * 7; return delay;})
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', (d) => d.r)
      .style('opacity', 1)
      .style('fill', d => color(d.colorValue));
    labels.transition()
      .duration(duration)
      .delay((d, i) => {delay = i * 7; return delay;})
      .style('height', d => 2 * d.r + 'px')
      .style('width', d => 2 * d.r + 'px')
      .style('left', d =>  d.x - d.r + 'px')
      .style('top', d =>  d.y - d.r + 'px')
      .style('opacity', 1);
    // create any new nodes and postion them
    circles.enter().append('circle')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', (d) => 0)
      .style('fill', d => color(d.colorValue))
      .transition()
      .duration(duration * 1.2)
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', (d) => d.r)
      .style('opacity', 1);
    labels.enter().append('div')
        .attr('class', 'bubble-label')
        .text(d => d.displayText || d._id)
        .style('position', 'absolute')
        .style('height', d => 2 * d.r + 'px')
        .style('width', d => 2 * d.r + 'px')
        .style('left', d =>  d.x - d.r + 'px')
        .style('top', d =>  d.y - d.r + 'px')
        .style('opacity', 0)
        .transition()
        .duration(duration * 1.2)
        .style('opacity', 1);
    // remove any nodes that ain't there
    circles.exit()
      .transition()
      .duration(duration)
      .attr('transform', (d) => {
        var dy = d.y - this.diameter/2;
        var dx = d.x - this.diameter/2;
        var theta = Math.atan2(dy,dx);
        var destX = this.diameter * (1 + Math.cos(theta) )/ 2;
        var destY = this.diameter * (1 + Math.sin(theta) )/ 2; 
        return 'translate(' + destX + ',' + destY + ')'; })
      .attr('r', 0)
      .remove();
    labels.exit()
      .transition()
      .duration(duration)
      .style('top', (d) => {
        var dy = d.y - this.diameter/2;
        var dx = d.x - this.diameter/2;
        var theta = Math.atan2(dy,dx);
        var destY = this.diameter * (1 + Math.sin(theta) )/ 2; 
        return destY + 'px'; })
      .style('left', (d) => { 
        var dy = d.y - this.diameter/2;
        var dx = d.x - this.diameter/2;
        var theta = Math.atan2(dy,dx);
        var destX = this.diameter * (1 + Math.cos(theta) )/ 2;
        return destX + 'px'; })
      .style('opacity', 0)
      .style('width', 0)
      .style('height', 0)
      .remove();
  }

  /** Any necessary cleanup */
  destroy(el) { }
}

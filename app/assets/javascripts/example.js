// usage:
// joinData([{"x": 100.0, "y": 100.1}, {"x": 20.0, "y": 20.5}, {"x": 50, "y": 75 }]);
// joinDataTransition([{"x": 100.0, "y": 100.1}, {"x": 20.0, "y": 20.5}, {"x": 50, "y": 75 }, {"x": 300, "y" : 250}]);
// growCircles();

function joinData(data) {
  var svg = d3.select('svg');
  var circle = svg.selectAll("circle")
      .data(data);
  
  circle.enter().append("circle")
      .attr("r", 10.5);
  
  circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  
  circle.exit().remove();
}

function joinDataTransition(data) {
  var svg = d3.select('svg');
  var circle = svg.selectAll("circle")
      .data(data);
  
  circle.enter().append("circle")
      .attr("r", 0)
      .transition()
      .attr("r", 10.5);
  
  circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  
  circle.exit().transition().attr("r", 0).remove();
}

function growCircles() {
  d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { 
      return Math.sqrt(d.x * 2); 
    });
}

function showFreebaseResults(data) {
  var svg = d3.select('svg');
  
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
 
  var force = d3.layout.force()
     .charge(-120)
     .linkDistance(20)
     .size([width, height]);
     
  force.nodes(data).start();
     
  var label = svg.selectAll("text").data(data);
      
  label.enter().append("text").text(function(d) { return d[0]; }).call(force.drag);
  
  label
      .attr("x", function(d) { return d[1] * 10; })
      .attr("y", function(d) { return d[1] * 10; })
      .attr("font-size", function(d) { return d[1] });
      
  force.on("tick", function() {
 
     label.attr("x", function(d) { return d.x + 20; })
         .attr("y", function(d) { return d.y + 15; });
  });
  
  label.exit().remove();
};

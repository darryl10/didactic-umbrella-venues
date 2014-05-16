'use strict';

angular.module('ugcVizApp')
  .controller('MainCtrl', function ($scope) {
        var WIDTH = 1280,
            HEIGHT = 800,
            RADIUS = 720,
            x = d3.scale.linear().range([0, RADIUS]),
            y = d3.scale.linear().range([0, RADIUS]),
            node,
            root;

        var pack = d3.layout.pack()
            .size([RADIUS, RADIUS])
            .value(function(d) { return d.size; })

        var vis = d3.select("body").insert("svg:svg", "h2")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("svg:g")
            .attr("transform", "translate(" + (WIDTH - RADIUS) / 2 + "," + (HEIGHT - RADIUS) / 2 + ")");

        d3.json("/data/ugc.json", function(data) {
            node = root = data;

            var nodes = pack.nodes(root);

            vis.selectAll("circle")
                .data(nodes)
                .enter().append("svg:circle")
                .attr("class", function(d) { return d.children ? "parent" : "child"; })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d) { return d.r; })
                .on("click", function(d) { return zoom(node == d ? root : d); })
                .attr("style", function() {return "fill: red;"});


            vis.selectAll("text")
                .data(nodes)
                .enter().append("svg:text")
                .attr("class", function(d) { return d.children ? "parent" : "child"; })
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
                .text(function(d) { return d.name; });

            d3.select(window).on("click", function() { zoom(root); });
        });

        function zoom(d, i) {
            var k = RADIUS / d.r / 2;
            x.domain([d.x - d.r, d.x + d.r]);
            y.domain([d.y - d.r, d.y + d.r]);

            var t = vis.transition()
                .duration(d3.event.altKey ? 7500 : 750);

            t.selectAll("circle")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("r", function(d) { return k * d.r; });

            t.selectAll("text")
                .attr("x", function(d) { return x(d.x); })
                .attr("y", function(d) { return y(d.y); })
                .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

            node = d;
            d3.event.stopPropagation();
        }
  });

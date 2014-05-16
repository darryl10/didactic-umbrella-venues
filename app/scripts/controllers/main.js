'use strict';
//TODO qa10.d:9090/internal/v1/analytics/tags

angular.module('ugcVizApp')
  .controller('MainCtrl', function ($scope) {
        var WIDTH = 1280,
            HEIGHT = 800,
            RADIUS = 900,
            x = d3.scale.linear().range([0, RADIUS]),
            y = d3.scale.linear().range([0, RADIUS]),
            node,
            root;

        var pack = d3.layout.pack()
            .size([RADIUS, RADIUS])
            .value(function(d) { return d.reviews_count; })
            .padding(3);

        var vis = d3.select(".container").insert("svg:svg", "h2")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("svg:g")
            .attr("transform", "translate(" + (WIDTH - RADIUS) / 2 + "," + (HEIGHT - RADIUS) / 2 + ")");

        d3.json("http://qa10.d:9090/public/v1/analytics/tags", function(data) {
            node = root = data;

            var nodes = pack.nodes(root);

            for(var i = 0; i < nodes.length; ++i) {
                setCategoryColor(nodes[i]);
            }

            vis.selectAll("circle")
                .data(nodes)
                .enter().append("svg:circle")
                .attr("class", function(d) { return d.children ? "parent" : "child"; })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d) { return d.r; })
                .on("click", function(d, a, b) { console.log(d); return zoom(node == d ? root : d); })
//                .on("mouseover", function(d, a, b) { return onMouseOver(d); })
//                .on("mouseleave", function(d, a, b) { return setOpacity(d); })
                .attr("fill", function (d, i) {
                    if (d.name === "Fantastic!!!! What a great place. Had a superb Saturday night there last week. Excellent ...") {
                        console.log(d.parent.name)
                        console.log('what', d, setCircleColour(d));
                    }
                    return setCircleColour(d, i);
                })
//                .style("opacity", function(d) { return setOpacity(d)});

            vis.selectAll("text")
                .data(nodes)
                .enter().append("svg:text")
                .attr("class", function(d) { return d.children ? "parent" : "child"; })
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("opacity", function(d) { return d.depth > 1 ? 0 : 1; })
                .text(function(d) { return d.name; });

            d3.select(window).on("click", function() { zoom(root); });
        });

        function onMouseOver(d) {

            if(d.depth === 1){
                var k = RADIUS / d.r / 2;
                var t = vis.transition()
                    .duration(d3.event.altKey ? 7500 : 300);

                var rootNode = d;

                t.selectAll("circle")
                    .style("opacity", function(d) { return setOpacity(d, rootNode, k) });

                t.selectAll("text")
                    .style("opacity", function(d) { return setOpacity(d, false, k, true) });
            }


        }

        function setCategoryColor(node) {
            if(node.depth === 1) {
                node.categoryColor = getRandomArbitary(0,365);
            }
        }

        function setOpacity(node, rootNode, k, text) {

            if(rootNode && rootNode.depth !== 0 && node.parent && rootNode.name === node.parent.name) {
                if (node.depth ===1) {
                    return 0.1
                } else if (!text){
                    return k * node.r > 20 ? 1 : 0;
                }

            } else {
                if(node.depth > 1) {
                    return 0;
                } else if (node.depth ===1 && !text){
                    return 0.4;
                } else if (node.depth ===0) {
                    return 0;
                }
            }

        }

        function getRandomArbitary (min, max) {
            return Math.random() * (max - min) + min;
        }

        function setCircleColour(d) {

                if(d.depth === 1 ) {
                    var color = d3.hsl(d.categoryColor, 0.75,0.5);
                    return color;
                }

                if(d.average_rating && d.depth ===2) {
                    var color = d3.hsl(d.parent.categoryColor,0.75,d.average_rating / 200 + 0.25);
                    return color;
                }

                if(d.average_rating && d.depth ===3) {
                    var color = d3.hsl(d.parent.parent.categoryColor,0.75,d.average_rating / 200 + 0.25);
                    return color;
                }

        }

        function zoom(d, i) {

            var k = RADIUS / d.r / 2;
            x.domain([d.x - d.r, d.x + d.r]);
            y.domain([d.y - d.r, d.y + d.r]);

            var rootNode = d;

            var t = vis.transition()
                .duration(d3.event.altKey ? 7500 : 300);

            t.selectAll("circle")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("r", function(d) { return k * d.r; })
                .style("opacity", function(d) { return setOpacity(d, rootNode, k) });

            t.selectAll("text")
                .attr("x", function(d) { return x(d.x); })
                .attr("y", function(d) { return y(d.y); })
                .style("opacity", function(d) { return setOpacity(d, rootNode, k, true) });

            node = d;

            d3.event.stopPropagation();

        }
  });

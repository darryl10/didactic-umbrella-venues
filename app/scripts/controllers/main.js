'use strict';
//TODO qa10.d:9090/internal/v1/analytics/tags

angular.module('ugcVizApp')
  .controller('MainCtrl', function ($scope, $location, Venues) {
        var WIDTH = 1280,
            HEIGHT = 800,
            RADIUS = 1200,
            x = d3.scale.linear().range([0, RADIUS]),
            y = d3.scale.linear().range([0, RADIUS]),
            node,
            root;

      $scope.title = "Home";
        // $scope.friends = friends;
        $scope.items = ['Venues', 'Attractions', 'Documentation', 'Analysis'];
        $scope.selectedValue = 'Venues';

        var pack = d3.layout.pack()
            .size([RADIUS, RADIUS])
            .value(function(d) { return d.reviews_count; })
            .padding(3);

        var vis = d3.select(".container").insert("svg:svg", "h2")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("svg:g")
            .attr("transform", "translate(" + (WIDTH - RADIUS) / 2 + "," + (HEIGHT - RADIUS) / 2 + ")");

        d3.json("/data/ugc.json", function(data) {
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
                .on("click", function(d, a, b) { return zoom(node == d ? root : d); })
//                .on("mouseover", function(d, a, b) { return onMouseOver(d); })
                .attr("fill", function (d, i) {
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

        function setCategoryColor(node) {
            if(node.depth === 1) {
                node.categoryColor = getRandomArbitary(0,220);
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

                if(node.depth === 2 && text) {
                    return 0;
                } else if (node.depth ===1 && !text){
                    return 0.4;
                } else if (node.depth ===0) {
                    return 0;
                }
            }

            if(text && node.depth === 3) {
                return 0;
            }

        }

          $scope.save = function () {
            alert("Saved.");
        };


        function getRandomArbitary (min, max) {
            return Math.random() * (max - min) + min;
        }

        function setCircleColour(d) {

            var color = 'red';

            if (d.depth === 1) {
                color = d3.hsl(d.categoryColor, 0.75, 0.5);
            } else if (d.depth === 2) {
                color = d3.hsl(d.parent.categoryColor, 0.75, d.average_rating / 200 + 0.25);
            } else if (d.depth === 3) {
                color = d3.hsl(d.parent.parent.categoryColor, 0.75, d.average_rating / 200 + 0.25);
            }

            if(!d.average_rating) {
                console.log(d);
            }

            return color;

        }

        function zoom(d, i) {

            var k = RADIUS / d.r / 2;
            x.domain([d.x - d.r, d.x + d.r]);
            y.domain([d.y - d.r, d.y + d.r]);

            var rootNode = d;

            var t = vis.transition()
                .duration(d3.event.altKey ? 7500 : 500);

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

// angular.module('app')
//   .controller('HomeCtrl', ['$scope', 'friends', function($scope, friends) {
//         $scope.title = "Home";
//         $scope.friends = friends;
//         $scope.items = ['Venues', 'Attractions', 'Documentation', 'Analysis'];
//         $scope.selectedValue = 'Venues';
//         $scope.save = function () {
//             alert("Saved.");
//         };
//       }]);

//   angular.module('app')
//    .controller('AboutCtrl', ['$scope', function($scope) {
//         $scope.title = "Home";
//         $scope.items = ['thing1', 'thing2', 'thing3', 'thing4'];
//       }]);

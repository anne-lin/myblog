var width  = 1000;
var height = 600;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(100,100)");

var projection = d3.geo.mercator()
    .center([107, 31])
    .scale(700)
    .translate([width/2, height/2]);

var path = d3.geo.path()
    .projection(projection);


var color = d3.scale.category20();

/*https://raw.githubusercontent.com/aruis/chinamap/master/data/cn.json*/
d3.json("../json/cn.json", function(error, root) {

    if (error)
        return console.error(error);
    console.log(root.features);

    svg.selectAll("path")
        .data( root.features )
        .enter()
        .append("path")
        .attr("stroke","#000")
        .attr("stroke-width",1)
        .attr("fill", function(d,i){
                return color(i);
        })
        .attr("d", path )
        .on("mouseover",function(d,i){
            d3.select(this)
                .attr("fill","#99ffff");
        })
        .on("mouseout",function(d,i){
            d3.select(this)
                .attr("fill",color(i));
        });

});

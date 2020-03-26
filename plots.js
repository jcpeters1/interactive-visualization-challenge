d3.json("data/data.json").then((data) => {

    var names = data.names;

    names.forEach(function(name) {

        var select = d3.select("#selDataset");
        var option = select.append("option").text(name)

    });

    
});

function init() {
    d3.json("data/data.json").then((sampleData) => {
        var samples = sampleData.samples

        var otuId = samples[0].otu_ids.slice(0, 10).reverse();
        var titles = otuId.map(x => "OTU " + x);
        var text = samples[0].otu_labels.slice(0, 10).reverse();

        var data1 = [{
            x: samples[0].sample_values.slice(0, 10).reverse(),
            y: titles,
            text: text,
            type: "bar",
            orientation: "h"
        }];

        //bubble chart variables
        var sampleValuesBubble = samples[0].sample_values;
        var otuIdBubble = samples[0].otu_ids
        var textBubble = samples[0].otu_labels

        //bubble chart data
        var data2 = [{
            x: otuIdBubble,
            y: sampleValuesBubble,
            text: textBubble,
            mode: "markers",
            marker: {size: sampleValuesBubble}
        }];
        
        var layout = {
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bar-plot", data1);
        Plotly.newPlot("bubble-plot", data2, layout)
    
    });

    d3.json("data/data.json").then((NewData) => {

        var meta = NewData.metadata

        var output = d3.select(".output");
        Object.entries(meta[0]).forEach(([key, value]) => {
            var li = output.append("li").text(`${key}: ${value}`);
        });

    });


};


function optionChanged(newOption) {

    d3.json("data/data.json").then((NewData) => {

        var meta = NewData.metadata

        function filteredMeta(patient) {
            return patient.id == newOption;
        };
        var metadata = meta.filter(filteredMeta);

        var output = d3.select(".output");
        output.html("");
        Object.entries(metadata[0]).forEach(([key, value]) => {
            var li = output.append("li").text(`${key}: ${value}`);
        });

    });
    
    d3.json("data/data.json").then((sampleData) => {

        var samples = sampleData.samples

        //filter results to match the dropdown
        function filteredSamples(patient) {
            return patient.id == newOption;
        };

        var patientSample = samples.filter(filteredSamples);

        //var chart variables
        var sampleValues = patientSample[0].sample_values.slice(0, 10).reverse();
        var otuId = patientSample[0].otu_ids.slice(0, 10).reverse();
        var otuArr = otuId.map(x => "OTU " + x);
        var text = patientSample[0].otu_labels.slice(0, 10).reverse();

        //bar chart data
        var data = [{
            x: sampleValues,
            y: otuArr,
            text: text,
            type: "bar",
            orientation: "h"
          }];

        //bubble chart variables
        var sampleValuesBubble = patientSample[0].sample_values;
        var otuIdBubble = patientSample[0].otu_ids
        var otuArrBubble = otuId.map(x => "OTU " + x);
        var textBubble = patientSample[0].otu_labels

        //bubble chart data
        var data2 = [{
            x: otuIdBubble,
            y: sampleValuesBubble,
            text: textBubble,
            mode: "markers",
            marker: {size: sampleValuesBubble}
        }];
        
        var layout = {
            xaxis: {title: "OTU ID"}
        };

          // plot bar chart
          Plotly.newPlot("bar-plot", data);
          //plot bubble chart
          Plotly.newPlot("bubble-plot", data2, layout)

    });
};

init();
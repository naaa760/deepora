"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useGraphStore } from "@/store/graphStore";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

export function KnowledgeGraph() {
  const svgRef = useRef(null);
  const { nodes, links, setSelectedNode, selectedNode } = useGraphStore();
  const [zoom, setZoom] = useState(1);

  // Function to handle zoom in/out
  const handleZoom = (direction) => {
    if (direction === "in") {
      setZoom(Math.min(zoom + 0.2, 2));
    } else {
      setZoom(Math.max(zoom - 0.2, 0.5));
    }
  };

  // Function to reset graph layout
  const resetGraph = () => {
    if (!svgRef.current || nodes.length === 0) return;

    // This will re-trigger the useEffect to redraw the graph
    setZoom(1);
  };

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear any existing graph
    svg.selectAll("*").remove();

    // Apply zoom transform
    const g = svg.append("g").attr("transform", `scale(${zoom})`);

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(70)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / (2 * zoom), height / (2 * zoom)));

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // Create nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => {
        setSelectedNode(d.id);
      });

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) => color(d.group))
      .attr("stroke", (d) => (d.id === selectedNode ? "#ff6b6b" : "#fff"))
      .attr("stroke-width", (d) => (d.id === selectedNode ? 3 : 1));

    // Add labels to nodes
    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text((d) => d.label)
      .attr("font-size", "10px");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links, setSelectedNode, selectedNode, zoom]);

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 rounded-lg flex flex-col">
      <div className="flex justify-end gap-2 p-2">
        <button
          onClick={() => handleZoom("in")}
          className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={resetGraph}
          className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md"
          aria-label="Reset graph"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-4">
            <p className="text-gray-500 dark:text-gray-400">
              Ask a question to generate a knowledge graph
            </p>
          </div>
        ) : (
          <svg ref={svgRef} className="h-full w-full overflow-visible" />
        )}
      </div>

      {selectedNode && (
        <div className="p-3 border-t">
          <h3 className="font-medium text-sm">
            {nodes.find((n) => n.id === selectedNode)?.label}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Click on this node to explore related concepts
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useGraphStore } from "@/store/graphStore";

export function KnowledgeGraph() {
  const svgRef = useRef(null);
  const { nodes, links, setSelectedNode } = useGraphStore();

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear any existing graph
    svg.selectAll("*").remove();

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
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // Create nodes
    const node = svg
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
      .attr("fill", (d) => color(d.group));

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
  }, [nodes, links, setSelectedNode]);

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
      {nodes.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-gray-500 dark:text-gray-400">
            Ask a question to generate a knowledge graph
          </p>
        </div>
      ) : (
        <svg ref={svgRef} className="h-full w-full overflow-visible" />
      )}
    </div>
  );
}

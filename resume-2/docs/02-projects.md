# Projects — Detailed Technical Descriptions

## Spotify Playlist Generator
An AI app that generates and saves playlists directly to Spotify. Built with Solar 10.7-b (an open LLM), Streamlit for the UI, and DALL-E for cover-art generation. The user describes a mood or vibe, the LLM generates a tracklist with reasoning, and the app pushes it to Spotify via the Web API. Patrik's first public AI app — taught him a lot about LLM prompting for structured output and OAuth integrations.

## TinyML Edge Inference
Real-time computer vision running at ~15 fps on embedded devices. Uses YOLO for object detection and MobileNet for classification, both quantized and optimised for ARM Cortex-M and similar edge platforms. Focus on power efficiency and latency. Deployed on ESP32-class hardware. Used in the cat water fountain project.

## Intelligent Cat Water Fountain
Embedded computer vision on a microcontroller (MCU) that identifies individual cats via YOLO and adjusts water flow live. Each cat gets personalised flow settings. The TinyML model runs on-device with no cloud dependency. Yes, this is a real product in Patrik's home. One of the cats is the primary user.

## Agent Swarm Intelligence (pi.dev)
Bee-hive-inspired multi-agent swarm experiments built on the pi coding-agent harness. Agents have roles, memory, and local coordination rules. Studying emergent coordination in decentralised AI populations. Started as a side project but has informed Patrik's thinking about multi-agent orchestration at MarketHype.

## Coding-Agent Harness Engineering (pi.dev)
Extended the pi coding-agent harness with custom tools, skills, and sub-agent workflows. Added support for specialised agents (researcher, reviewer, builder) that can work in parallel on larger tasks. Also contributed to the messenger/crew orchestration layer for multi-terminal agent workflows.

## Notion CLI Integration Tool
A command-line tool that interfaces with the Notion REST API to automate page creation, database queries, and workspace management. Written in Python with rich CLI output. Used daily for personal knowledge management and project tracking.

## LLM Creative-Thinking Enhancer
Implemented a research paper's methodology for eliciting more divergent, creative output from LLMs. Uses structured prompt patterns and iterative refinement to push models beyond conventional answers. Tested on coding problems, story generation, and ideation tasks.

## HybridGraphSemantic Space
A hybrid knowledge-graph and vector database for local agent memory. Combines graph traversal (for relational reasoning) with semantic search (for similarity matching). Designed for agents that need long-term memory with both associative and structured recall. Uses NetworkX + ChromaDB in the prototype.

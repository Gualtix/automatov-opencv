import pydot
import os
from IPython.display import Image, display
from subprocess import check_output

class Graph:

    def __init__(self):
        self.graph = pydot.Dot(graph_type='digraph', strict=True,rankdir="LR")

    def push(self, image,color):

        id = len(self.graph.get_node_list())
        x = pydot.Node(str(id), label = "", image = image, style = "filled", fillcolor = color)
        self.graph.add_node(x)

        if id > 0:
            edge = pydot.Edge(str(id - 1), str(id))
            self.graph.add_edge(edge)

        


    def print_graph(self):
        self.graph.write_raw("pipeline.dot")
        check_output("dot -T png pipeline.dot -o pipeline.png", shell=True)
      
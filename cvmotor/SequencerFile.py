import base64
import time
import cv2

import numpy as np
from TaskFile import Task
from GraphFile import Graph
from TargetFile import Target
from LoggerFile import Logger

import json

class Sequencer:

    def __init__(self):
        self.Gp = Graph()
        self.Tk = Task()

    def playSequence(self, sequence):

        f = open('../server/Sequences/' + sequence + '.json')
        data = json.load(f)

        for task in data['tasks']:
            icon_base64 = task['icon_base64'].replace('data:image/png;base64,','')
            icon_base64 = icon_base64.replace('data:text/html;base64,','')
            #print(icon_base64)
            img = base64.b64decode(icon_base64)
            npimg = np.fromstring(img, dtype=np.uint8)
            icon = cv2.imdecode(npimg, 1)

            if task['operation'] == 'click':
                color = self.Tk.click(icon,task['x_move'],task['y_move'])
                Logger.pushLog(task['id'],color)
                if color == 'red':
                    break
            
            if task['operation'] == 'type':
                color = self.Tk.write(task['text'],icon,task['x_move'],task['y_move'])
                Logger.pushLog(task['id'],color)
                if color == 'red':
                    break

            time.sleep(5)
        
        Logger.save()
            

            

            
            


            #cv2.imshow('image', source)
            #cv2.waitKey(0)
            #cv2.destroyAllWindows()




'''
Icon = Target.CHROME
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CLARO_GT_FLAG
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CHROME
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CLARO_GT_FLAG
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CHROME
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CLARO_GT_FLAG
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CHROME
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)

Icon = Target.CLARO_GT_FLAG
color = self.Tk.click(Icon)
self.Gp.push(Icon,color)


self.Gp.print_graph()
'''







        



      

from os import system
import sys
import time
import cv2
import pyautogui
import numpy as np
import imutils
from DrawFile import Draw

class Locator:

    def __init__(self):
        self.x = -1
        self.y = -1

    def locateWithOpenCVTemplate(self, template):

        self.x = -1
        self.y = -1

        try:

            Dw = Draw()
                
            #Template
            template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
            #template = cv2.Canny(template, 25, 100)
            template_height, template_width = template.shape[:2]
            
            #Screenshot
            screenshot = pyautogui.screenshot()
            screenshot = cv2.cvtColor(np.array(screenshot), cv2.COLOR_BGR2GRAY)
            #screenshot = cv2.Canny(screenshot, 25, 100)
            screenshot_height, screenshot_width = screenshot.shape[:2]

            #Match    
            res = cv2.matchTemplate(screenshot,template,cv2.TM_CCOEFF_NORMED)
            threshold = 0.90

            # Store the coordinates of matched area in a numpy array
            loc = np.where(res >= threshold)
            
            # Draw a rectangle around the matched region.
            for pt in zip(*loc[::-1]):
                print(pt[0],pt[1])
                Dw.draw_frame_by_sup_left_corner(pt[0],pt[1],template_width,template_height,Dw.green)
                self.x = pt[0] + int(template_width/2)
                self.y = pt[1] + int(template_height/2)
                time.sleep(1)
                break
            
        except Exception as err:
            print("Locator.locate: Image not found")
            self.x,self.y = -1, -1
        
        return self.x, self.y, template_width, template_height
        
        
    def locate(self, image):
            img = image
            dimensions = img.shape
            try:
                self.x, self.y = pyautogui.locateCenterOnScreen(image,confidence = 0.75)
                Dw = Draw()
                Dw.draw_frame_by_center(self.x, self.y, dimensions[1], dimensions[0], Dw.green)
                time.sleep(1)
                
            except Exception as err:
                print("Locator.locate: Image not found")
                self.x,self.y = -1, -1
                
            return self.x, self.y, dimensions[1], dimensions[0]


'''
#Simple CV2 Template Matching
res = cv2.matchTemplate(screenshot, template, cv2.TM_SQDIFF)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
print(min_val, max_val, min_loc, max_loc)
x1, y1 = min_loc
x2, y2 = min_loc[0] + template.shape[1], min_loc[1] + template.shape[0]

Dw = Draw()
Dw.draw_frame_by_sup_left_corner(x1,y1,template_width,template_height,Dw.green)
sys.exit()
'''
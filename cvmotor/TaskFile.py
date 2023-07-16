import time
import pyperclip
from DrawFile import Draw
import pyautogui
from TargetFile import Target
from LocatorFile import Locator

class Task:

    def __init__(self):
        self.Lc = Locator()
        self.Dw = Draw()

    def click(self,image,x_offset,y_offset):       

        #x,y,w,h = self.Lc.locate(image)
        x,y,w,h = self.Lc.locateWithOpenCVTemplate(image)
        
        if( x == -1 and y == -1):
            return "red"
            
        self.Dw.draw_small_square(x + x_offset, y + y_offset)
        time.sleep(1)
        pyautogui.moveTo(x + x_offset, y + y_offset)
        pyautogui.click()
        return "green"

    def write(self,text,image,x_offset,y_offset):

        #x,y,w,h = self.Lc.locate(image)
        x,y,w,h = self.Lc.locateWithOpenCVTemplate(image)
        

        if( x == -1 and y == -1):
            return "red"
            
        self.Dw.draw_small_square(x + x_offset, y + y_offset)
        pyautogui.moveTo(x + x_offset, y + y_offset)
        pyautogui.click()

        pyperclip.copy(text)
        pyautogui.hotkey('ctrl', 'v')
        pyautogui.press('enter')
        return "green"

        
    



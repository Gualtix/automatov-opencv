import win32gui
import win32api
import time


class Draw:
    
    def __init__(self):
        self.red    = win32api.RGB(255, 0, 0)
        self.green  = win32api.RGB(0, 255, 0)
        self.blue   = win32api.RGB(0, 0, 255)
        self.black  = win32api.RGB(0, 0, 0)
        self.white  = win32api.RGB(255, 255, 255)
        self.yellow = win32api.RGB(255, 255, 0)
        self.purple = win32api.RGB(255, 0, 255)
        self.cyan   = win32api.RGB(0, 255, 255)


    def draw_small_square(self,x, y):
        dc = win32gui.GetDC(0)

        win32gui.SetPixel(dc, x - 1, y - 1, self.red)
        win32gui.SetPixel(dc, x - 0, y - 1, self.red)
        win32gui.SetPixel(dc, x + 1, y - 1, self.red)

        win32gui.SetPixel(dc, x - 1, y - 0, self.red)
        win32gui.SetPixel(dc, x - 0, y - 0, self.red) # draw red at 0,0
        win32gui.SetPixel(dc, x + 1, y - 0, self.red)

        win32gui.SetPixel(dc, x - 1, y + 1, self.red)
        win32gui.SetPixel(dc, x - 0, y + 1, self.red)
        win32gui.SetPixel(dc, x + 1, y + 1, self.red)

        win32gui.SetPixel(dc, x - 5, y - 5, self.red)
        win32gui.SetPixel(dc, x - 4, y - 4, self.red)
        win32gui.SetPixel(dc, x - 3, y - 3, self.red)
        win32gui.SetPixel(dc, x - 2, y - 2, self.red)
        win32gui.SetPixel(dc, x - 1, y - 1, self.red)
        win32gui.SetPixel(dc, x - 0, y - 0, self.red) # draw red at 0,0
        win32gui.SetPixel(dc, x + 1, y + 1, self.red)
        win32gui.SetPixel(dc, x + 2, y + 2, self.red)
        win32gui.SetPixel(dc, x + 3, y + 3, self.red)
        win32gui.SetPixel(dc, x + 4, y + 4, self.red)
        win32gui.SetPixel(dc, x + 5, y + 5, self.red)

        win32gui.SetPixel(dc, x + 5, y - 5, self.red)
        win32gui.SetPixel(dc, x + 4, y - 4, self.red)
        win32gui.SetPixel(dc, x + 3, y - 3, self.red)
        win32gui.SetPixel(dc, x + 2, y - 2, self.red)
        win32gui.SetPixel(dc, x + 1, y - 1, self.red)
        win32gui.SetPixel(dc, x + 0, y - 0, self.red) # draw red at 0,0
        win32gui.SetPixel(dc, x - 1, y + 1, self.red)
        win32gui.SetPixel(dc, x - 2, y + 2, self.red)
        win32gui.SetPixel(dc, x - 3, y + 3, self.red)
        win32gui.SetPixel(dc, x - 4, y + 4, self.red)
        win32gui.SetPixel(dc, x - 5, y + 5, self.red)

        
    def draw_frame_by_sup_left_corner(self,x, y, width, height,color):
        dc = win32gui.GetDC(0)

        win32gui.SetPixel(dc, x, y, color)  # draw red at 0,0
        thickness = 3
        for i in range(x, x + width):

            for j in range(thickness):
                win32gui.SetPixel(dc, i, y + j, color)
                win32gui.SetPixel(dc, i, y + height - j, color)

        for i in range(y, y + height):

            for j in range(thickness):
                win32gui.SetPixel(dc, x + j, i, color)
                win32gui.SetPixel(dc, x + width - j, i, color)
    
    def draw_frame_by_center(self,x, y, width, height,color):
        self.draw_frame_by_sup_left_corner((x - (width // 2)),(y - (height // 2)),width,height,color)
        #self.draw_frame_by_sup_left_corner(x + width // 2, y + height // 2, width, height, color)

    def draw_circle(self,x, y, radius):
        
        dc = win32gui.GetDC(0)
        green = win32api.RGB(124,252,0)
        for i in range(x-radius,x+radius):
            for j in range(y-radius,y+radius):
                if (i-x)**2 + (j-y)**2 <= radius**2:
                    win32gui.SetPixel(dc, i, j, green)
                    time.sleep(0.06)



import json

class Logger:

    @staticmethod
    def init(sequenceName):
        global filename
        filename = './logs/' + sequenceName + '.json'

        global sqName
        sqName = sequenceName

        global quex
        quex = []
        
    @staticmethod
    def pushLog(id,color):
        quex.append({'id':id,'color':color})
    
    @staticmethod
    def save():
        global quex
        with open(filename, 'w') as outfile:
            json.dump(quex, outfile)
        quex = []

        


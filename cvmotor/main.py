from SequencerFile import Sequencer
from LoggerFile import Logger

import sys

def main():

    sequenceName = sys.argv[1]
    #sequenceName = 'pagar-factura-claro'
    Logger.init(sequenceName)
    Sq = Sequencer()
    Sq.playSequence(sequenceName)

if __name__ == "__main__":
    main()

#Read Txt file

def read_file(url):
    sim = []
    with open(url, 'r') as f:
        data = f.readlines()
        for line in data:
            sim.append(line.strip())
    sorted_list = sorted(sim)
    for i in range(len(sorted_list)):
        print(sorted_list[i])


    
    

read_file('./Simbolos.txt')
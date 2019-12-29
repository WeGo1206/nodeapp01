import sys
import os, time
from time import *

result=os.statvfs('/')
blocksize=result.f_frsize
totalblocks=result.f_blocks
freeblocks=result.f_bfree
giga=1024*1024*1024
totalsize=totalblocks*blocksize/giga
freesize=freeblocks*blocksize/giga
usedsize=totalsize-freesize
print('total disk size= %s' % totalsize)
print('used disk size= %s' % usedsize)
print('free disk size= %s' % freesize)


lines = os.popen('free -m').readlines()[-2]
print('readlines %s' % lines)

test = os.popen('free -m').readlines()[-2].split()[1:]
print('test %s' % test)

totmem, usedmem = map(int, os.popen('free -m').readlines()[-2].split()[1:3])
freemem = totmem - usedmem
print('used memory (RAM)= %s' % usedmem)
print('free memory (RAM)= %s' % freemem)
print('total memory (RAM)= %s' % totmem)

                
logText = str(round(totalsize,1)) + ";" + str(round(usedsize,1)) + ";" + str(round(freesize,1)) + ";" + str(round(totmem,0)) + ";" + str(round(usedmem,0)) + ";" + str(round(freemem,0)) + "\n"
print(logText)

fT = open("/home/pi/Documents/PiSysInfo.txt", "w")
fT.write(logText)
fT.close

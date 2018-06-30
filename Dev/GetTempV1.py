import sys
import os, time
from time import *
os.system("modprobe wire")
os.system("modprobe w1-gpio")
os.system("modprobe w1-therm")

ok = False
while not ok:
    f1 = open("/sys/bus/w1/devices/28-000007360dfe/w1_slave", "r")
    first1, second1 = f1.readlines()
    f1.close()
    if first1.find("YES") != -1:
        ok = True
    tempString1 = second1.split("=")[1] 
T1 = int(tempString1)/1000
print("T1=",T1)

ok = False
while not ok:
    f2 = open("/sys/bus/w1/devices/28-00000735e872/w1_slave", "r")
    first2, second2 = f2.readlines()
    f2.close()
    if first2.find("YES") != -1:
        ok = True
    tempString2 = second2.split("=")[1]
T2 = int(tempString2)/1000
print("T2=",T2)

tFile = open("/sys/class/thermal/thermal_zone0/temp")
cpuTemp = tFile.read()
tFile.close()
fcpuTemp = round(float(cpuTemp)/1000,1)

localtime = time.strftime("%d.%m.%Y %H:%M:%S")
print(T1,"°C /", T2,"°C /",localtime)
logText = str(round(T1,1)) + ";" + str(round(T2,1)) + ";" + str(fcpuTemp) + ";" + localtime + "\n"
logText = logText.replace(".",",",3)
filename_daily= time.strftime("/home/pi/Documents/Temperatur_Wohnung_%Y%m%d.txt")
fT = open(filename_daily, "a")
fT.write(logText)
fT.close

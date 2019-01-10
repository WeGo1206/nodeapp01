# tempread.py
import smtplib, sys
import os, time
from email.mime.text import MIMEText
from email.header import Header
from time import *

os.system("modprobe wire") #1
os.system("modprobe w1-gpio")
os.system("modprobe w1-therm")

##for d in os.listdir("/sys/bus/w1/devices"): #2
##    if d.startswith("10") or d.startswith("28"): #3
##        deviceFile = "/sys/bus/w1/devices/" + d + "/w1_slave"
##def readTemp():
##    ok = False
##    while not ok:
##        f = open(deviceFile, "r") #4
##        first, second = f.readlines() #5
##        f.close()
##        if first.find("YES") != -1: #6
##            ok = True
##        tempString = second.split("=")[1] #7
##        return int(tempString)/1000 #8

import os, time

ok = False
while not ok:
    f1 = open("/sys/bus/w1/devices/28-000007360dfe/w1_slave", "r") #4
    first1, second1 = f1.readlines() #5
    f1.close()
    if first1.find("YES") != -1: #6
        ok = True
    tempString1 = second1.split("=")[1] #7
T1 = float(tempString1)/1000 #8
print("T1=",T1)

ok = False
while not ok:
    f2 = open("/sys/bus/w1/devices/28-00000735e872/w1_slave", "r") #4
    first2, second2 = f2.readlines() #5
    f2.close()
    if first2.find("YES") != -1: #6
        ok = True
    tempString2 = second2.split("=")[1] #7
T2 = float(tempString2)/1000 #8
print("T2=",T2)

tFile = open("/sys/class/thermal/thermal_zone0/temp")
cpuTemp = tFile.read()
tFile.close()
fcpuTemp = round(float(cpuTemp)/1000,1)

localtime = time.strftime("%d.%m.%Y %H:%M:%S")
logText = str(round(T1,1)) + ";" + str(round(T2,1)) + ";" + str(fcpuTemp) + ";" + localtime + "\n"
logText = logText.replace(".",",",3)

filename_daily= "/home/pi/Documents/Temperatur_Wohnung_Aktuell.txt"
fT = open(filename_daily, "w")
fT.write(logText)
fT.close

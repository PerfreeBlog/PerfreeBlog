@echo off
set dir=%1%
set port=%2%
if "%dir%" == "" exit
if "%port%" == "" exit

for /f "tokens=1-5" %%i in ('netstat -ano^|findstr ":%port%"') do (
 echo kill the process %%m who use the port 
 taskkill /pid %%m -t -f
 goto q
)
:q

xcopy %dir% %~dp0 /s/e/y

start start.bat

rd/s/q %dir%
exit
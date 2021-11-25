#!/bin/bash
echo $1
if [ "$1" = "" ];
then
   exit
fi
sh start.sh stop
sleep 5
\cp -rf $1/* ./
chmod +x start.sh
sh start.sh start
rm -rf $1

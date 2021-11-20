#!/bin/bash
echo $1
if [ "$1" = "" ];
then
        exit
fi

./start.sh stop

sleep 10

\cp -rf $1/* ./
sed -i 's/\r//' ./start.sh
./start.sh start
rm -rf $1


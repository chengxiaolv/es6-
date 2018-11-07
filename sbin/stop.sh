#!/bin/bash

app=gacm-vue

echo gacm-vue stop.
sleep 1
echo ..................
sleep 1

r1=`ps -ef|grep $app | awk '{print $2}'`
arr=($r1)

if [ ${#arr[@]} -eq 1 ]
then
    echo nothing!
else
	kill -9 ${arr[0]}
	kill -9 ${arr[1]}
	echo exit. ${arr[0]} 
	echo gacm-vue stop success!
fi